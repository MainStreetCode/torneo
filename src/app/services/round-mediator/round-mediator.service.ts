import { Injectable } from '@angular/core';
import { combineLatest, forkJoin, Observable, of, Subscription, throwError } from 'rxjs';
import { catchError, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { GamePlayer } from 'src/app/components/player/game-player';
import { RoundPoints } from 'src/app/components/player/game-players/round-points';
import { Table } from 'src/app/components/table/table';
import { TeamPlayer } from 'src/app/components/team-player/team-player';
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

export class FixedTableAssignmentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FixedTableAssignmentError';
  }
}

export interface RoundFinalizationResult {
  finalized: boolean;
  nextRoundStarted: boolean;
  roundAlreadyFinalized?: boolean;
}

interface FinalizedRoundResult {
  finalized: boolean;
  round?: Round;
  roundAlreadyFinalized?: boolean;
}

export function assignPlayersToTables(players: GamePlayer[]): TableData[] {
  const numberOfTables = Math.floor(players.length / 4);
  const tablePlayers: GamePlayer[][] = Array.from({ length: numberOfTables }, () => []);
  const randomPlayers: GamePlayer[] = [];

  players.forEach((player) => {
    const fixedTableNumber = getFixedTableNumber(player);

    if (fixedTableNumber === undefined) {
      randomPlayers.push(player);
      return;
    }

    if (!Number.isInteger(fixedTableNumber) || fixedTableNumber < 1 || fixedTableNumber > numberOfTables) {
      throw new FixedTableAssignmentError(
        `${player.displayName || 'A player'} is fixed to table ${fixedTableNumber}, but this round only has tables 1-${numberOfTables}.`
      );
    }

    const targetTable = tablePlayers[fixedTableNumber - 1];

    if (targetTable.length >= 4) {
      throw new FixedTableAssignmentError(`Table ${fixedTableNumber} has more than 4 fixed players.`);
    }

    targetTable.push(player);
  });

  tablePlayers.forEach((playersForTable, index) => {
    while (playersForTable.length < 4) {
      const randomPlayer = takeRandomPlayer(randomPlayers);

      if (!randomPlayer) {
        throw new FixedTableAssignmentError(`Not enough available players to fill table ${index + 1}.`);
      }

      playersForTable.push(randomPlayer);
    }
  });

  return tablePlayers.map((playersForTable, index) => ({
    teams: assignPlayersToTeams(playersForTable, 2),
    number: index + 1
  }));
}

function assignPlayersToTeams(players: GamePlayer[], numberOfTeams: number): Team[] {
  const teams = [];
  const unassignedPlayers = [ ...players ];

  for (let i = 0; i < numberOfTeams; i++) {
    const teamPlayers = [];

    for (let j = 0; j < 2; j++) {
      const player = takeRandomPlayer(unassignedPlayers);
      const teamPlayer = {
        player,
        isPointsConfirmed: false
      };
      teamPlayers.push(teamPlayer);
    }

    const newTeam = {
      teamPlayers,
      points: 0
    };

    teams.push(newTeam);
  }

  return teams;
}

function getFixedTableNumber(player: GamePlayer): number | undefined {
  const fixedTableNumber = player.fixedTableNumber as number | string | null | undefined;

  if (fixedTableNumber === undefined || fixedTableNumber === null || fixedTableNumber === '') {
    return undefined;
  }

  return Number(fixedTableNumber);
}

