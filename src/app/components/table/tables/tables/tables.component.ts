import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { TableService } from 'src/app/services/table/table.service';
import { Table } from '../../table';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tables: Table[];
  public filteredTables: Table[];
  public isDataFiltered = false;
  public isUserPlayer = true;
  private filterString: string | undefined;
  private gameId: string;
  private roundId: string;
  private currentUser?: User;

  constructor(
    private tableService: TableService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private gamePlayerService: GamePlayerService) { }
    private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.roundId = this.route.snapshot.paramMap.get('roundId');
    this.filteredTables = this.sortTables(this.tables);

    this.checkCurrentUserIsPlayer();
  }

  ngOnChanges(): void {
    if (!this.tables) {
      return;
    }

    this.filteredTables = this.isDataFiltered && this.filterString
      ? this.tables.filter((table) => table.id === this.filterString)
      : this.tables;
    this.filteredTables = this.sortTables(this.filteredTables);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public filterTables(): void {
    this.isDataFiltered = !this.isDataFiltered;

    if (this.currentUser && this.isDataFiltered) {
      this.subscriptions.push(
        this.tableService.getTableForPlayer(this.currentUser.uid, this.roundId, this.gameId).pipe(take(1)).subscribe({
          next: (playerTable) => {
            if (playerTable) {
              this.filterString = playerTable.id;
            } else {
              this.filterString = undefined;
            }

            this.filteredTables = this.filterString ? this.tables.filter((table) => table.id === this.filterString) : this.tables;
            this.filteredTables = this.sortTables(this.filteredTables);
          }
        })
      );
    } else {
      this.filteredTables = this.tables;
      this.filteredTables = this.sortTables(this.filteredTables);
    }
  }

  public trackByTableId(index: number, table: Table): string {
    return table.id;
  }

  private checkCurrentUserIsPlayer(): void {
    if (!this.currentUser) {
      this.isUserPlayer = false;
      return;
    }

    this.subscriptions.push(
      this.gamePlayerService.getPlayer(this.currentUser.uid, this.gameId).subscribe({
        next: (player) => {
          if (player) {
            this.isUserPlayer = true;
            this.filterTables();
          } else {
            this.isUserPlayer = false;
          }
        }
      })
    );
  }

  private sortTables(tables: Table[]): Table[] {
    return [...tables].sort((a, b) => a.number - b.number);
  }
}
