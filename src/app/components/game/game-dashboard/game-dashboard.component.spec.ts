import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { GamePlayer } from 'src/app/components/player/game-player';
import { AuthService } from 'src/app/services/auth/auth.service';
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
  let dialog: jasmine.SpyObj<MatDialog>;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;
  let players$: BehaviorSubject<GamePlayer[]>;
  let rounds$: BehaviorSubject<Round[]>;
  let loggedIn$: BehaviorSubject<boolean>;
  let currentUser: { uid: string; displayName: string };

  beforeEach(async () => {
    players$ = new BehaviorSubject<GamePlayer[]>(players(4));
    rounds$ = new BehaviorSubject<Round[]>([]);
    loggedIn$ = new BehaviorSubject<boolean>(true);
    currentUser = { uid: 'user-1', displayName: 'Angela' };
    gameService = jasmine.createSpyObj<GameService>('GameService', ['getGame', 'isCurrentUserAdmin']);
    gamePlayerService = jasmine.createSpyObj<GamePlayerService>('GamePlayerService', ['playersForGame', 'addPlayer']);
    roundService = jasmine.createSpyObj<RoundService>('RoundService', ['roundsForGame']);
    snackBar = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
    dialog = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate', 'navigateByUrl']);
    authService = {
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.callFake(() => currentUser),
      isLoggedIn$: loggedIn$.asObservable()
    } as unknown as jasmine.SpyObj<AuthService>;

    gameService.getGame.and.returnValue(of(game(3)));
    gameService.isCurrentUserAdmin.and.returnValue(of(true));
    gamePlayerService.playersForGame.and.returnValue(players$.asObservable());
    roundService.roundsForGame.and.returnValue(rounds$.asObservable());
    dialog.open.and.returnValue({ afterClosed: () => of(false) } as never);

    await TestBed.configureTestingModule({
      declarations: [GameDashboardComponent],
      providers: [
        { provide: GameService, useValue: gameService },
        { provide: GamePlayerService, useValue: gamePlayerService },
        { provide: RoundService, useValue: roundService },
        { provide: AuthService, useValue: authService },
        { provide: MatDialog, useValue: dialog },
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

  it('keeps tournament completed after the final round is finalized', () => {
    rounds$.next([round(1, true), round(2, true), round(3, true)]);

    expect(component.dashboardStatus).toBe('Tournament completed');
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

  it('shows the dashboard join action before the current user joins', () => {
    expect(component.canCurrentUserJoin).toBeTrue();

    const content = fixture.nativeElement.textContent as string;
    expect(content).toContain('Join this tournament');
  });

  it('hides the dashboard join action after the current user joins', () => {
    players$.next([
      { uid: 'user-1', displayName: 'Angela', pointsForRound: [] } as GamePlayer
    ]);
    fixture.detectChanges();

    expect(component.hasCurrentUserJoined).toBeTrue();
    expect(component.canCurrentUserJoin).toBeFalse();
  });

  it('adds the signed-in current user from the dashboard join action', () => {
    component.joinTournament();

    expect(gamePlayerService.addPlayer).toHaveBeenCalledWith(jasmine.objectContaining({
      uid: 'user-1',
      displayName: 'Angela'
    }), 'game-1');
  });

  it('prompts logged-out visitors to log in before joining', () => {
    currentUser = undefined;
    loggedIn$.next(false);

    component.joinTournament();

    expect(dialog.open).toHaveBeenCalled();
    expect(gamePlayerService.addPlayer).not.toHaveBeenCalled();
  });

  it('starts the next round directly when the rounds component is available', () => {
    const roundsComponent = jasmine.createSpyObj('RoundsComponent', ['startRound']);
    component.roundsComponent = roundsComponent;

    component.takeNextStep();

    expect(roundsComponent.startRound).toHaveBeenCalledWith(1);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('does not offer round start actions to non-admins', () => {
    gameService.isCurrentUserAdmin.and.returnValue(of(false));
    fixture = TestBed.createComponent(GameDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rounds$.next([round(1, true)]);

    expect(component.isCurrentUserAdmin).toBeFalse();
    expect(component.nextStepTitle).toBe('Waiting for admin to start round 2');
    expect(component.nextStepButtonText).toBe('View standings');
    expect(component.showStandingsAction).toBeFalse();

    const roundsComponent = jasmine.createSpyObj('RoundsComponent', ['startRound']);
    component.roundsComponent = roundsComponent;
    component.takeNextStep();

    expect(roundsComponent.startRound).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
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
