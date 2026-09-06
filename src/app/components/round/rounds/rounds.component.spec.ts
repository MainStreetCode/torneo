import { of, Subject } from 'rxjs';
import { GamePlayer } from 'src/app/components/player/game-player';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { RoundMediatorService } from 'src/app/services/round-mediator/round-mediator.service';
import { Round } from 'src/app/services/round/round';
import { RoundService } from 'src/app/services/round/round.service';

import { RoundsComponent } from './rounds.component';

describe('RoundsComponent', () => {
  let component: RoundsComponent;
  let roundService: jasmine.SpyObj<RoundService>;
  let roundMediatorService: jasmine.SpyObj<RoundMediatorService>;
  let gameService: jasmine.SpyObj<GameService>;
  let router: jasmine.SpyObj<any>;
  let dialog: jasmine.SpyObj<any>;
  let playerService: jasmine.SpyObj<GamePlayerService>;

  beforeEach(() => {
    roundService = jasmine.createSpyObj<RoundService>('RoundService', ['roundsForGame']);
    roundMediatorService = jasmine.createSpyObj<RoundMediatorService>('RoundMediatorService', [
      'allTablesConfirmed',
      'createRound'
    ]);
    gameService = jasmine.createSpyObj<GameService>('GameService', ['isCurrentUserAdmin']);
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    playerService = jasmine.createSpyObj<GamePlayerService>('GamePlayerService', ['playersForGame']);

    dialog.open.and.returnValue({ afterClosed: () => of(undefined) });
    gameService.isCurrentUserAdmin.and.returnValue(of(true));
    roundService.roundsForGame.and.returnValue(of([]));
    roundMediatorService.allTablesConfirmed.and.returnValue(of(true));
    roundMediatorService.createRound.and.returnValue(of({
      round: round(1),
      tables: []
    }));
    playerService.playersForGame.and.returnValue(of(players(4)));

    component = new RoundsComponent(
      roundService,
      roundMediatorService,
      gameService,
      router,
      dialog,
      playerService
    );
    component.game = game(3);
    component.allTablesPointsConfirmed$ = of(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigates to the newly created first round', () => {
    roundMediatorService.createRound.and.returnValue(of({
      round: round(1),
      tables: []
    }));

    component.startRound(1);

    expect(roundMediatorService.createRound).toHaveBeenCalledWith('game-1', 1);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/game/game-1/round/round-1');
  });

  it('does not navigate to a stale cached round after creating the next round', () => {
    component.rounds = [round(1)];
    roundMediatorService.createRound.and.returnValue(of({
      round: round(2),
      tables: []
    }));

    component.startRound(2);

    expect(roundMediatorService.createRound).toHaveBeenCalledWith('game-1', 2);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/game/game-1/round/round-2');
  });

  it('ignores another start request while round creation is in progress', () => {
    const createRound$ = new Subject<any>();
    roundMediatorService.createRound.and.returnValue(createRound$.asObservable());

    component.startRound(1);
    component.startRound(1);

    expect(roundMediatorService.createRound).toHaveBeenCalledTimes(1);
    expect(component.isStartingRound).toBeTrue();

    createRound$.next({
      round: round(1),
      tables: []
    });
    createRound$.complete();

    expect(component.isStartingRound).toBeFalse();
  });

  it('explains that rounds are blocked by missing setup', () => {
    component.game = game(0);
    component.playerCount = 2;

    expect(component.emptyRoundsTitle).toBe('No rounds yet');
    expect(component.emptyRoundsMessage).toBe('Set the number of rounds before starting round 1.');
    expect(component.emptyRoundsActionText).toBe('Open setup');
  });

  it('points admins to players when the first round needs more players', () => {
    component.playerCount = 3;
    component.isUserAdmin = true;

    expect(component.emptyRoundsMessage).toBe('Add 1 more player, then start round 1.');

    component.takeEmptyRoundsAction();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/game/game-1/dashboard?selectedTab=0');
  });

  it('starts round 1 from the empty rounds action when setup is ready', () => {
    component.playerCount = 4;
    component.isUserAdmin = true;

    expect(component.emptyRoundsActionText).toBe('Start round 1');

    component.takeEmptyRoundsAction();

    expect(roundMediatorService.createRound).toHaveBeenCalledWith('game-1', 1);
  });

  it('tells players they are waiting for an admin when setup is ready', () => {
    component.playerCount = 4;
    component.isUserAdmin = false;

    expect(component.showEmptyRoundsAction).toBeFalse();
    expect(component.emptyRoundsMessage).toBe('Setup is ready. Waiting for an admin to start round 1.');
  });

  function round(number: number): Round {
    return {
      id: `round-${number}`,
      number,
      byes: [],
      pointsConfirmed: number < 2
    };
  }

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

  function players(count: number): GamePlayer[] {
    return Array.from({ length: count }, (_, index) => ({
      uid: `player-${index + 1}`,
      displayName: `Player ${index + 1}`,
      pointsForRound: []
    } as GamePlayer));
  }
});
