import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, from, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Collection } from '../collection';
import { MessageService } from '../message/message.service';
import { Round } from './round';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  constructor(private messageService: MessageService, private store: AngularFirestore) { }

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

  addRound(round: Round, gameId: string): Observable<Round | void> {
    return from(this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.Rounds)
      .add(round).then(
        (docRef) => {
          this.log(`add round to game w/ id=${gameId} ${docRef.id}`);
          round.id = docRef.id;
          return round;
        },
        err =>  this.log(`Error addRound w/ id=${gameId}`)
      )
    );
  }

  updateRound(round: Round, gameId: string): void {
    this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.Rounds)
      .doc(round.id).update(round).then(
        () => {
          this.log(`update round w/ game id=${gameId} roundId = ${round.id}`);
        },
        err =>  this.log(`Error updateRound w/ id=${gameId}`)
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

  private log(message: string): void {
    this.messageService.add(`RoundService: ${message}`);
  }
}
