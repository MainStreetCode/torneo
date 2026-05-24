import { of } from 'rxjs';

import { AuthService } from 'src/app/services/auth/auth.service';
import { GameService } from 'src/app/services/game/game.service';
import { RoundMediatorService } from 'src/app/services/round-mediator/round-mediator.service';
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
  let currentUserId: string;

  beforeEach(() => {
    currentUserId = 'player-a';
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['getCurrentUser']);
    gameService = jasmine.createSpyObj<GameService>('GameService', ['isUserAdmin']);
    teamService = jasmine.createSpyObj<TeamService>('TeamService', ['updateTeam']);
    tableService = jasmine.createSpyObj<TableService>('TableService', ['updateTable']);
    roundMediatorService = jasmine.createSpyObj<RoundMediatorService>('RoundMediatorService', ['finalizeRoundIfReady']);

    authService.getCurrentUser.and.callFake(() => ({ uid: currentUserId } as any));
    gameService.isUserAdmin.and.returnValue(of(false));
    teamService.updateTeam.and.returnValue(of(undefined));
    tableService.updateTable.and.returnValue(of(undefined));
    roundMediatorService.finalizeRoundIfReady.and.returnValue(of(true));

    component = new TableDetailComponent(
      authService,
      gameService,
      {} as any,
      {} as any,
      teamService,
      tableService,
      {} as RoundService,
      roundMediatorService
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

  it('does not allow a player to confirm their own team points', () => {
    component.toggleTeamConfirmPoints(component.teams[0], true);

    expect(component.teams[0].pointConfirmations).toBeUndefined();
    expect(teamService.updateTeam).not.toHaveBeenCalled();
  });

  it('confirms the table only after every team has an opponent confirmation', () => {
    component.toggleTeamConfirmPoints(component.teams[1], true);
    currentUserId = 'player-b';

    component.toggleTeamConfirmPoints(component.teams[0], true);

    expect(component.teams[0].pointConfirmations).toEqual([
      { teamId: 'team-b', playerId: 'player-b' }
    ]);
    expect(component.teams[1].pointConfirmations).toEqual([
      { teamId: 'team-a', playerId: 'player-a' }
    ]);
    expect(component.pointsConfirmed).toBeTrue();
    expect(component.table.pointsConfirmed).toBeTrue();
    expect(tableService.updateTable).toHaveBeenCalledWith(component.table, 'round-1', 'game-1');
    expect(roundMediatorService.finalizeRoundIfReady).toHaveBeenCalledWith('round-1', 'game-1');
  });

  it('clears all confirmations and table confirmation when team points change', () => {
    component.table = createTable(true);
    component.teams = [
      createTeam('team-a', ['player-a'], [{ teamId: 'team-b', playerId: 'player-b' }]),
      createTeam('team-b', ['player-b'], [{ teamId: 'team-a', playerId: 'player-a' }])
    ];

    component.updateTeamPoints(component.teams[0], 12);

    expect(component.teams[0].points).toBe(12);
    expect(component.teams[0].pointConfirmations).toEqual([]);
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
