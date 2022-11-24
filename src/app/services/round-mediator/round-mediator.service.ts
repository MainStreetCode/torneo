import { Injectable } from '@angular/core';
import { combineLatest, EMPTY, forkJoin, merge, Observable, of, Subscription } from 'rxjs';
import { last, map, mergeMap, switchMap, take } from 'rxjs/operators';
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

  public updatePlayerPoints(roundId: string, gameId: string): Observable<(void | GamePlayer)[]> {
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

  public updateByePlayerPoints(roundId: string, gameId: string): Observable<never> {
    if (!roundId) {
      return EMPTY;
    }

    return combineLatest([
      this.gamePlayerService.playersForGame(gameId).pipe(take(1)),
      this.roundService.getRound(roundId, gameId).pipe(take(1))
    ]).pipe(
      switchMap(([gamePlayers, round]) => {
        this.log('updateByePlayerPoints');

        const byePlayers = round.byes;
        const byePlayerIds = round.byes.map((bye) => bye.uid);

        if (byePlayerIds && byePlayerIds.length > 0) {
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
            points: averagePoints
          };

          byePlayers.forEach((byePlayer) => {
            const gamePlayer = gamePlayers.find((player) => player.uid === byePlayer.uid);
            if (!gamePlayer.pointsForRound) {
              gamePlayer.pointsForRound = [];
            }
            const roundPoints = gamePlayer.pointsForRound.find((pfr) => pfr.roundId === roundId);
            // if roundPoints already exists, then update the points
            if (roundPoints) {
              if (roundPoints.points === averagePoints) {
                return;
              }
              roundPoints.points = averagePoints;
            } else {
              gamePlayer.pointsForRound.push(newRoundPoints);
            }
            this.gamePlayerService.updatePlayer(gamePlayer, gameId).subscribe();
          });
        }

        return EMPTY;
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

  public createRound(gameId: string): Observable<Table[]> {
    return this.selectByes(gameId).pipe(
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

            this.log('createRound');

            let filteredPlayers = [...players];

            if (this.byes.length > 0) {
              filteredPlayers = players.filter((player) => {
                const isByePlayer = this.byes.find((byePlayer) => byePlayer.uid === player.uid);
                return !isByePlayer;
              });
            }

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
    );
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

    return teams;
  }

  private log(message: string): void {
    this.messageService.add(`RoundMediatorService: ${message}`);
  }
}
