import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GameService } from 'src/app/services/game/game.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';

import { GamePlayerDetailComponent } from './game-player-detail.component';

describe('PlayerDetailComponent', () => {
  let component: GamePlayerDetailComponent;
  let fixture: ComponentFixture<GamePlayerDetailComponent>;
  let playerService: jasmine.SpyObj<GamePlayerService>;

  beforeEach(async () => {
    playerService = jasmine.createSpyObj<GamePlayerService>('GamePlayerService', [
      'getPlayer',
      'updatePlayerProfile'
    ]);
    playerService.getPlayer.and.returnValue(of(undefined));
    playerService.updatePlayerProfile.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      declarations: [ GamePlayerDetailComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ gameId: 'game-1', playerId: 'player-1' }) } }
        },
        { provide: GamePlayerService, useValue: playerService },
        { provide: Location, useValue: jasmine.createSpyObj<Location>('Location', ['back']) },
        { provide: GameService, useValue: { getGame: () => of(undefined), isCurrentUserAdmin: () => of(false), addAdmin: () => undefined, deleteAdmin: () => undefined } },
        { provide: AuthService, useValue: { getCurrentUser: () => null } },
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of(undefined) }) } },
        { provide: MatSnackBar, useValue: jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']) }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlayerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('saves player profile fields without sending points history', () => {
    component.gameId = 'game-1';
    component.isCurrentUserAdmin = true;
    component.player = {
      uid: 'player-1',
      displayName: 'Angela',
      fixedTableNumber: 2,
      pointsForRound: [{ roundId: 'round-1', roundNumber: 1, points: 10 }]
    } as any;

    component.save();

    expect(playerService.updatePlayerProfile).toHaveBeenCalledWith('player-1', 'game-1', {
      displayName: 'Angela',
      fixedTableNumber: 2
    });
  });

  it('does not let non-admin profile saves update fixed table values', () => {
    component.gameId = 'game-1';
    component.isCurrentUserAdmin = false;
    component.player = {
      uid: 'player-1',
      displayName: 'Angela',
      fixedTableNumber: 3,
      pointsForRound: [{ roundId: 'round-1', roundNumber: 1, points: 10 }]
    } as any;

    component.save();

    expect(playerService.updatePlayerProfile).toHaveBeenCalledWith('player-1', 'game-1', {
      displayName: 'Angela'
    });
  });
});
