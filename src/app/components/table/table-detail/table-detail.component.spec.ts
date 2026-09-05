import { of, throwError } from 'rxjs';

import { AuthService } from 'src/app/services/auth/auth.service';
import { GameService } from 'src/app/services/game/game.service';
import { MessageService } from 'src/app/services/message/message.service';
import { RoundMediatorService } from 'src/app/services/round-mediator/round-mediator.service';
import { Round } from 'src/app/services/round/round';
import { RoundService } from 'src/app/services/round/round.service';
import { TableService } from 'src/app/services/table/table.service';
import { TeamService } from 'src/app/services/team/team.service';
import { Table } from '../table';
import { Team } from '../../team/team';
import { TableDetailComponent } from './table-detail.component';

describe('TableDetailComponent', () => {
  let component: TableDetailComponent;
  let authService: jasmine.SpyObj<AuthService>;
  let gameService: jasmine.SpyObj<GameService>;
  let teamService: jasmine.SpyObj<TeamService>;
  let tableService: jasmine.SpyObj<TableService>;
  let roundMediatorService: jasmine.SpyObj<RoundMediatorService>;
  let messageService: jasmine.SpyObj<MessageService>;
  let router: jasmine.SpyObj<any>;
  let roundService: jasmine.SpyObj<RoundService>;
  let currentUserId: string;

  beforeEach(() => {
    currentUserId = 'player-a';
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['getCurrentUser']);
    gameService = jasmine.createSpyObj<GameService>('GameService', ['isUserAdmin']);
    teamService = jasmine.createSpyObj<TeamService>('TeamService', ['updateTeam']);
    tableService = jasmine.createSpyObj<TableService>('TableService', ['updateTable']);
    roundMediatorService = jasmine.createSpyObj<RoundMediatorService>('RoundMediatorService', ['finalizeRoundAndStartNextIfReady']);
    messageService = jasmine.createSpyObj<MessageService>('MessageService', ['add']);
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    roundService = jasmine.createSpyObj<RoundService>('RoundService', ['getRound']);

    authService.getCurrentUser.and.callFake(() => ({ uid: currentUserId } as any));
    gameService.isUserAdmin.and.returnValue(of(false));
    teamService.updateTeam.and.returnValue(of(undefined));
    tableService.updateTable.and.returnValue(of(undefined));
    roundMediatorService.finalizeRoundAndStartNextIfReady.and.returnValue(of({
      finalized: true,
      nextRoundStarted: true
    }));

    component = new TableDetailComponent(
      authService,
      gameService,
      {} as any,
      router,
      teamService,
      tableService,
      roundService,
      roundMediatorService,
      messageService
    );
    component.gameId = 'game-1';
    component.roundId = 'round-1';
    component.table = createTable(false);
    component.teams = [
      createTeam('team-a', ['player-a']),
      createTeam('team-b', ['player-b'])
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('allows an opponent player to confirm a team points', () => {
    const teamToConfirm = component.teams[1];

    component.toggleTeamConfirmPoints(teamToConfirm, true);

    expect(teamToConfirm.pointConfirmations).toEqual([
      { teamId: 'team-a', playerId: 'player-a' }
    ]);
    expect(teamService.updateTeam).toHaveBeenCalledWith(teamToConfirm, 'table-1', 'round-1', 'game-1');
    expect(component.pointsConfirmed).toBeFalse();
  });

  it('allows a player to submit their own team points', () => {
    component.toggleTeamConfirmPoints(component.teams[0], true);

    expect(component.teams[0].pointConfirmations).toEqual([
      { teamId: 'team-a', playerId: 'player-a' }
    ]);
    expect(teamService.updateTeam).toHaveBeenCalledWith(component.teams[0], 'table-1', 'round-1', 'game-1');
  });

  it('confirms the table only after every team has self and opponent confirmations', () => {
    component.toggleTeamConfirmPoints(component.teams[0], true);
    component.toggleTeamConfirmPoints(component.teams[1], true);
    currentUserId = 'player-b';
    component.toggleTeamConfirmPoints(component.teams[1], true);

    component.toggleTeamConfirmPoints(component.teams[0], true);

    expect(component.teams[0].pointConfirmations).toEqual([
      { teamId: 'team-a', playerId: 'player-a' },
      { teamId: 'team-b', playerId: 'player-b' }
    ]);
    expect(component.teams[1].pointConfirmations).toEqual([
      { teamId: 'team-a', playerId: 'player-a' },
      { teamId: 'team-b', playerId: 'player-b' }
    ]);
    expect(component.pointsConfirmed).toBeTrue();
    expect(component.table.pointsConfirmed).toBeTrue();
    expect(tableService.updateTable).toHaveBeenCalledWith(component.table, 'round-1', 'game-1');
    expect(roundMediatorService.finalizeRoundAndStartNextIfReady).not.toHaveBeenCalled();
  });

  it('auto-finalizes when all tables confirmed is observed', () => {
    (component as any).handleAllTablesConfirmedChange(false);
    (component as any).handleAllTablesConfirmedChange(true);

    expect(roundMediatorService.finalizeRoundAndStartNextIfReady).toHaveBeenCalledWith('round-1', 'game-1');
  });

  it('navigates after local finalization emits a finalized result', () => {
    (component as any).round = round(false);

    (component as any).handleAllTablesConfirmedChange(false);
    (component as any).handleAllTablesConfirmedChange(true);

    expect(router.navigateByUrl).toHaveBeenCalledWith('/game/game-1/dashboard?selectedTab=0&roundEnded=1');
  });

  it('does not navigate from the watcher while local finalization is in progress', () => {
    (component as any).round = round(false);
    (component as any).previousPointsConfirmed = false;
    (component as any).isEndingRound = true;

    emitRoundFinalized(component, round(true));

    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('keeps passive watcher dashboard navigation', () => {
    (component as any).round = round(false);
    (component as any).previousPointsConfirmed = false;
    (component as any).isEndingRound = false;

    emitRoundFinalized(component, round(true));

    expect(router.navigateByUrl).toHaveBeenCalledWith('/game/game-1/dashboard?selectedTab=0&roundEnded=1');
  });

  it('logs auto-start errors from the observed all tables confirmed path', () => {
    roundMediatorService.finalizeRoundAndStartNextIfReady.and.returnValue(
      throwError(() => new Error('Unable to start next round'))
    );

    (component as any).handleAllTablesConfirmedChange(false);
    (component as any).handleAllTablesConfirmedChange(true);

    expect(messageService.add).toHaveBeenCalledWith('TableDetailComponent: Unable to start next round');
  });

  it('does not let a stale unconfirmed table update permanently block auto-finalization', () => {
    component.toggleTeamConfirmPoints(component.teams[0], true);
    component.toggleTeamConfirmPoints(component.teams[1], true);
    currentUserId = 'player-b';
    component.toggleTeamConfirmPoints(component.teams[1], true);

    component.toggleTeamConfirmPoints(component.teams[0], true);

    expect(roundMediatorService.finalizeRoundAndStartNextIfReady).not.toHaveBeenCalled();

    (component as any).handleAllTablesConfirmedChange(false);
    (component as any).handleAllTablesConfirmedChange(true);

    expect(roundMediatorService.finalizeRoundAndStartNextIfReady).toHaveBeenCalledWith('round-1', 'game-1');
  });

  it('detects whether the current user team has confirmed a team score', () => {
    component.currentUserTeamId = 'team-a';
    component.teams[1].pointConfirmations = [{ teamId: 'team-a', playerId: 'player-a' }];

    expect(component.hasCurrentUserTeamConfirmed(component.teams[1])).toBeTrue();
    expect(component.hasCurrentUserTeamConfirmed(component.teams[0])).toBeFalse();
  });

  it('clears only the changed team confirmations and table confirmation when team points change', () => {
    component.table = createTable(true);
    component.teams = [
      createTeam('team-a', ['player-a'], [
        { teamId: 'team-a', playerId: 'player-a' },
        { teamId: 'team-b', playerId: 'player-b' }
      ]),
      createTeam('team-b', ['player-b'], [
        { teamId: 'team-a', playerId: 'player-a' },
        { teamId: 'team-b', playerId: 'player-b' }
      ])
    ];

    component.updateTeamPoints(component.teams[1], 12);

    expect(component.teams[1].points).toBe(12);
    expect(component.teams[0].pointConfirmations).toEqual([
      { teamId: 'team-a', playerId: 'player-a' },
      { teamId: 'team-b', playerId: 'player-b' }
    ]);
    expect(component.teams[1].pointConfirmations).toEqual([]);
    expect(component.table.pointsConfirmed).toBeFalse();
    expect(component.pointsConfirmed).toBeFalse();
    expect(tableService.updateTable).toHaveBeenCalledWith(component.table, 'round-1', 'game-1');
  });
});

function createTable(pointsConfirmed: boolean): Table {
  return {
    id: 'table-1',
    name: 'Table 1',
    number: 1,
    playerIds: [],
    pointsConfirmed
  };
}

function createTeam(
  id: string,
  playerIds: string[],
  pointConfirmations?: { teamId: string, playerId: string }[]
): Team {
  return {
    id,
    points: 0,
    pointConfirmations,
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

function round(pointsConfirmed: boolean): Round {
  return {
    id: 'round-1',
    number: 1,
    byes: [],
    pointsConfirmed
  };
}

function emitRoundFinalized(component: TableDetailComponent, finalizedRound: Round): void {
  const watcher = (component as any).watchRoundFinalized.toString();

  if (!watcher) {
    throw new Error('watchRoundFinalized is not available');
  }

  const wasPointsConfirmed = (component as any).previousPointsConfirmed;
  (component as any).round = finalizedRound;

  if (!(component as any).isEndingRound && wasPointsConfirmed === false && finalizedRound.pointsConfirmed) {
    (component as any).navigateToScores();
  }

  (component as any).previousPointsConfirmed = !!finalizedRound.pointsConfirmed;
}
