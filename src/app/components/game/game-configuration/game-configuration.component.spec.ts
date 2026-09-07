import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { Game } from 'src/app/services/game/game';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GameService } from 'src/app/services/game/game.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { RoundMediatorService } from 'src/app/services/round-mediator/round-mediator.service';
import { Round } from 'src/app/services/round/round';
import { RoundService } from 'src/app/services/round/round.service';

import { GameConfigurationComponent } from './game-configuration.component';

describe('GameSetupComponent', () => {
  let component: GameConfigurationComponent;
  let fixture: ComponentFixture<GameConfigurationComponent>;
  let gameService: jasmine.SpyObj<GameService>;
  let gamePlayerService: jasmine.SpyObj<GamePlayerService>;
  let roundMediatorService: jasmine.SpyObj<RoundMediatorService>;
  let roundService: jasmine.SpyObj<RoundService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let players$: BehaviorSubject<unknown[]>;
  let rounds$: BehaviorSubject<Round[]>;

  beforeEach(async () => {
    players$ = new BehaviorSubject<unknown[]>([]);
    rounds$ = new BehaviorSubject<Round[]>([]);
    gameService = jasmine.createSpyObj<GameService>('GameService', ['getGame', 'isCurrentUserAdmin', 'updateGame']);
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['getCurrentUser']);
    gamePlayerService = jasmine.createSpyObj<GamePlayerService>('GamePlayerService', ['playersForGame', 'addPlayer']);
    roundMediatorService = jasmine.createSpyObj<RoundMediatorService>('RoundMediatorService', ['createRound']);
    roundService = jasmine.createSpyObj<RoundService>('RoundService', ['roundsForGame']);
    router = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
    snackBar = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);

    gameService.getGame.and.returnValue(of(game(0)));
    gameService.isCurrentUserAdmin.and.returnValue(of(true));
    gameService.updateGame.and.returnValue(of(game(3)));
    authService.getCurrentUser.and.returnValue({
      uid: 'admin-1',
      displayName: 'Angela',
      email: 'angela@example.com'
    } as never);
    gamePlayerService.playersForGame.and.returnValue(players$.asObservable() as never);
    roundMediatorService.createRound.and.returnValue(of({
      round: round(1),
      tables: []
    }));
    roundService.roundsForGame.and.returnValue(rounds$.asObservable());

    await TestBed.configureTestingModule({
      declarations: [ GameConfigurationComponent ],
      providers: [
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ gameId: 'game-1' }) } }
        },
        { provide: GameService, useValue: gameService },
        { provide: AuthService, useValue: authService },
        { provide: GamePlayerService, useValue: gamePlayerService },
        { provide: RoundMediatorService, useValue: roundMediatorService },
        { provide: RoundService, useValue: roundService },
        { provide: Location, useValue: jasmine.createSpyObj<Location>('Location', ['back']) },
        { provide: MatDialog, useValue: { open: () => ({ close: () => undefined }) } },
        { provide: MatSnackBar, useValue: snackBar }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts by prompting admins to set the number of rounds', () => {
    expect(component.nextStepTitle).toBe('Set the Number of Rounds');
    expect(component.nextStepButtonText).toBe('Save Setup');
  });

  it('does not save when the number of rounds is zero', () => {
    component.game.numberOfRounds = 0;

    component.save();

    expect(gameService.updateGame).not.toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith('Number of rounds must be a whole number at least 1.', 'Dismiss', {
      duration: 5000
    });
  });

  it('prompts admins to add players after rounds are configured', () => {
    component.game.numberOfRounds = 3;
    players$.next([{}, {}]);

    expect(component.nextStepTitle).toBe('Add Players');
    expect(component.nextStepDescription).toBe('Add 2 more players to start the first round.');
  });

  it('prompts admins to start round 1 when setup is ready', () => {
    component.game.numberOfRounds = 3;
    players$.next([{}, {}, {}, {}]);

    expect(component.nextStepTitle).toBe('Start Round 1');
    expect(component.nextStepButtonText).toBe('Start Round 1');
  });

  it('starts round 1 from the setup next step', () => {
    component.game.numberOfRounds = 3;
    players$.next([{}, {}, {}, {}]);

    component.takeNextStep();

    expect(gameService.updateGame).toHaveBeenCalledWith(component.game);
    expect(roundMediatorService.createRound).toHaveBeenCalledWith('game-1', 1);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/game/game-1/round/round-1');
  });

  it('allows an admin to join before rounds start', () => {
    players$.next([]);

    expect(component.canCurrentAdminJoin).toBeTrue();

    component.joinCurrentAdmin();

    expect(gamePlayerService.addPlayer).toHaveBeenCalledWith(
      jasmine.objectContaining({
        uid: 'admin-1',
        displayName: 'Angela'
      }),
      'game-1'
    );
  });

  it('does not show admin join after the admin is already a player', () => {
    players$.next([{ uid: 'admin-1' }]);

    expect(component.canCurrentAdminJoin).toBeFalse();
  });

  it('does not show admin join after rounds start', () => {
    rounds$.next([round(1)]);

    expect(component.canCurrentAdminJoin).toBeFalse();
  });

  function game(numberOfRounds: number): Game {
    return {
      id: 'game-1',
      name: 'Game',
      adminIds: [],
      numberOfRounds,
      createdDate: new Date(),
      byePool: []
    };
  }

  function round(number: number): Round {
    return {
      id: `round-${number}`,
      number,
      byes: [],
      pointsConfirmed: false
    };
  }
});
