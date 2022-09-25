import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/components/player/player';
import { MessageService } from '../message/message.service';
import { Tournament } from './tournament';
import { getFirestore } from "firebase/firestore";
import { environment } from '../../../environments/environment';
import { initializeApp } from '@angular/fire/app';
import * as firebase from 'firebase/compat';
import { FieldValue } from "firebase/firestore";
import { arrayUnion } from '@angular/fire/firestore';
import { Collection } from '../collection';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  public tournaments$: Observable<Tournament[]>;

  constructor(private messageService: MessageService, private store: AngularFirestore) {
    this.tournaments$ = this.store.collection(Collection.Tournaments).valueChanges({ idField: 'id' }) as Observable<Tournament[]>;
  }

  getTournament(id: string): Observable<Tournament | undefined> {
    return this.tournaments$.pipe(
      map((tournaments) => {
        return tournaments.find((tournament) => tournament.id === id);
      })
    );
  }

  addTournament(tournament: Tournament): void {
    tournament.players = [];
    this.store.collection(Collection.Tournaments).add(tournament).then(
      (newTournament) => {
        this.log(`added tournament w/ id=${newTournament.id}`);
      },
      err => this.handleError<Tournament>('addTournament')
    );
  }

  updateTournament(tournament: Tournament): void {
    this.store.collection(Collection.Tournaments).doc<Tournament>(tournament.id).update(tournament).then(
      () => {
        this.log(`updated tournament w/ id=${tournament.id}`);
      },
      err => this.handleError<Tournament>('updateTournament')
    );
  }

  deleteTournament(id: string): void {
    this.store.collection(Collection.Tournaments).doc<Tournament>(id).delete()
      .then(
        () => {
          this.log(`deleted tournament w/ id=${id}`);
        },
        err => this.handleError<Tournament>('deleteTournament')
      );
  }

  private log(message: string): void {
    this.messageService.add(`TournamentService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
