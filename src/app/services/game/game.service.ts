import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EMPTY, from, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { MessageService } from '../message/message.service';
import { Game } from './game';
import { Collection } from '../collection';
import { getAuth } from 'firebase/auth';
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

  addGame(game: Game, userId: string): Observable<Game | void> {
    game.adminIds = [];
    game.byePool = [];
    game.createdDate = new Date();

    return from(this.store.collection<Game>(Collection.Games)
      .add(game).then(
        (newGame) => {
          game.id = newGame.id;
          this.log(`added game w/ id=${newGame.id}`);
          this.addAdmin(newGame.id, userId);
          return game;
        },
        err => this.log(`addGame ${err}`)
      )
    );
  }

  updateGame(game: Game): Observable<Game | void> {
    return from(this.store.collection(Collection.Games).doc<Game>(game.id).update(game).then(
      () => {
        this.log(`updated game w/ id=${game.id}`);
        return game;
      },
      err => this.log(`updateGame ${err}`)
    ));
  }

  deleteGame(id: string): void {
    this.store.collection(Collection.Games).doc<Game>(id).delete()
      .then(
        () => {
          this.log(`deleted game w/ id=${id}`);
        },
        err => this.log(`deleteGame ${err}`)
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

  deleteAdmin(gameId: string, userId: string): void {
    this.getGame(gameId).pipe(
      take(1)
    ).subscribe({
      next: (game) => {
        if (game) {
          const filteredAdminIds = game.adminIds.filter((adminId) => adminId !== userId);
          game.adminIds = filteredAdminIds;
          this.log(`deleteAdmin w/ id=${userId}`);
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

  isCurrentUserAdmin(gameId: string): Observable<boolean> {
    return this.getGame(gameId).pipe(
      take(1)
    ).pipe(
      map((game) => {
        if (!game) {
          return false;
        }
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
          return false;
        }
        return !!game.adminIds.find((adminId) => adminId === currentUser.uid);
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

  private log(message: string): void {
    this.messageService.add(`GameService: ${message}`);
  }
}
