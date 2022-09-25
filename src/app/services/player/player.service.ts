import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Player } from 'src/app/components/player/player';
import { MessageService } from '../message/message.service';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Collection } from '../collection';
import { Tournament } from '../tournament/tournament';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  // public players$: Observable<Player[]>;

  constructor(private messageService: MessageService, private store: AngularFirestore) {
    // this.players$ = this.store.collection(Collection.Players).valueChanges({ idField: 'id' }) as Observable<Player[]>;
  }

  playersForTournament(tournamentId: string): Observable<Player[]> {
    return this.store.collection(Collection.Tournaments)
      .doc(tournamentId)
      .collection(Collection.Players)
      .valueChanges({ idField: 'id' }) as Observable<Player[]>;
  }

  getPlayer(playerId: string, tournamentId: string): Observable<Player | undefined> {
    return this.store.collection(Collection.Tournaments)
      .doc(tournamentId)
      .collection(Collection.Players)
      .doc(playerId)
      .valueChanges({ idField: 'id' }) as Observable<Player>;
  }

  addPlayer(player: Player, tournamentId: string): void {
    this.store.collection(Collection.Tournaments).doc(tournamentId).collection('players').add(player).then(
      () => {
        this.log(`addPlayerToTournament w/ id=${tournamentId} ${player.name}`);
      },
      err => this.handleError<Tournament>('addPlayerToTournament')
    );
  }

  updatePlayer(player: Player, tournamentId: string): void {
    this.store.collection(Collection.Tournaments)
      .doc(tournamentId)
      .collection(Collection.Players)
      .doc(player.id).update(player).then(
      () => {
        this.log(`updated player w/ id=${player.id}`);
      },
      err => this.handleError<Player>('updatePlayer')
    );
  }

  deletePlayer(playerId: string, tournament: Tournament): void {
    // this.store.collection(this.storeName).doc<Player>(id).delete()
    this.store.collection(Collection.Tournaments)
    .doc(tournament.id)
    .collection(Collection.Players)
    .doc(playerId).delete().then(
        () => {
          this.log(`deleted player w/ id=${playerId}`);
        },
        err => this.handleError<Player>('deletePlayer')
      );
  }

  /* GET players whose name contains search term */
  searchPlayers(term: string): Observable<Player[]> {
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
