import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { MessageService } from '../message/message.service';
import { Game } from './game';
import { Collection } from '../collection';
import { GamePlayer } from 'src/app/components/player/game-player';
import { User } from 'src/app/components/player/user';

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

  addGame(game: Game, userId: string): void {
    game.adminIds = [];

    this.store.collection(Collection.Games).add(game).then(
      (newGame) => {
        this.log(`added game w/ id=${newGame.id}`);
        this.addAdmin(newGame.id, userId);
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

  addAdmin(gameId: string, userId: string): void {
    this.getGame(gameId).pipe(
      take(1)
    ).subscribe({
      next: (game) => {
        if (game) {
          game.adminIds.push(userId);
          this.log(`adding game admin w/ id=${userId}`);
          this.updateGame(game);
        }
      }
    });
  }

  getAdmins(gameId: string): Observable<string[]> {
    return this.getGame(gameId).pipe(
      take(1)
    ).pipe(
      map((game) => {
        return game?.adminIds ?? [];
      })
    );
  }

  isUserAdmin(playerId: string, gameId: string): Observable<boolean> {
    return this.getGame(gameId).pipe(
      take(1)
    ).pipe(
      map((game) => {
          return !!game.adminIds.find((adminId) => adminId === playerId);
      })
    );
  }

  deleteAdmin(gameId: string, user: User): void {
    this.store.collection(Collection.Games).doc(gameId).collection(Collection.Admins).doc(user.id).delete().then(
      () => {
        this.log(`deleted admin from game w/ id=${gameId} ${user.name}`);
      },
      err => this.handleError<Game>('deleteAdmin')
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
