import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { Table } from 'src/app/components/table/table';
import { Collection } from '../collection';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private messageService: MessageService, private store: AngularFirestore) { }

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
