import { Injectable } from '@angular/core';
import { EMPTY, from, Observable, of } from 'rxjs';
import { GamePlayer } from 'src/app/components/player/game-player';
import { MessageService } from '../message/message.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Collection } from '../collection';
import { Game } from '../game/game';
import { map, switchMap } from 'rxjs/operators';
import { Table } from 'src/app/components/table/table';

@Injectable({
  providedIn: 'root'
})
export class GamePlayerService {

  constructor(private messageService: MessageService, private store: AngularFirestore) { }

  playersForGame(gameId: string): Observable<GamePlayer[]> {
    return this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.GamePlayers)
      .valueChanges({ idField: 'uid' }) as Observable<GamePlayer[]>;
  }

  getPlayer(playerId: string, gameId: string): Observable<GamePlayer | undefined> {
    return this.playersForGame(gameId).pipe(
      map((players) => players.find((player) => player.uid === playerId))
    );
  }

  addPlayer(player: GamePlayer, gameId: string): void {
    // if player already has an ID, then use set instead of add
    if (player.uid) {
      this.store.collection(Collection.Games).doc(gameId).collection(Collection.GamePlayers).doc(player.uid).set(player).then(
        () => {
          this.log(`addPlayerToGame w/ id=${gameId} ${player.displayName}`);
        },
        err => this.handleError<Game>('addPlayerToGame')
      );
    } else {
      this.store.collection(Collection.Games).doc(gameId).collection(Collection.GamePlayers).add(player).then(
        () => {
          this.log(`addPlayerToGame w/ id=${gameId} ${player.displayName}`);
        },
        err => this.handleError<Game>('addPlayerToGame')
      );
    }

  }

  updatePlayer(player: GamePlayer, gameId: string): void {
    this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.GamePlayers)
      .doc(player.uid).update(player).then(
      () => {
        this.log(`updated player w/ id=${player.uid}`);
      },
      err => this.handleError<GamePlayer>('updatePlayer')
    );
  }

  deletePlayer(playerId: string, game: Game): void {
    this.store.collection(Collection.Games)
    .doc(game.id)
    .collection(Collection.GamePlayers)
    .doc(playerId).delete().then(
        () => {
          this.log(`deleted player w/ id=${playerId}`);
        },
        err => this.handleError<GamePlayer>('deletePlayer')
      );
  }

  /* GET players whose name contains search term */
  searchPlayers(term: string): Observable<GamePlayer[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    // return this.http.get<Player[]>(`${this.playersUrl}/?name=${term}`).pipe(
    //   tap(x => x.length ?
    //     this.log(`found Players matching "${term}"`) :
    //     this.log(`no Players matching "${term}"`)),
    //   catchError(this.handleError<Player[]>('searchPlayers', []))
    // );
  }

  private log(message: string): void {
    this.messageService.add(`PlayerService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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
