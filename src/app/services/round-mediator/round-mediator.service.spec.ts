import { GamePlayer } from 'src/app/components/player/game-player';
import { Table } from 'src/app/components/table/table';
import { Team } from 'src/app/components/team/team';
import { Game } from '../game/game';
import { GameService } from '../game/game.service';
import { GamePlayerService } from '../gamePlayer/game-player.service';
import { MessageService } from '../message/message.service';
import { Round } from '../round/round';
import { RoundService } from '../round/round.service';
import { TableService } from '../table/table.service';
import { TeamService } from '../team/team.service';
import { assignPlayersToTables, FixedTableAssignmentError } from './round-mediator.service';
import { RoundMediatorService } from './round-mediator.service';
import { of, throwError } from 'rxjs';

describe('assignPlayersToTables', () => {
  function player(uid: string, fixedTableNumber?: number): GamePlayer {
    return {
      uid,
      displayName: uid,
      fixedTableNumber,
      pointsForRound: []
    } as GamePlayer;
  }

  function assignedIds(players: GamePlayer[]): string[] {
    return assignPlayersToTables(players)
      .map((table) => table.teams)
      .flat()
      .map((team) => team.teamPlayers)
      .flat()
      .map((teamPlayer) => teamPlayer.player.uid);
  }

  function playerIdsForTable(tableNumber: number, players: GamePlayer[]): string[] {
    const tables = assignPlayersToTables(players);
    const table = tables.find((tableData) => tableData.number === tableNumber);

    return table.teams
      .map((team) => team.teamPlayers)
      .flat()
      .map((teamPlayer) => teamPlayer.player.uid);
  }

  it('assigns a fixed player to table 1', () => {
    const players = [
      player('fixed', 1),
      player('p2'),
      player('p3'),
      player('p4')
    ];

    expect(playerIdsForTable(1, players)).toContain('fixed');
  });

  it('keeps non-fixed players assigned to remaining seats', () => {
    const players = [
      player('fixed', 1),
      player('p2'),
      player('p3'),
      player('p4'),
      player('p5'),
      player('p6'),
      player('p7'),
      player('p8')
    ];

    expect(assignedIds(players).sort()).toEqual(players.map((p) => p.uid).sort());
  });

  it('supports multiple fixed players on different tables', () => {
    const players = [
      player('fixed-1', 1),
      player('fixed-2', 2),
      player('p3'),
      player('p4'),
      player('p5'),
      player('p6'),
      player('p7'),
      player('p8')
    ];

    expect(playerIdsForTable(1, players)).toContain('fixed-1');
    expect(playerIdsForTable(2, players)).toContain('fixed-2');
  });

  it('supports up to 4 fixed players on the same table', () => {
    const players = [
      player('fixed-1', 1),
      player('fixed-2', 1),
      player('fixed-3', 1),
      player('fixed-4', 1)
    ];

    expect(playerIdsForTable(1, players).sort()).toEqual(['fixed-1', 'fixed-2', 'fixed-3', 'fixed-4']);
  });

  it('blocks more than 4 fixed players on one table', () => {
    const players = [
      player('fixed-1', 1),
      player('fixed-2', 1),
      player('fixed-3', 1),
      player('fixed-4', 1),
      player('fixed-5', 1),
      player('p6'),
      player('p7'),
      player('p8')
    ];

    expect(() => assignPlayersToTables(players)).toThrowError(FixedTableAssignmentError);
  });

  it('does not assign a fixed player who is on bye', () => {
    const activePlayers = [
      player('p1'),
      player('p2'),
      player('p3'),
      player('p4')
    ];

    expect(playerIdsForTable(1, activePlayers)).not.toContain('fixed-bye');
  });

  it('blocks a fixed table number greater than the available table count', () => {
    const players = [
      player('fixed', 2),
      player('p2'),
      player('p3'),
      player('p4')
    ];

    expect(() => assignPlayersToTables(players)).toThrowError(FixedTableAssignmentError);
  });
});

