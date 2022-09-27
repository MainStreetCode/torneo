import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { table } from 'console';
import { combineLatest, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { GamePlayer } from 'src/app/components/player/game-player';
import { Team } from 'src/app/components/team/team';
import { Collection } from '../collection';
import { GameService } from '../game/game.service';
import { GamePlayerService } from '../gamePlayer/game-player.service';
import { MessageService } from '../message/message.service';
import { Round } from './round';
import { Table } from './table';

@Injectable({
  providedIn: 'root'
})
export class RoundService {
  private byes = [];

  constructor(private messageService: MessageService, private store: AngularFirestore,
              private gameService: GameService, private gamePlayerService: GamePlayerService) { }

  roundsForGame(gameId: string): Observable<Round[]> {
    return this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.Rounds)
      .valueChanges({ idField: 'id' }) as Observable<Round[]>;
  }

  getRound(roundId: string, gameId: string): Observable<Round | undefined> {
    return this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.Rounds)
      .doc(roundId)
      .valueChanges({ idField: 'id' }) as Observable<Round>;
  }

  addRound(round: Round, gameId: string): void {
    this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.Rounds)
      .add(round).then(
        () => {
          this.log(`add round to game w/ id=${gameId} ${round.id}`);
        },
        err =>  this.log(`Error addRound w/ id=${gameId}`)
      );
  }

  deleteRound(roundId: string, gameId: string): void {
    this.store.collection(Collection.Games)
    .doc(gameId)
    .collection(Collection.Rounds)
    .doc(roundId).delete().then(
        () => {
          this.log(`deleted round w/ id=${roundId}`);
        },
        err =>  this.log(`ERROR deleteRound w/ id=${roundId}`)
      );
  }

  // Maybe create RoundCreationService?

  createRound(gameId: string): void {
    combineLatest([
      this.gameService.getGame(gameId),
      this.roundsForGame(gameId),
      this.gamePlayerService.playersForGame(gameId)
    ]).pipe(take(1)).subscribe({
      next: ([game, rounds, players]) => {
        if (!game || !rounds || !players) {
          return;
        }

        const numberOfByes = players.length % 4;
        const tables = this.assignPlayersToTables(players);

        const newRound = {
          tables,
          number: rounds.length + 1,
          byes: this.byes
        } as Round;

        this.addRound(newRound, gameId);

        console.log('here');
      }
    });
  }

  assignPlayersToTables(players: GamePlayer[]): Table[] {
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

      const newTable = {
        teams: tableTeams
      };

      tables.push(newTable);
    }

    return tables;
  }

  assignPlayersToTeams(players: GamePlayer[], numberOfTeams: number): Team[] {
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
        teamPlayers
      };

      teams.push(newTeam);
    }

    this.byes = players;
    return teams;
  }

  private log(message: string): void {
    this.messageService.add(`RoundService: ${message}`);
  }
}
