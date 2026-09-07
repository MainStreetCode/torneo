import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'firebase/auth';
import { combineLatest, of, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GameService } from 'src/app/services/game/game.service';
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
  public isUserPlayer = false;
  public isUserAdmin = false;
  private filterString: string | undefined;
  private gameId: string;
  private roundId: string;
  private currentUser?: User;
  private hasAppliedDefaultFilter = false;

  constructor(
    private tableService: TableService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private gameService: GameService,
    private gamePlayerService: GamePlayerService) { }
    private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.roundId = this.route.snapshot.paramMap.get('roundId');
    this.filteredTables = this.sortTables(this.tables);

    this.checkCurrentUserTableAccess();
  }

  ngOnChanges(): void {
    if (!this.tables) {
      return;
    }

    this.applyTableFilter();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public filterTables(): void {
    if (this.isDataFiltered) {
      this.showAllTables();
      return;
    }

    this.showMyTable();
  }

  public trackByTableId(index: number, table: Table): string {
    return table.id;
  }

  get tableCountLabel(): string {
    const count = this.filteredTables?.length ?? 0;
    return `${count} table${count === 1 ? '' : 's'}`;
  }

  get filterStatusLabel(): string {
    return this.isDataFiltered ? 'Showing my table' : 'Showing all tables';
  }

  get filterActionLabel(): string {
    return this.isDataFiltered ? 'Show all tables' : 'Show my table';
  }

  get filterActionIcon(): string {
    return this.isDataFiltered ? 'table_rows' : 'person_search';
  }

  private checkCurrentUserTableAccess(): void {
    this.subscriptions.push(
      this.authService.isLoggedIn$.pipe(
        switchMap(() => {
          this.currentUser = this.authService.getCurrentUser();

          if (!this.currentUser) {
            return of({ isAdmin: false, player: undefined });
          }

          return combineLatest([
            this.gameService.isCurrentUserAdmin(this.gameId),
            this.gamePlayerService.getPlayer(this.currentUser.uid, this.gameId)
          ]).pipe(
            map(([isAdmin, player]) => ({ isAdmin, player }))
          );
        })
      ).subscribe({
        next: ({ isAdmin, player }) => {
          this.isUserAdmin = isAdmin;
          this.isUserPlayer = !!player;

          if (!this.currentUser || this.isUserAdmin) {
            this.hasAppliedDefaultFilter = false;
            this.showAllTables();
            return;
          }

          this.applyDefaultPlayerFilter();
        }
      })
    );
  }

  private applyDefaultPlayerFilter(): void {
    if (this.hasAppliedDefaultFilter || !this.isUserPlayer || this.isUserAdmin) {
      return;
    }

    this.hasAppliedDefaultFilter = true;
    this.showMyTable();
  }

  private showMyTable(): void {
    if (!this.currentUser) {
      return;
    }

    this.subscriptions.push(
      this.tableService.getTableForPlayer(this.currentUser.uid, this.roundId, this.gameId).pipe(take(1)).subscribe({
        next: (playerTable) => {
          this.filterString = playerTable?.id;
          this.isDataFiltered = !!this.filterString;
          this.applyTableFilter();
        }
      })
    );
  }

  private showAllTables(): void {
    this.isDataFiltered = false;
    this.filterString = undefined;
    this.applyTableFilter();
  }

  private applyTableFilter(): void {
    const tables = this.tables ?? [];
    this.filteredTables = this.isDataFiltered && this.filterString
      ? tables.filter((table) => table.id === this.filterString)
      : tables;
    this.filteredTables = this.sortTables(this.filteredTables);
  }

  private sortTables(tables: Table[]): Table[] {
    return [...tables].sort((a, b) => a.number - b.number);
  }
}
