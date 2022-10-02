import { Injectable } from '@angular/core';
import { table } from 'console';
import { combineLatest, EMPTY, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { GamePlayer } from 'src/app/components/player/game-player';
import { Table } from 'src/app/components/table/table';
import { Team } from 'src/app/components/team/team';
import { GameService } from '../game/game.service';
import { GamePlayerService } from '../gamePlayer/game-player.service';
import { MessageService } from '../message/message.service';
import { Round } from '../round/round';
import { RoundService } from '../round/round.service';
import { TableService } from '../table/table.service';
import { TeamService } from '../team/team.service';

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

  createRound(gameId: string): void {
    this.byes = [];

    combineLatest([
      this.gameService.getGame(gameId),
      this.roundService.roundsForGame(gameId),
      this.gamePlayerService.playersForGame(gameId)
    ]).pipe(
      take(1),
      switchMap(([game, rounds, players]) => {
        if (!game || !rounds || !players) {
          return EMPTY;
        }

        const tablesData = this.assignPlayersToTables(players);

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
                // create tables
                const newTable = {
                  number: tableData.number
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
        )
      }
    )).subscribe({
      next: (tables) => {
        this.log(` createRound w/tables=${tables.length}`);
      }
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

    this.byes = players;
    return teams;
  }

  private log(message: string): void {
    this.messageService.add(`RoundMediatorService: ${message}`);
  }
}

export interface TableData {
  teams: Team[];
  number?: number;
  name?: string;
}
