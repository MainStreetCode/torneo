import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageService } from '../message/message.service';
import { Game } from './game';
import { Collection } from '../collection';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public games$: Observable<Game[]>;

  constructor(private messageService: MessageService, private store: AngularFirestore) {
    this.games$ = this.store.collection(Collection.Games).valueChanges({ idField: 'id' }) as Observable<Game[]>;
  }

  getGame(id: string): Observable<Game | undefined> {
    return this.games$.pipe(
      map((games) => {
        return games.find((game) => game.id === id);
      })
    );
  }

  addGame(game: Game): void {    
    this.store.collection(Collection.Games).add(game).then(
      (newGame) => {
        this.log(`added game w/ id=${newGame.id}`);
      },
      err => this.handleError<Game>('addGame')
    );
  }

  updateGame(game: Game): void {
    this.store.collection(Collection.Games).doc<Game>(game.id).update(game).then(
      () => {
        this.log(`updated game w/ id=${game.id}`);
      },
      err => this.handleError<Game>('updateGame')
    );
  }

  deleteGame(id: string): void {
    this.store.collection(Collection.Games).doc<Game>(id).delete()
      .then(
        () => {
          this.log(`deleted game w/ id=${id}`);
        },
        err => this.handleError<Game>('deleteGame')
      );
  }

  private log(message: string): void {
    this.messageService.add(`GameService: ${message}`);
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
