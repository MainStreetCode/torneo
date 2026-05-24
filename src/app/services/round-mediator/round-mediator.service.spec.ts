import { GamePlayer } from 'src/app/components/player/game-player';
import { Table } from 'src/app/components/table/table';
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
      'addRound',
      'claimNextRoundStarted',
      'releaseNextRoundStarted'
    ]);
    gamePlayerService = jasmine.createSpyObj<GamePlayerService>('GamePlayerService', ['playersForGame']);
    messageService = jasmine.createSpyObj<MessageService>('MessageService', ['add']);
    tableService = jasmine.createSpyObj<TableService>('TableService', ['getTablesForRound', 'addTable']);
    teamService = jasmine.createSpyObj<TeamService>('TeamService', ['addTeam']);

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
    spyOn(service, 'createRound').and.returnValue(of([] as Table[]));
    roundService.updateRound.and.callFake((roundToUpdate) => of(roundToUpdate));
    roundService.addRound.and.callFake((roundToAdd) => of({ ...roundToAdd, id: 'new-round' }));
    roundService.releaseNextRoundStarted.and.returnValue(of(undefined));
    gameService.updateGame.and.callFake((gameToUpdate) => of(gameToUpdate));
    tableService.addTable.and.callFake((tableToAdd) => of({ ...tableToAdd, id: `table-${tableToAdd.number}` }));
    teamService.addTeam.and.callFake((teamToAdd) => of(teamToAdd));
    tableService.getTablesForRound.and.returnValue(of([table(true)]));
  });

  it('finalizes the final round without starting another round', (done) => {
    arrangeNextRoundCheck({ ...round(3), pointsConfirmed: true }, [round(1), round(2), round(3)], game(3), players(4));

    service.finalizeRoundAndStartNextIfReady('round-3', 'game-1').subscribe({
      next: (result) => {
        expect(result).toEqual(jasmine.objectContaining({ finalized: true, nextRoundStarted: false }));
        expect(roundService.claimNextRoundStarted).not.toHaveBeenCalled();
        expect(service.createRound).not.toHaveBeenCalled();
        done();
      }
    });
  });

  it('starts the next round after finalizing the latest non-final round without a second round read', (done) => {
    roundService.getRound.and.returnValue(of({ ...round(2), pointsConfirmed: false }));
    roundService.roundsForGame.and.returnValue(of([round(1), round(2)]));
    gameService.getGame.and.returnValue(of(game(3)));
    gamePlayerService.playersForGame.and.returnValue(of(players(4)));
    roundService.claimNextRoundStarted.and.returnValue(of(true));

    service.finalizeRoundAndStartNextIfReady('round-2', 'game-1').subscribe({
      next: (result) => {
        expect(result).toEqual(jasmine.objectContaining({ finalized: true, nextRoundStarted: true }));
        expect(roundService.getRound).toHaveBeenCalledTimes(1);
        expect(roundService.updateRound).toHaveBeenCalledWith(jasmine.objectContaining({
          id: 'round-2',
          pointsConfirmed: true
        }), 'game-1');
        expect(roundService.claimNextRoundStarted).toHaveBeenCalledWith('round-2', 'game-1');
        expect(service.createRound).toHaveBeenCalledWith('game-1', 3);
        done();
      }
    });
  });

  it('does not start another round when finalization is skipped', (done) => {
    roundService.getRound.and.returnValue(of({ ...round(2), pointsConfirmed: false }));
    tableService.getTablesForRound.and.returnValue(of([table(false)]));

    service.finalizeRoundAndStartNextIfReady('round-2', 'game-1').subscribe({
      next: (result) => {
        expect(result).toEqual(jasmine.objectContaining({ finalized: false, nextRoundStarted: false }));
        expect(service.createRound).not.toHaveBeenCalled();
        done();
      }
    });
  });

  it('starts the next round when the round was already finalized but not claimed', (done) => {
    arrangeNextRoundCheck(round(2), [round(1), round(2)], game(3), players(4));
    roundService.claimNextRoundStarted.and.returnValue(of(true));

    service.finalizeRoundAndStartNextIfReady('round-2', 'game-1').subscribe({
      next: (result) => {
        expect(result).toEqual(jasmine.objectContaining({ finalized: true, nextRoundStarted: true, roundAlreadyFinalized: true }));
        expect(service.updatePlayerPoints).not.toHaveBeenCalled();
        expect(roundService.claimNextRoundStarted).toHaveBeenCalledWith('round-2', 'game-1');
        expect(service.createRound).toHaveBeenCalledWith('game-1', 3);
        done();
      }
    });
  });

  it('treats an already claimed round with an existing next round as started', (done) => {
    arrangeNextRoundCheck(
      { ...round(2), nextRoundStarted: true },
      [round(1), { ...round(2), nextRoundStarted: true }, round(3)],
      game(3),
      players(4)
    );

    service.finalizeRoundAndStartNextIfReady('round-2', 'game-1').subscribe({
      next: (result) => {
        expect(result).toEqual(jasmine.objectContaining({ finalized: true, nextRoundStarted: true }));
        expect(roundService.claimNextRoundStarted).not.toHaveBeenCalled();
        expect(service.createRound).not.toHaveBeenCalled();
        done();
      }
    });
  });

  it('resets a stale next round claim and starts the next round when none exists', (done) => {
    arrangeNextRoundCheck(
      { ...round(2), nextRoundStarted: true },
      [round(1), { ...round(2), nextRoundStarted: true }],
      game(3),
      players(4)
    );
    roundService.claimNextRoundStarted.and.returnValue(of(true));

    service.finalizeRoundAndStartNextIfReady('round-2', 'game-1').subscribe({
      next: (result) => {
        expect(result).toEqual(jasmine.objectContaining({ finalized: true, nextRoundStarted: true }));
        expect(roundService.releaseNextRoundStarted).toHaveBeenCalledWith('round-2', 'game-1');
        expect(roundService.claimNextRoundStarted).toHaveBeenCalledWith('round-2', 'game-1');
        expect(service.createRound).toHaveBeenCalledWith('game-1', 3);
        done();
      }
    });
  });

  it('does not start the next round with fewer than four players', (done) => {
    arrangeNextRoundCheck(round(2), [round(1), round(2)], game(3), players(3));

    service.finalizeRoundAndStartNextIfReady('round-2', 'game-1').subscribe({
      next: (result) => {
        expect(result).toEqual(jasmine.objectContaining({ finalized: true, nextRoundStarted: false }));
        expect(roundService.claimNextRoundStarted).not.toHaveBeenCalled();
        expect(service.createRound).not.toHaveBeenCalled();
        done();
      }
    });
  });

  it('ensures the next round starts from the latest finalized dashboard round', (done) => {
    roundService.roundsForGame.and.returnValue(of([round(1), round(2)]));
    gameService.getGame.and.returnValue(of(game(3)));
    gamePlayerService.playersForGame.and.returnValue(of(players(4)));
    roundService.claimNextRoundStarted.and.returnValue(of(true));

    service.ensureNextRoundStartedForLatestRound('game-1').subscribe({
      next: (result) => {
        expect(result).toEqual(jasmine.objectContaining({ finalized: true, nextRoundStarted: true }));
        expect(roundService.claimNextRoundStarted).toHaveBeenCalledWith('round-2', 'game-1');
        expect(service.createRound).toHaveBeenCalledWith('game-1', 3);
        done();
      }
    });
  });

  it('does not ensure another round when the latest dashboard round is still active', (done) => {
    roundService.roundsForGame.and.returnValue(of([round(1), { ...round(2), pointsConfirmed: false }]));

    service.ensureNextRoundStartedForLatestRound('game-1').subscribe({
      next: (result) => {
        expect(result).toEqual(jasmine.objectContaining({ finalized: false, nextRoundStarted: false }));
        expect(roundService.claimNextRoundStarted).not.toHaveBeenCalled();
        expect(service.createRound).not.toHaveBeenCalled();
        done();
      }
    });
  });

  it('releases the next round claim when creating the round fails', (done) => {
    const error = new Error('Unable to assign fixed table');
    arrangeNextRoundCheck(round(2), [round(1), round(2)], game(3), players(4));
    roundService.claimNextRoundStarted.and.returnValue(of(true));
    (service.createRound as jasmine.Spy).and.returnValue(throwError(() => error));

    service.finalizeRoundAndStartNextIfReady('round-2', 'game-1').subscribe({
      error: (thrownError) => {
        expect(thrownError).toBe(error);
        expect(roundService.releaseNextRoundStarted).toHaveBeenCalledWith('round-2', 'game-1');
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

  function arrangeNextRoundCheck(currentRound: Round, rounds: Round[], currentGame: Game, gamePlayers: GamePlayer[]): void {
    roundService.getRound.and.returnValue(of(currentRound));
    roundService.roundsForGame.and.returnValue(of(rounds));
    gameService.getGame.and.returnValue(of(currentGame));
    gamePlayerService.playersForGame.and.returnValue(of(gamePlayers));
  }

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