function takeRandomPlayer(players: GamePlayer[]): GamePlayer | undefined {
  if (players.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * players.length);
  const player = players[randomIndex];
  players.splice(randomIndex, 1);
  return player;
}

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
    private subscriptions: Subscription[] = [];

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

  public getTeamPlayersForRound(roundId: string, gameId: string): Observable<TeamPlayer[]> {
    const teamPlayers$ = this.tableService.getTablesForRound(roundId, gameId).pipe(
      mergeMap((tables) => {
        const teamsForTables$ = tables.map((table) => this.teamService.getTeamsForTable(table.id, roundId, gameId));

        const teams$ = combineLatest(teamsForTables$).pipe(
          switchMap((arrayOfTeams) => {
            return of(arrayOfTeams.flat());
          })
        );

        return teams$.pipe(
          switchMap((teams) => {
            const teamPlayers = teams.map((team) => {
              return team.teamPlayers.map((teamPlayer) => {
                teamPlayer.points = team.points;
                return teamPlayer;
              }).flat();
            }).flat();

            return of(teamPlayers);
          }
        ));
      })
    );
    return teamPlayers$;
  }

  public updatePlayerPoints(roundId: string, gameId: string, roundNumber: number): Observable<(void | GamePlayer)[]> {
    const teamPlayers$ = this.getTeamPlayersForRound(roundId, gameId).pipe(take(1));

    return combineLatest([
        this.gamePlayerService.playersForGame(gameId).pipe(take(1)),
        teamPlayers$
      ]).pipe(
      switchMap(([gamePlayers, teamPlayers]) => {
        return combineLatest(
          teamPlayers.map((teamPlayer) => {
            const teamGamePlayer = teamPlayer.player;

            if (!teamGamePlayer.pointsForRound) {
              teamGamePlayer.pointsForRound = [];
            }

            const gamePlayer = gamePlayers.find((gp) => gp.uid === teamGamePlayer.uid);
            let gamePlayerPointsForRound: RoundPoints | undefined;

            if (gamePlayer.pointsForRound) {
              gamePlayerPointsForRound = gamePlayer.pointsForRound.find((roundPoints) => roundPoints.roundId === roundId);  
            }

            // check game player points to see if they already have points to prevent extra call to update
            if (gamePlayer && gamePlayerPointsForRound) {
              if (gamePlayerPointsForRound.points === teamPlayer.points) {
                return of(teamGamePlayer);
              }
              gamePlayerPointsForRound.points = teamPlayer.points;
            } else {
              const newRoundPoints: RoundPoints = {                
                roundId,
                roundNumber,                
                points: teamPlayer.points
              };
              teamGamePlayer.pointsForRound.push(newRoundPoints);
            }

            return this.gamePlayerService.updatePlayer(teamGamePlayer, gameId);
          })
        );
      })
    );
  }

  public updateByePlayerPoints(roundId: string, gameId: string): Observable<(void | GamePlayer | null)[] | null> {
    if (!roundId) {
      return of(null);
    }

    return combineLatest([
      this.gamePlayerService.playersForGame(gameId).pipe(take(1)),
      this.roundService.getRound(roundId, gameId).pipe(take(1))
    ]).pipe(
      switchMap(([gamePlayers, round]) => {
        this.log('updateByePlayerPoints');

        const byePlayers = round.byes;
        const byePlayerIds = round.byes.map((bye) => bye.uid);
        const roundNumber = round.number

        if (!byePlayerIds || byePlayerIds.length === 0) {
          return of(null);
        }

        const lastRoundPlayers = gamePlayers.filter((gamePlayer) => {
          const isByePlayer = byePlayerIds.find((byePlayerId) => byePlayerId === gamePlayer.uid);
          return !isByePlayer;
        });

        // get sum of all points for all players in last round
        let totalPoints = 0;
        lastRoundPlayers.forEach((lastRoundPlayer) => {
          if (lastRoundPlayer.pointsForRound) {
            const lastRoundPoints = lastRoundPlayer.pointsForRound.find((pointsForRound) => pointsForRound.roundId === roundId);
            if (lastRoundPoints) {
              totalPoints += lastRoundPoints.points;
            }
          }
        });

        // get average and update the bye players with the average
        const averagePoints = Math.round(totalPoints / lastRoundPlayers.length);
        const newRoundPoints: RoundPoints = {
          roundId,
          roundNumber,
          points: averagePoints
        };

        return combineLatest(
          byePlayers.map((byePlayer) => {
            const gamePlayer = gamePlayers.find((player) => player.uid === byePlayer.uid);
            if (!gamePlayer) {
              return of(null);
            }

            if (!gamePlayer.pointsForRound) {
              gamePlayer.pointsForRound = [];
            }

            const roundPoints = gamePlayer.pointsForRound.find((pfr) => pfr.roundId === roundId);
            // if roundPoints already exists, then update the points
            if (roundPoints) {
              if (roundPoints.points === averagePoints) {
                return of(gamePlayer);
              }
              roundPoints.points = averagePoints;
            } else {
              gamePlayer.pointsForRound.push(newRoundPoints);
            }

            return this.gamePlayerService.updatePlayer(gamePlayer, gameId);
          })
        );
      })
    );
  }

  public finalizeRoundIfReady(roundId: string, gameId: string): Observable<boolean> {
    return this.finalizeRoundForStartup(roundId, gameId).pipe(
      map((result) => result.finalized && !result.roundAlreadyFinalized)
    );
  }

  public finalizeRoundAndStartNextIfReady(roundId: string, gameId: string): Observable<RoundFinalizationResult> {
    return this.finalizeRoundForStartup(roundId, gameId).pipe(
      switchMap((finalizeResult) => {
        if (!finalizeResult.finalized || !finalizeResult.round) {
          return of({ finalized: false, nextRoundStarted: false });
        }

        return this.startNextRoundIfReady(finalizeResult.round, gameId, !!finalizeResult.roundAlreadyFinalized);
      })
    );
  }

  public ensureNextRoundStartedForLatestRound(gameId: string): Observable<RoundFinalizationResult> {
    return combineLatest([
      this.roundService.roundsForGame(gameId).pipe(take(1))
    ]).pipe(
      switchMap(([rounds]) => {
        if (!rounds || rounds.length === 0) {
          return of({ finalized: false, nextRoundStarted: false });
        }

        const latestRound = [...rounds].sort((a, b) => b.number - a.number)[0];

        if (!latestRound.pointsConfirmed) {
          return of({ finalized: false, nextRoundStarted: false });
        }

        return this.startNextRoundIfReady(latestRound, gameId, true);
      })
    );
  }

  private finalizeRoundForStartup(roundId: string, gameId: string): Observable<FinalizedRoundResult> {
    if (!roundId || !gameId) {
      return of({ finalized: false });
    }

    return combineLatest([
      this.roundService.getRound(roundId, gameId).pipe(take(1)),
      this.allTablesConfirmed(roundId, gameId).pipe(take(1))
    ]).pipe(
      switchMap(([round, allTablesConfirmed]) => {
        if (!round) {
          return of({ finalized: false });
        }

        if (round.pointsConfirmed) {
          return of({ finalized: true, round, roundAlreadyFinalized: true });
        }

        if (!allTablesConfirmed) {
          return of({ finalized: false });
        }

        const finalizedRound = {
          ...round,
          pointsConfirmed: true
        };

        return this.updatePlayerPoints(roundId, gameId, round.number).pipe(
          switchMap(() => this.updateByePlayerPoints(roundId, gameId)),
          switchMap(() => this.roundService.updateRound(finalizedRound, gameId)),
          map(() => ({ finalized: true, round: finalizedRound, roundAlreadyFinalized: false }))
        );
      })
    );
  }

  private startNextRoundIfReady(
    round: Round,
    gameId: string,
    roundAlreadyFinalized: boolean
  ): Observable<RoundFinalizationResult> {
    return combineLatest([
      this.gameService.getGame(gameId).pipe(take(1)),
      this.roundService.roundsForGame(gameId).pipe(take(1)),
      this.gamePlayerService.playersForGame(gameId).pipe(take(1))
    ]).pipe(
      switchMap(([game, rounds, players]) => {
        const nextRound = rounds?.find((gameRound) => gameRound.number === round.number + 1);

        if (nextRound) {
          return of({ finalized: true, nextRoundStarted: true, roundAlreadyFinalized });
        }

        if (
          !round.pointsConfirmed ||
          !game ||
          !rounds ||
          !players ||
          players.length < 4 ||
          round.number >= game.numberOfRounds
        ) {
          return of({ finalized: true, nextRoundStarted: false, roundAlreadyFinalized });
        }

        const latestRoundNumber = Math.max(...rounds.map((gameRound) => gameRound.number));

        if (round.number !== latestRoundNumber) {
          return of({ finalized: true, nextRoundStarted: false, roundAlreadyFinalized });
        }

        const claimNextRound = () => this.roundService.claimNextRoundStarted(round.id, gameId).pipe(
          switchMap((claimed) => {
            if (!claimed) {
              return of({ finalized: true, nextRoundStarted: false, roundAlreadyFinalized });
            }

            return this.createRound(gameId, round.number + 1).pipe(
              map(() => ({ finalized: true, nextRoundStarted: true, roundAlreadyFinalized })),
              catchError((error) => this.roundService.releaseNextRoundStarted(round.id, gameId).pipe(
                switchMap(() => {
                  this.log(error.message || 'Unable to start the next round');
                  return throwError(() => error);
                })
              ))
            );
          })
        );

        if (round.nextRoundStarted) {
          return this.roundService.releaseNextRoundStarted(round.id, gameId).pipe(
            switchMap(() => claimNextRound())
          );
        }

        return claimNextRound();
      })
    );
  }

  private selectByes(gameId: string): Observable<Game | void> {
    this.byes = [];

    // get byes from bye pool
    return combineLatest([
      this.gameService.getGame(gameId),
      this.gamePlayerService.playersForGame(gameId)
    ]).pipe(take(1),
      switchMap(([game, players]) => {

        this.log('selectByes');

        const numberOfByes = players.length % 4;

        // randomly select players from the bye pool
        for (let i = 0; i < numberOfByes; i++) {
          // if there are no byes in the pool, add all players to the pool
          if (!game.byePool || game.byePool?.length === 0) {
            game.byePool = [ ...players ];
          }

          const randomNumber = Math.floor(Math.random() * game.byePool.length);
          const byePlayer = game.byePool.splice(randomNumber, 1);
          this.byes.push(byePlayer[0]);
        }

        return this.gameService.updateGame(game);
      }
    ));
  }

  public deleteRound(roundId: string, gameId: string): void {
    this.subscriptions.push(
      this.gamePlayerService.playersForGame(gameId).pipe(take(1)).subscribe({
        next: (gamePlayers) => {

          this.log('deleteRound for roundId:' + roundId);

          // delete the points for the round for each player
          gamePlayers.forEach((gamePlayer) => {
            if (gamePlayer.pointsForRound) {
              const filteredRoundPoints = gamePlayer.pointsForRound.filter((round) => round.roundId !== roundId);
              gamePlayer.pointsForRound = filteredRoundPoints;
              this.gamePlayerService.updatePlayer(gamePlayer, gameId).subscribe();
            }
          });

          this.roundService.deleteRound(roundId, gameId);
        }
      })
    );
  }

  public createRound(gameId: string, expectedRoundNumber?: number): Observable<Table[]> {
    return this.selectByes(gameId).pipe(
      switchMap((game) => {
        return combineLatest([
          this.roundService.roundsForGame(gameId),
          this.gamePlayerService.playersForGame(gameId)
        ]).pipe(
          take(1),
          switchMap(([rounds, players]) => {
            if (!game || !rounds || !players) {
              return throwError(() => new Error('Unable to load game data for the next round.'));
            }

            this.log('createRound');

            let filteredPlayers = [...players];

            if (this.byes.length > 0) {
              filteredPlayers = players.filter((player) => {
                const isByePlayer = this.byes.find((byePlayer) => byePlayer.uid === player.uid);
                return !isByePlayer;
              });
            }

            let tablesData: TableData[];

            try {
              tablesData = assignPlayersToTables(filteredPlayers);
            } catch (error) {
              this.log(error.message);
              return throwError(() => error);
            }

            const newRound = {
              number: expectedRoundNumber ?? rounds.length + 1,
              byes: this.byes,
              pointsConfirmed: false
            } as Round;

            // create round
            return this.roundService.addRound(newRound, gameId).pipe(
              switchMap((round) => {
                if (!round) {
                  return throwError(() => new Error('Unable to create the next round.'));
                }

                return forkJoin(
                  tablesData.map((tableData) => {

                    // get all the playerIds for this table
                    let tablePlayerIds: string[] = [];
                    tableData.teams.map((team) => {
                      tablePlayerIds = tablePlayerIds.concat(team.teamPlayers.map((teamPlayer) => teamPlayer.player.uid));
                    });

                    // create tables
                    const newTable = {
                      number: tableData.number,
                      playerIds: tablePlayerIds,
                      pointsConfirmed: false
                    } as Table;

                    return this.tableService.addTable(newTable, round.id, gameId).pipe(
                      switchMap((addedTable) => {
                        if (!addedTable) {
                          return throwError(() => new Error(`Unable to create table ${tableData.number} for the next round.`));
                        }

                        // create teams
                        return forkJoin(
                          tableData.teams.map((team) => this.teamService.addTeam(team, addedTable.id, round.id, gameId))
                        ).pipe(
                          map(() => addedTable)
                        );
                      }
                    ));
                  })
                );
              })
            );
          })
        );
      })
    );
  }

  private log(message: string): void {
    this.messageService.add(`RoundMediatorService: ${message}`);
  }
}
