import { GamePlayer } from 'src/app/components/player/game-player';
import { assignPlayersToTables, FixedTableAssignmentError } from './round-mediator.service';

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
