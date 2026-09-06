import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { Game } from 'src/app/services/game/game';
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
  let router: jasmine.SpyObj<Router>;
  let players$: BehaviorSubject<unknown[]>;
  let rounds$: BehaviorSubject<Round[]>;

  beforeEach(async () => {
    players$ = new BehaviorSubject<unknown[]>([]);
    rounds$ = new BehaviorSubject<Round[]>([]);
    gameService = jasmine.createSpyObj<GameService>('GameService', ['getGame', 'isCurrentUserAdmin', 'updateGame']);
    gamePlayerService = jasmine.createSpyObj<GamePlayerService>('GamePlayerService', ['playersForGame']);
    roundMediatorService = jasmine.createSpyObj<RoundMediatorService>('RoundMediatorService', ['createRound']);
    roundService = jasmine.createSpyObj<RoundService>('RoundService', ['roundsForGame']);
    router = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);

    gameService.getGame.and.returnValue(of(game(0)));
    gameService.isCurrentUserAdmin.and.returnValue(of(true));
    gameService.updateGame.and.returnValue(of(game(3)));
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
        { provide: GamePlayerService, useValue: gamePlayerService },
        { provide: RoundMediatorService, useValue: roundMediatorService },
        { provide: RoundService, useValue: roundService },
        { provide: Location, useValue: jasmine.createSpyObj<Location>('Location', ['back']) },
        { provide: MatDialog, useValue: { open: () => ({ close: () => undefined }) } },
        { provide: MatSnackBar, useValue: jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']) }
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
    expect(component.nextStepTitle).toBe('Set the number of rounds');
    expect(component.nextStepButtonText).toBe('Save setup');
  });

  it('prompts admins to add players after rounds are configured', () => {
    component.game.numberOfRounds = 3;
    players$.next([{}, {}]);

    expect(component.nextStepTitle).toBe('Add players');
    expect(component.nextStepDescription).toBe('Add 2 more players to start the first round.');
  });

  it('prompts admins to start round 1 when setup is ready', () => {
    component.game.numberOfRounds = 3;
    players$.next([{}, {}, {}, {}]);

    expect(component.nextStepTitle).toBe('Start round 1');
    expect(component.nextStepButtonText).toBe('Start round 1');
  });

  it('starts round 1 from the setup next step', () => {
    component.game.numberOfRounds = 3;
    players$.next([{}, {}, {}, {}]);

    component.takeNextStep();

    expect(gameService.updateGame).toHaveBeenCalledWith(component.game);
    expect(roundMediatorService.createRound).toHaveBeenCalledWith('game-1', 1);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/game/game-1/round/round-1');
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
