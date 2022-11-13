import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, empty, EMPTY, from, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { GamePlayer } from 'src/app/components/player/game-player';
import { Team } from 'src/app/components/team/team';
import { Collection } from '../collection';
import { MessageService } from '../message/message.service';
import { Round } from '../round/round';
import { RoundService } from '../round/round.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private messageService: MessageService, private store: AngularFirestore) { }

  addTeam(team: Team, tableId: string, roundId: string, gameId: string): void {
    this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.Rounds)
      .doc(roundId)
      .collection(Collection.Tables)
      .doc(tableId)
      .collection(Collection.Teams)
      .add(team).then(
      (docRef) => {
        this.log(`addTeam w/ id=${gameId} ${docRef.id}`);
        team.id = docRef.id;
        return team;
      },
      err =>  this.log(`ERROR addTeam w/ id=${team.id}`)
    );
  }

  getTeam(teamId: string, tableId: string, roundId: string, gameId: string): Observable<Team | undefined> {
    return this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.Rounds)
      .doc(roundId)
      .collection(Collection.Tables)
      .doc(tableId)
      .collection(Collection.Teams)
      .doc(teamId)
      .valueChanges({ idField: 'id' }) as Observable<Team>;
  }

  getTeamsForTable(tableId: string, roundId: string, gameId: string): Observable<Team[] | undefined> {
    return this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.Rounds)
      .doc(roundId)
      .collection(Collection.Tables)
      .doc(tableId)
      .collection(Collection.Teams)
      .valueChanges({ idField: 'id' }) as Observable<Team[]>;
  }

  updateTeam(team: Team, tableId: string, roundId: string, gameId: string): Observable<Team | void> {
    this.log('updateTeam');
    return from(this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.Rounds)
      .doc(roundId)
      .collection(Collection.Tables)
      .doc(tableId)
      .collection(Collection.Teams)
      .doc(team.id)
      .update(team).then(
        (docRef) => {
          this.log(`updateTeam w/ id=${gameId} ${team.id}`);
          return docRef;
        },
        err =>  this.log(`ERROR updateTeam w/ id=${team.id}`)
      )
    );
  }

  deleteTeam(teamId: string, tableId: string, roundId: string, gameId: string): void {
    this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.Rounds)
      .doc(roundId)
      .collection(Collection.Tables)
      .doc(tableId)
      .collection(Collection.Teams)
      .doc(teamId)
      .delete().then(
      () => {
        this.log(`deleteTeam w/ id=${gameId} ${teamId}`);
      },
      err =>  this.log(`ERROR deleteTeam w/ id=${teamId}`)
    );
  }

  private log(message: string): void {
    console.log(message);
    this.messageService.add(`TeamService: ${message}`);
  }
}
