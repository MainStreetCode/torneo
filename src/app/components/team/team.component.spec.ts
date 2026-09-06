import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SimpleChange } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { Table } from '../table/table';
import { Team } from './team';
import { TeamComponent } from './team.component';
import { GameService } from 'src/app/services/game/game.service';
import { TeamService } from 'src/app/services/team/team.service';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;
  let teamUpdates: Subject<Team>;
  let teamService: jasmine.SpyObj<TeamService>;
  let gameService: jasmine.SpyObj<GameService>;

  const routeStub = {
    snapshot: {
      paramMap: {
        get: (key: string) => key === 'gameId' ? 'game-1' : 'round-1'
      }
    }
  };

  beforeEach(async () => {
    teamUpdates = new Subject<Team>();
    teamService = jasmine.createSpyObj<TeamService>('TeamService', ['getTeam']);
    gameService = jasmine.createSpyObj<GameService>('GameService', ['isUserAdmin']);

    teamService.getTeam.and.returnValue(teamUpdates.asObservable());
    gameService.isUserAdmin.and.returnValue(of(false));

    await TestBed.configureTestingModule({
      declarations: [TeamComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: GameService, useValue: gameService },
        { provide: TeamService, useValue: teamService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    component.team = createTeam(5);
    component.table = createTable();
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sets the points control from remote updates when points are not being edited', () => {
    teamUpdates.next(createTeam(8));

    expect(component.teamPointsFormControl.value).toBe(8);
  });

  it('does not overwrite the typed points value while points are being edited', () => {
    component.onPointsInput();
    component.teamPointsFormControl.setValue('10');

    teamUpdates.next(createTeam(5));

    expect(component.teamPointsFormControl.value).toBe('10');
  });

  it('emits the final numeric points value once after debounce', fakeAsync(() => {
    spyOn(component.pointsChange, 'emit');

    component.teamPointsFormControl.setValue('1');
    tick(500);
    component.teamPointsFormControl.setValue('10');
    tick(1000);

    expect(component.pointsChange.emit).toHaveBeenCalledTimes(1);
    expect(component.pointsChange.emit).toHaveBeenCalledWith({ team: component.team, points: 10 });
  }));

  it('does not emit duplicate points when blur saves before debounce finishes', fakeAsync(() => {
    spyOn(component.pointsChange, 'emit');

    component.teamPointsFormControl.setValue('10');
    component.onPointsBlur();
    tick(1000);

    expect(component.pointsChange.emit).toHaveBeenCalledTimes(1);
    expect(component.pointsChange.emit).toHaveBeenCalledWith({ team: component.team, points: 10 });
  }));

  it('normalizes empty points to zero on blur without emitting NaN', () => {
    spyOn(component.pointsChange, 'emit');

    component.teamPointsFormControl.setValue('');
    component.onPointsBlur();

    expect(component.teamPointsFormControl.value).toBe(0);
    expect(component.pointsChange.emit).toHaveBeenCalledWith({ team: component.team, points: 0 });
    expect(component.pointsChange.emit).not.toHaveBeenCalledWith(jasmine.objectContaining({ points: NaN }));
  });

  it('enables score confirmation for an opposing team', () => {
    component.auth = { currentUser: { uid: 'player-a' } } as any;
    component.team = createTeam(5, 'team-b', ['player-b']);
    component.currentUserTeamId = 'team-a';

    component.ngOnChanges({
      team: new SimpleChange(null, component.team, false),
      currentUserTeamId: new SimpleChange(null, component.currentUserTeamId, false)
    });

    expect(component.canConfirmPoints).toBeTrue();
  });

  it('enables score submission for the current user team', () => {
    component.auth = { currentUser: { uid: 'player-a' } } as any;
    component.team = createTeam(5, 'team-a', ['player-a']);
    component.currentUserTeamId = 'team-a';

    component.ngOnChanges({
      team: new SimpleChange(null, component.team, false),
      currentUserTeamId: new SimpleChange(null, component.currentUserTeamId, false)
    });

    expect(component.canConfirmPoints).toBeTrue();
  });

  it('keeps the current user team points editable until confirmed or finalized', () => {
    component.auth = { currentUser: { uid: 'player-a' } } as any;
    component.team = createTeam(5, 'team-a', ['player-a']);
    component.currentUserTeamId = 'team-a';
    component.pointsConfirmed = false;
    component.allTablesConfirmed = false;

    component.ngOnChanges({
      team: new SimpleChange(null, component.team, false),
      currentUserTeamId: new SimpleChange(null, component.currentUserTeamId, false),
      pointsConfirmed: new SimpleChange(true, component.pointsConfirmed, false)
    });

    expect(component.isEditable).toBeTrue();
    expect(component.teamPointsFormControl.disabled).toBeFalse();
  });

  it('labels the current user team and opponent team', () => {
    component.team = createTeam(5, 'team-a', ['player-a']);
    component.currentUserTeamId = 'team-a';

    expect(component.teamRoleLabel).toBe('Your team');

    component.team = createTeam(5, 'team-b', ['player-b']);

    expect(component.teamRoleLabel).toBe('Opponent');
  });

  it('marks score entry as unsaved while the user edits', () => {
    component.onPointsInput();

    expect(component.scoreSaveStatus).toBe('unsaved');
    expect(component.scoreSaveStatusLabel).toBe('Unsaved changes');
  });

  it('marks score entry as saving after emitting a score change', () => {
    spyOn(component.pointsChange, 'emit');

    component.pointsChanged(10);

    expect(component.scoreSaveStatus).toBe('saving');
    expect(component.scoreSaveStatusLabel).toBe('Saving');
    expect(component.pointsChange.emit).toHaveBeenCalledWith({ team: component.team, points: 10 });
  });

  it('marks score entry as saved when the remote score catches up', () => {
    component.pointsChanged(10);

    expect(component.scoreSaveStatus).toBe('saving');

    teamUpdates.next(createTeam(10));

    expect(component.scoreSaveStatus).toBe('saved');
    expect(component.scoreSaveStatusLabel).toBe('Saved');
  });
});

function createTeam(points: number, id = 'team-1', playerIds: string[] = []): Team {
  return {
    id,
    points,
    teamPlayers: playerIds.map((playerId) => ({
      points: 0,
      isPointsConfirmed: false,
      player: {
        uid: playerId,
        displayName: playerId,
        pointsForRound: []
      } as any
    }))
  };
}

function createTable(): Table {
  return {
    id: 'table-1',
    name: 'Table 1',
    number: 1,
    playerIds: [],
    pointsConfirmed: false
  };
}
