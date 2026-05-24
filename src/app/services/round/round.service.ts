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
        }
      )
    );
  }

  updateRound(round: Round, gameId: string): Observable<Round | void> {
    return from(this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.Rounds)
      .doc(round.id).update(round).then(
      () => {
        this.log(`update round w/ game id=${gameId} roundId = ${round.id}`);
        return round;
      }
      ));
  }

  claimNextRoundStarted(roundId: string, gameId: string): Observable<boolean> {
    const roundRef = this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.Rounds)
      .doc(roundId).ref;

    return from(this.store.firestore.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(roundRef);
      const round = snapshot.data() as Round | undefined;

      if (!round || round.nextRoundStarted) {
        return false;
      }

      transaction.update(roundRef, { nextRoundStarted: true });
      return true;
    }));
  }

  releaseNextRoundStarted(roundId: string, gameId: string): Observable<void> {
    return from(this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.Rounds)
      .doc(roundId)
      .update({ nextRoundStarted: false }));
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
