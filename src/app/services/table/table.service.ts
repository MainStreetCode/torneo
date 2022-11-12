import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EMPTY, from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Table } from 'src/app/components/table/table';
import { Collection } from '../collection';
import { MessageService } from '../message/message.service';
import { TeamService } from '../team/team.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private messageService: MessageService,
    private store: AngularFirestore,
    private teamService: TeamService) { }

  addTable(table: Table, roundId: string, gameId: string): Observable<Table | void> {
    return from(this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.Rounds)
      .doc(roundId)
      .collection(Collection.Tables)
      .add(table).then(
      (docRef) => {
        this.log(`addTable w/ id=${gameId} ${docRef.id}`);
        table.id = docRef.id;
        return table;
      },
      err =>  this.log(`ERROR addTable w/ id=${table.id}`)
    ));
  }

  getTable(tableId: string, roundId: string, gameId: string): Observable<Table | undefined> {
    return this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.Rounds)
      .doc(roundId)
      .collection(Collection.Tables)
      .doc(tableId)
      .valueChanges({ idField: 'id' }) as Observable<Table>;
  }

  getTablesForRound(roundId: string, gameId: string): Observable<Table[] | undefined> {
    return this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.Rounds)
      .doc(roundId)
      .collection(Collection.Tables)
      .valueChanges({ idField: 'id' }) as Observable<Table[]>;
  }

  getTableForPlayer(playerId: string, roundId: string, gameId: string): Observable<Table | undefined> {
    const tables$ = this.getTablesForRound(roundId, gameId);

    return tables$.pipe(
      switchMap((tables) => {
        let returnTable: Table;

        tables.map((table) => {

          if (table.playerIds.find((tablePlayerId) => tablePlayerId === playerId)) {
            returnTable = table;
          }
        });

        return of(returnTable);
      }
    ));
  }

  updateTable(table: Table, roundId: string, gameId: string): void {
    this.store.collection(Collection.Games)
    .doc(gameId)
    .collection(Collection.Rounds)
    .doc(roundId)
    .collection(Collection.Tables)
    .doc(table.id)
    .update(table).then(
      () => {
        this.log(`updateTable w/ id=${gameId} ${table.id}`);
      },
      err =>  this.log(`ERROR updateTable w/ id=${table.id}`)
    );
  }

  deleteTable(tableId: string, roundId: string, gameId: string): void {
    this.store.collection(Collection.Games)
      .doc(gameId)
      .collection(Collection.Rounds)
      .doc(roundId)
      .collection(Collection.Tables)
      .doc(tableId)
      .delete().then(
      () => {
        this.log(`deleteTable w/ id=${gameId} ${tableId}`);
      },
      err =>  this.log(`ERROR deleteTable w/ id=${tableId}`)
    );
  }

  private log(message: string): void {
    this.messageService.add(`TableService: ${message}`);
  }
}
