import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth/auth.service';
import { GameService } from './services/game/game.service';
import { RoundService } from './services/round/round.service';

describe('AppComponent', () => {
  let routerEvents$: Subject<NavigationEnd>;
  let activeRoute: any;
  let gameService: jasmine.SpyObj<GameService>;
  let roundService: jasmine.SpyObj<RoundService>;

  beforeEach(async () => {
    routerEvents$ = new Subject<NavigationEnd>();
    activeRoute = routeStub('', {});
    gameService = jasmine.createSpyObj<GameService>('GameService', ['getGame']);
    roundService = jasmine.createSpyObj<RoundService>('RoundService', ['getRound']);
    gameService.getGame.and.returnValue(of(undefined));
    roundService.getRound.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: Router, useValue: { ...jasmine.createSpyObj<Router>('Router', ['navigateByUrl']), events: routerEvents$.asObservable() } },
        { provide: ActivatedRoute, useValue: activeRoute },
        { provide: AuthService, useValue: { isLoggedIn$: of(false) } },
        { provide: MatDialog, useValue: jasmine.createSpyObj<MatDialog>('MatDialog', ['open']) },
        { provide: Title, useValue: jasmine.createSpyObj<Title>('Title', ['setTitle']) },
        { provide: GameService, useValue: gameService },
        { provide: RoundService, useValue: roundService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'torneo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Torneo');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.title span').textContent).toContain('Torneo');
  });

  it('builds breadcrumbs for a round route', () => {
    activeRoute.root.firstChild = routeStub('game/:gameId/round/:roundId', {
      gameId: 'game-1',
      roundId: 'round-2'
    });
    gameService.getGame.and.returnValue(of({
      id: 'game-1',
      name: 'Angela\'s Euchre Tournament',
      adminIds: [],
      numberOfRounds: 3,
      createdDate: new Date(),
      byePool: []
    }));
    roundService.getRound.and.returnValue(of({
      id: 'round-2',
      number: 2,
      byes: [],
      pointsConfirmed: false
    }));

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    expect(app.breadcrumbs.map((breadcrumb) => breadcrumb.label)).toEqual([
      'Tournaments',
      'Angela\'s Euchre Tournament',
      'Round 2'
    ]);
    expect(app.currentGameId).toBe('game-1');
  });
});

function routeStub(path: string, params: Record<string, string>): ActivatedRoute {
  const route = {
    snapshot: {
      params,
      routeConfig: { path }
    },
    firstChild: null,
    root: undefined
  };
  route.root = route;

  return route as unknown as ActivatedRoute;
}
