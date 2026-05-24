import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { GamePlayer } from 'src/app/components/player/game-player';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { RoundMediatorService } from 'src/app/services/round-mediator/round-mediator.service';
import { Round } from 'src/app/services/round/round';
import { RoundService } from 'src/app/services/round/round.service';

import { GameDashboardComponent } from './game-dashboard.component';

describe('GameDashboardComponent', () => {
  let component: GameDashboardComponent;
  let fixture: ComponentFixture<GameDashboardComponent>;
  let gameService: jasmine.SpyObj<GameService>;
  let gamePlayerService: jasmine.SpyObj<GamePlayerService>;
  let roundService: jasmine.SpyObj<RoundService>;
  let roundMediatorService: jasmine.SpyObj<RoundMediatorService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let players$: BehaviorSubject<GamePlayer[]>;
  let rounds$: BehaviorSubject<Round[]>;

  beforeEach(async () => {
    players$ = new BehaviorSubject<GamePlayer[]>(players(4));
    rounds$ = new BehaviorSubject<Round[]>([]);
    gameService = jasmine.createSpyObj<GameService>('GameService', ['getGame']);
    gamePlayerService = jasmine.createSpyObj<GamePlayerService>('GamePlayerService', ['playersForGame']);
    roundService = jasmine.createSpyObj<RoundService>('RoundService', ['roundsForGame']);
    roundMediatorService = jasmine.createSpyObj<RoundMediatorService>('RoundMediatorService', ['ensureNextRoundStartedForLatestRound']);
    snackBar = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);

    gameService.getGame.and.returnValue(of(game(3)));
    gamePlayerService.playersForGame.and.returnValue(players$.asObservable());
    roundService.roundsForGame.and.returnValue(rounds$.asObservable());
    roundMediatorService.ensureNextRoundStartedForLatestRound.and.returnValue(of({
      finalized: true,
      nextRoundStarted: true
    }));

    await TestBed.configureTestingModule({
      declarations: [GameDashboardComponent],
      providers: [
        { provide: GameService, useValue: gameService },
        { provide: GamePlayerService, useValue: gamePlayerService },
        { provide: RoundService, useValue: roundService },
        { provide: RoundMediatorService, useValue: roundMediatorService },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: Location, useValue: jasmine.createSpyObj<Location>('Location', ['back']) },
        { provide: Router, useValue: jasmine.createSpyObj<Router>('Router', ['navigate']) },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ gameId: 'game-1' })
            },
            queryParams: of({})
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ensures the next round starts when the latest dashboard round is finalized', () => {
    rounds$.next([round(1, true), round(2, true)]);

    expect(roundMediatorService.ensureNextRoundStartedForLatestRound).toHaveBeenCalledWith('game-1');
  });

  it('does not repeatedly ensure the next round for the same finalized round', () => {
    const finalizedRounds = [round(1, true), round(2, true)];

    rounds$.next(finalizedRounds);
    rounds$.next(finalizedRounds);

    expect(roundMediatorService.ensureNextRoundStartedForLatestRound).toHaveBeenCalledTimes(1);
  });

  it('does not ensure the next round when the latest round is still active', () => {
    rounds$.next([round(1, true), round(2, false)]);

    expect(roundMediatorService.ensureNextRoundStartedForLatestRound).not.toHaveBeenCalled();
  });

  it('shows a visible error when dashboard next-round recovery fails', () => {
    roundMediatorService.ensureNextRoundStartedForLatestRound.and.returnValue(throwError(() => new Error('startup failed')));

    rounds$.next([round(1, true), round(2, true)]);

    expect(snackBar.open).toHaveBeenCalledWith('startup failed', 'Dismiss', {
      duration: 8000
    });
  });

  it('shows the final active round as started', () => {
    rounds$.next([round(1, true), round(2, true), round(3, false)]);

    expect(component.dashboardStatus).toBe('Round 3 started');
    expect(component.dashboardStatus).not.toBe('All rounds started');
  });

  it('keeps game completed after the final round is finalized', () => {
    rounds$.next([round(1, true), round(2, true), round(3, true)]);

    expect(component.dashboardStatus).toBe('Game completed');
  });

  it('shows a non-final active round as started', () => {
    rounds$.next([round(1, false)]);

    expect(component.dashboardStatus).toBe('Round 1 started');
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

  function round(number: number, pointsConfirmed: boolean): Round {
    return {
      id: `round-${number}`,
      number,
      byes: [],
      pointsConfirmed
    };
  }

  function players(count: number): GamePlayer[] {
    return Array.from({ length: count }, (_, index) => ({
      uid: `player-${index + 1}`,
      displayName: `Player ${index + 1}`,
      pointsForRound: []
    } as GamePlayer));
  }
});
