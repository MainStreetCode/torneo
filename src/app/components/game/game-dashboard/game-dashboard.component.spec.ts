import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { GamePlayer } from 'src/app/components/player/game-player';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { Round } from 'src/app/services/round/round';
import { RoundService } from 'src/app/services/round/round.service';

import { GameDashboardComponent } from './game-dashboard.component';

describe('GameDashboardComponent', () => {
  let component: GameDashboardComponent;
  let fixture: ComponentFixture<GameDashboardComponent>;
  let gameService: jasmine.SpyObj<GameService>;
  let gamePlayerService: jasmine.SpyObj<GamePlayerService>;
  let roundService: jasmine.SpyObj<RoundService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let router: jasmine.SpyObj<Router>;
  let players$: BehaviorSubject<GamePlayer[]>;
  let rounds$: BehaviorSubject<Round[]>;

  beforeEach(async () => {
    players$ = new BehaviorSubject<GamePlayer[]>(players(4));
    rounds$ = new BehaviorSubject<Round[]>([]);
    gameService = jasmine.createSpyObj<GameService>('GameService', ['getGame']);
    gamePlayerService = jasmine.createSpyObj<GamePlayerService>('GamePlayerService', ['playersForGame']);
    roundService = jasmine.createSpyObj<RoundService>('RoundService', ['roundsForGame']);
    snackBar = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate', 'navigateByUrl']);

    gameService.getGame.and.returnValue(of(game(3)));
    gamePlayerService.playersForGame.and.returnValue(players$.asObservable());
    roundService.roundsForGame.and.returnValue(rounds$.asObservable());

    await TestBed.configureTestingModule({
      declarations: [GameDashboardComponent],
      providers: [
        { provide: GameService, useValue: gameService },
        { provide: GamePlayerService, useValue: gamePlayerService },
        { provide: RoundService, useValue: roundService },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: Location, useValue: jasmine.createSpyObj<Location>('Location', ['back']) },
        { provide: Router, useValue: router },
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

  it('prompts setup when the number of rounds is missing', () => {
    gameService.getGame.and.returnValue(of(game(0)));
    fixture = TestBed.createComponent(GameDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.nextStepTitle).toBe('Finish tournament setup');

    component.takeNextStep();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/game/game-1/configuration');
  });

  it('prompts players when fewer than 4 players are available', () => {
    players$.next(players(3));

    expect(component.nextStepTitle).toBe('Add players');
    expect(component.nextStepButtonText).toBe('Go to players');
    expect(component.showStandingsAction).toBeFalse();
  });

  it('opens the active round when scores are needed', () => {
    rounds$.next([round(1, false)]);

    expect(component.nextStepTitle).toBe('Enter scores for round 1');

    component.takeNextStep();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/game/game-1/round/round-1');
  });

  it('prompts the next round after the latest round is complete', () => {
    rounds$.next([round(1, true)]);

    expect(component.nextStepTitle).toBe('Start round 2');
    expect(component.nextStepButtonText).toBe('Start round 2');
    expect(component.showStandingsAction).toBeTrue();
  });

  it('does not show standings before the first round starts', () => {
    expect(component.nextStepTitle).toBe('Start round 1');
    expect(component.showStandingsAction).toBeFalse();
  });

  it('starts the next round directly when the rounds component is available', () => {
    const roundsComponent = jasmine.createSpyObj('RoundsComponent', ['startRound']);
    component.roundsComponent = roundsComponent;

    component.takeNextStep();

    expect(roundsComponent.startRound).toHaveBeenCalledWith(1);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('scrolls to standings when the tournament is complete', fakeAsync(() => {
    const standingsElement = jasmine.createSpyObj<HTMLElement>('HTMLElement', ['scrollIntoView']);
    spyOn(document, 'getElementById').and.returnValue(standingsElement);
    rounds$.next([round(1, true), round(2, true), round(3, true)]);

    expect(component.nextStepButtonText).toBe('View standings');

    component.takeNextStep();
    tick();

    expect(router.navigate).toHaveBeenCalledWith([], jasmine.objectContaining({
      queryParams: {
        selectedTab: component.playersTab
      }
    }));
    expect(document.getElementById).toHaveBeenCalledWith('players-standings');
    expect(standingsElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  }));

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