describe('RoundMediatorService', () => {
  let service: RoundMediatorService;
  let gameService: jasmine.SpyObj<GameService>;
  let roundService: jasmine.SpyObj<RoundService>;
  let gamePlayerService: jasmine.SpyObj<GamePlayerService>;
  let messageService: jasmine.SpyObj<MessageService>;
  let tableService: jasmine.SpyObj<TableService>;
  let teamService: jasmine.SpyObj<TeamService>;

  beforeEach(() => {
    gameService = jasmine.createSpyObj<GameService>('GameService', ['getGame', 'updateGame']);
    roundService = jasmine.createSpyObj<RoundService>('RoundService', [
      'getRound',
      'roundsForGame',
      'updateRound',
      'addRound'
    ]);
    gamePlayerService = jasmine.createSpyObj<GamePlayerService>('GamePlayerService', [
      'playersForGame',
      'updatePlayerRoundPoints',
      'deletePlayerRoundPoints'
    ]);
    messageService = jasmine.createSpyObj<MessageService>('MessageService', ['add']);
    tableService = jasmine.createSpyObj<TableService>('TableService', ['getTablesForRound', 'addTable']);
    teamService = jasmine.createSpyObj<TeamService>('TeamService', ['addTeam', 'getTeamsForTable']);

    service = new RoundMediatorService(
      gameService,
      roundService,
      gamePlayerService,
      messageService,
      teamService,
      tableService
    );

    spyOn(service, 'updatePlayerPoints').and.returnValue(of([]));
    spyOn(service, 'updateByePlayerPoints').and.returnValue(of([]));
    spyOn(service, 'createRound').and.returnValue(of({ round: round(1), tables: [] as Table[] }));
    roundService.updateRound.and.callFake((roundToUpdate) => of(roundToUpdate));
    roundService.addRound.and.callFake((roundToAdd) => of({ ...roundToAdd, id: 'new-round' }));
    gameService.updateGame.and.callFake((gameToUpdate) => of(gameToUpdate));
    gamePlayerService.updatePlayerRoundPoints.and.returnValue(of(undefined));
    gamePlayerService.deletePlayerRoundPoints.and.returnValue(of(undefined));
    tableService.addTable.and.callFake((tableToAdd) => of({ ...tableToAdd, id: `table-${tableToAdd.number}` }));
    teamService.addTeam.and.callFake((teamToAdd) => of(teamToAdd));
    tableService.getTablesForRound.and.returnValue(of([table(true)]));
  });

  it('returns finalized for an already finalized round without starting another round', (done) => {
    roundService.getRound.and.returnValue(of({ ...round(3), pointsConfirmed: true }));

    service.finalizeRoundIfReady('round-3', 'game-1').subscribe({
      next: (finalized) => {
        expect(finalized).toBeFalse();
        expect(service.createRound).not.toHaveBeenCalled();
        done();
      }
    });
  });

  it('finalizes the round without starting another round', (done) => {
    roundService.getRound.and.returnValue(of({ ...round(2), pointsConfirmed: false }));

    service.finalizeRoundIfReady('round-2', 'game-1').subscribe({
      next: (finalized) => {
        expect(finalized).toBeTrue();
        expect(roundService.getRound).toHaveBeenCalledTimes(1);
        expect(roundService.updateRound).toHaveBeenCalledWith(jasmine.objectContaining({
          id: 'round-2',
          pointsConfirmed: true
        }), 'game-1');
        expect(service.createRound).not.toHaveBeenCalled();
        done();
      }
    });
  });

  it('does not start another round when finalization is skipped', (done) => {
    roundService.getRound.and.returnValue(of({ ...round(2), pointsConfirmed: false }));
    tableService.getTablesForRound.and.returnValue(of([table(false)]));

    service.finalizeRoundIfReady('round-2', 'game-1').subscribe({
      next: (finalized) => {
        expect(finalized).toBeFalse();
        expect(service.createRound).not.toHaveBeenCalled();
        done();
      }
    });
  });

  it('does not update points again when the round was already finalized', (done) => {
    roundService.getRound.and.returnValue(of(round(2)));

    service.finalizeRoundIfReady('round-2', 'game-1').subscribe({
      next: (finalized) => {
        expect(finalized).toBeFalse();
        expect(service.updatePlayerPoints).not.toHaveBeenCalled();
        expect(service.createRound).not.toHaveBeenCalled();
        done();
      }
    });
  });

  it('throws when the next round document is not created', (done) => {
    (service.createRound as jasmine.Spy).and.callThrough();
    gameService.getGame.and.returnValue(of(game(3)));
    gamePlayerService.playersForGame.and.returnValue(of(players(4)));
    roundService.roundsForGame.and.returnValue(of([round(1), round(2)]));
    roundService.addRound.and.returnValue(of(undefined));

    service.createRound('game-1', 3).subscribe({
      error: (error) => {
        expect(error.message).toContain('Unable to create the next round');
        done();
      }
    });
  });

  it('throws when the requested round number already exists', (done) => {
    (service.createRound as jasmine.Spy).and.callThrough();
    gameService.getGame.and.returnValue(of(game(3)));
    gamePlayerService.playersForGame.and.returnValue(of(players(4)));
    roundService.roundsForGame.and.returnValue(of([round(1), round(2)]));

    service.createRound('game-1', 2).subscribe({
      error: (error) => {
        expect(error.message).toContain('Round 2 already exists');
        expect(roundService.addRound).not.toHaveBeenCalled();
        expect(gameService.updateGame).not.toHaveBeenCalled();
        done();
      }
    });
  });

  it('throws when a next-round table is not created', (done) => {
    (service.createRound as jasmine.Spy).and.callThrough();
    gameService.getGame.and.returnValue(of(game(3)));
    gamePlayerService.playersForGame.and.returnValue(of(players(4)));
    roundService.roundsForGame.and.returnValue(of([round(1), round(2)]));
    tableService.addTable.and.returnValue(of(undefined));

    service.createRound('game-1', 3).subscribe({
      error: (error) => {
        expect(error.message).toContain('Unable to create table 1');
        done();
      }
    });
  });

  it('throws when next-round team creation fails', (done) => {
    const error = new Error('team write failed');
    (service.createRound as jasmine.Spy).and.callThrough();
    gameService.getGame.and.returnValue(of(game(3)));
    gamePlayerService.playersForGame.and.returnValue(of(players(4)));
    roundService.roundsForGame.and.returnValue(of([round(1), round(2)]));
    teamService.addTeam.and.returnValue(throwError(() => error));

    service.createRound('game-1', 3).subscribe({
      error: (thrownError) => {
        expect(thrownError).toBe(error);
        done();
      }
    });
  });

  it('updates only the current player points instead of the stale table snapshot', (done) => {
    (service.updatePlayerPoints as jasmine.Spy).and.callThrough();
    const currentPlayer = {
      uid: 'player-1',
      displayName: 'Edited Name',
      fixedTableNumber: 2,
      pointsForRound: []
    } as GamePlayer;
    const tableSnapshotPlayer = {
      uid: 'player-1',
      displayName: 'Old Name',
      pointsForRound: []
    } as GamePlayer;

    gamePlayerService.playersForGame.and.returnValue(of([currentPlayer]));
    tableService.getTablesForRound.and.returnValue(of([{ ...table(true), id: 'table-1' }]));
    teamService.getTeamsForTable.and.returnValue(of([{
      id: 'team-1',
      points: 12,
      teamPlayers: [{
        player: tableSnapshotPlayer,
        points: 12,
        isPointsConfirmed: false
      }]
    } as Team]));

    service.updatePlayerPoints('round-1', 'game-1', 1).subscribe({
      next: () => {
        expect(gamePlayerService.updatePlayerRoundPoints).toHaveBeenCalledWith('player-1', 'game-1', {
          roundId: 'round-1',
          roundNumber: 1,
          points: 12
        });
        done();
      }
    });
  });

  it('returns the created round with its tables', (done) => {
    (service.createRound as jasmine.Spy).and.callThrough();
    gameService.getGame.and.returnValue(of(game(3)));
    gamePlayerService.playersForGame.and.returnValue(of(players(4)));
    roundService.roundsForGame.and.returnValue(of([]));

    service.createRound('game-1', 1).subscribe({
      next: (result) => {
        expect(result.round.id).toBe('new-round');
        expect(result.tables.length).toBe(1);
        expect(result.tables[0].id).toBe('table-1');
        done();
      }
    });
  });

  it('does not select the same bye player twice when the bye pool refills mid-round', (done) => {
    (service.createRound as jasmine.Spy).and.callThrough();
    spyOn(Math, 'random').and.returnValue(0);
    const gamePlayers = players(6);
    const currentGame = {
      ...game(3),
      byePool: [gamePlayers[0]]
    };
    gameService.getGame.and.returnValue(of(currentGame));
    gamePlayerService.playersForGame.and.returnValue(of(gamePlayers));
    roundService.roundsForGame.and.returnValue(of([]));

    service.createRound('game-1', 1).subscribe({
      next: (result) => {
        const byeIds = result.round.byes.map((bye) => bye.uid);
        const uniqueByeIds = new Set(byeIds);

        expect(byeIds.length).toBe(2);
        expect(uniqueByeIds.size).toBe(2);
        expect(result.tables[0].playerIds.length).toBe(4);
        done();
      }
    });
  });

  it('throws when active players cannot be evenly assigned to tables', () => {
    expect(() => assignPlayersToTables(players(5))).toThrowError(FixedTableAssignmentError);
  });

  function table(pointsConfirmed: boolean): Table {
    return {
      id: 'table-1',
      number: 1,
      playerIds: [],
      pointsConfirmed
    } as Table;
  }

  function round(number: number): Round {
    return {
      id: `round-${number}`,
      number,
      byes: [],
      pointsConfirmed: number < 3
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
