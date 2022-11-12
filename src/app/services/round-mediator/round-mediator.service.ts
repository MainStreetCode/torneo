import { Injectable } from '@angular/core';
import { combineLatest, EMPTY, Observable, of, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { GamePlayer } from 'src/app/components/player/game-player';
import { RoundPoints } from 'src/app/components/player/game-players/round-points';
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
import { TableData } from './table-data';

@Injectable({
  providedIn: 'root'
})
export class RoundMediatorService {
  private byes = [];

  constructor(
    private gameService: GameService,
    private roundService: RoundService,
    private gamePlayerService: GamePlayerService,
    private messageService: MessageService,
    private teamService: TeamService,
    private tableService: TableService) { }
    private subscriptions: Subscription[];

  allTablesConfirmed(roundId: string, gameId: string): Observable<boolean> {
    return this.tableService.getTablesForRound(roundId, gameId).pipe(
      map((tables) => {
        let confirmCounter = 0;
        tables.map((table) => {
          if (table.pointsConfirmed) {
            confirmCounter++;
          }
        });
        const allConfirmed = confirmCounter === tables.length;
        return allConfirmed;
      }
    ));
  }

  unconfirmedTables(roundId: string, gameId): Observable<Table[] | undefined> {
    return this.tableService.getTablesForRound(roundId, gameId).pipe(
      map((tables) => {
        const unconfirmedTables = [];

        tables.map((table) => {
          if (!table.pointsConfirmed) {
            unconfirmedTables.push(table);
          }
        });

        return unconfirmedTables;
      }
    ));
  }

  updateGamePlayerPoints(tableId: string, roundId: string, gameId: string): void {
    this.tableService.getTable(tableId, roundId, gameId).pipe(take(1),
      switchMap((table) => {
        if (table && table.pointsConfirmed) {
          return this.teamService.getTeamsForTable(table.id, roundId, gameId);
        }
        return EMPTY;
      })
    ).subscribe({
      next: (teams) => {
        teams.map((team) => {
          const teamPoints = team.points;
          team.teamPlayers.map((teamPlayer) => {
            const gamePlayer = teamPlayer.player;

            if (!gamePlayer.pointsForRound) {
              gamePlayer.pointsForRound = [];
            }

            const gamePlayerPointsForRound = gamePlayer.pointsForRound.find((roundPoints) => roundPoints.roundId === roundId);

            if (gamePlayerPointsForRound) {
              gamePlayerPointsForRound.points = teamPoints;
            } else {
              const newRoundPoints: RoundPoints = {
                roundId,
                points: teamPoints
              };
              gamePlayer.pointsForRound.push(newRoundPoints);
            }

            this.gamePlayerService.updatePlayer(gamePlayer, gameId);
          });
        });
      }
    });
  }

  private selectByes(gameId: string): Observable<Game | void> {
    this.byes = [];

    // get byes from bye pool
    return combineLatest([
      this.gameService.getGame(gameId),
      this.gamePlayerService.playersForGame(gameId)
    ]).pipe(take(1),
      switchMap(([game, players]) => {
        const numberOfByes = players.length % 4;

        // randomly select players from the bye pool
        for (let i = 0; i < numberOfByes; i++) {
          // if there are no byes in the pool, add all players to the pool
          if (game.byePool?.length ?? 0 === 0) {
            game.byePool = players;
          }

          const randomNumber = Math.floor(Math.random() * game.byePool.length);
          const byePlayer = game.byePool.splice(randomNumber, 1);
          this.byes.push(byePlayer[0]);
        }

        return this.gameService.updateGame(game);
      }
    ));
  }

  createRound(gameId: string): void {
    this.selectByes(gameId).pipe(
      switchMap((game) => {
        return combineLatest([
          this.roundService.roundsForGame(gameId),
          this.gamePlayerService.playersForGame(gameId)
        ]).pipe(
          take(1),
          switchMap(([rounds, players]) => {
            if (!game || !rounds || !players) {
              return EMPTY;
            }

            const filteredPlayers = players.filter((player) => this.byes.find((byePlayer) => byePlayer.uid !== player.uid));

            const tablesData = this.assignPlayersToTables(filteredPlayers);

            const newRound = {
              number: rounds.length + 1,
              byes: this.byes
            } as Round;

            // create round
            return this.roundService.addRound(newRound, gameId).pipe(
              switchMap((round) => {
                if (!round) { return EMPTY; }

                return combineLatest(
                  tablesData.map((tableData) => {

                    // get all the playerIds for this table
                    let tablePlayerIds: string[] = [];
                    tableData.teams.map((team) => {
                      tablePlayerIds = tablePlayerIds.concat(team.teamPlayers.map((teamPlayer) => teamPlayer.player.uid));
                    });

                    // create tables
                    const newTable = {
                      number: tableData.number,
                      playerIds: tablePlayerIds
                    } as Table;

                    return this.tableService.addTable(newTable, round.id, gameId).pipe(
                      switchMap((addedTable) => {
                        if (!addedTable) { return EMPTY; }

                        // create teams
                        tableData.teams.forEach((team) => {
                          this.teamService.addTeam(team, newTable.id, round.id, gameId);
                        });

                        return of(addedTable);
                      }
                    ));
                  })
                );
              })
            );
          })
        );
      })
    ).subscribe({
      next: (tables) => {
        this.log(`createRound w/tables=${tables.length}`);
      }

    // combineLatest([
    //   this.gameService.getGame(gameId),
    //   this.roundService.roundsForGame(gameId),
    //   this.gamePlayerService.playersForGame(gameId)
    // ]).pipe(
    //   take(1),
    //   switchMap(([game, rounds, players]) => {
    //     if (!game || !rounds || !players) {
    //       return EMPTY;
    //     }

    //     const filteredPlayers = players.filter((player) => this.byes.find((byePlayer) => byePlayer.uid !== player.uid));

    //     const tablesData = this.assignPlayersToTables(filteredPlayers);

    //     const newRound = {
    //       number: rounds.length + 1,
    //       byes: this.byes
    //     } as Round;

    //     // create round
    //     return this.roundService.addRound(newRound, gameId).pipe(
    //       switchMap((round) => {
    //         if (!round) { return EMPTY; }

    //         return combineLatest(
    //           tablesData.map((tableData) => {

    //             // get all the playerIds for this table
    //             let tablePlayerIds: string[] = [];
    //             tableData.teams.map((team) => {
    //               tablePlayerIds = tablePlayerIds.concat(team.teamPlayers.map((teamPlayer) => teamPlayer.player.uid));
    //             });

    //             // create tables
    //             const newTable = {
    //               number: tableData.number,
    //               playerIds: tablePlayerIds
    //             } as Table;

    //             return this.tableService.addTable(newTable, round.id, gameId).pipe(
    //               switchMap((addedTable) => {
    //                 if (!addedTable) { return EMPTY; }

    //                 // create teams
    //                 tableData.teams.forEach((team) => {
    //                   this.teamService.addTeam(team, newTable.id, round.id, gameId);
    //                 });

    //                 return of(addedTable);
    //               }
    //             ));
    //           })
    //         );
    //       })
    //     );
    //   }
    // )).subscribe({
    //   next: (tables) => {
    //     this.log(`createRound w/tables=${tables.length}`);
    //   }
    });
  }

  private assignPlayersToTables(players: GamePlayer[]): TableData[] {
    const numberOfTables = Math.floor(players.length / 4);
    const tables = [];
    const teams = this.assignPlayersToTeams(players, numberOfTables * 2);
    const unassignedTeams = teams;

    for (let i = 0; i < numberOfTables; i++) {
      const tableTeams = [];

      for (let j = 0; j < 2; j++) {
        const randomIndex = Math.floor(Math.random() * unassignedTeams.length);
        const randomTeam = teams[randomIndex];
        unassignedTeams.splice(randomIndex, 1);
        tableTeams.push(randomTeam);
      }

      const newTable: TableData = {
        teams: tableTeams,
        number: i + 1
      };

      tables.push(newTable);
    }

    return tables;
  }

  private assignPlayersToTeams(players: GamePlayer[], numberOfTeams: number): Team[] {
    const teams = [];

    for (let i = 0; i < numberOfTeams; i++) {
      const teamPlayers = [];

      for (let j = 0; j < 2; j++) {
        const randomIndex = Math.floor(Math.random() * players.length);
        const teamPlayer = {
          player: players[randomIndex]
        };
        players.splice(randomIndex, 1);
        teamPlayers.push(teamPlayer);
      }

      const newTeam = {
        teamPlayers,
        points: 0
      };

      teams.push(newTeam);
    }

    // this.byes = players;
    return teams;
  }

  private log(message: string): void {
    this.messageService.add(`RoundMediatorService: ${message}`);
  }
}
