import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'firebase/auth';
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
export class TablesComponent implements OnInit {
  @Input() tables: Table[];
  public filteredTables: Table[];
  public isDataFiltered = false;
  public isUserPlayer = true;
  private filterString: string | undefined;
  private gameId: string;
  private roundId: string;
  private currentUser: User;

  constructor(
    private tableService: TableService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private gamePlayerService: GamePlayerService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.roundId = this.route.snapshot.paramMap.get('roundId');
    this.filteredTables = this.tables;

    this.checkCurrentUserIsPlayer();
    this.filterTables();
  }

  filterTables(): void {
    this.isDataFiltered = !this.isDataFiltered;

    if (this.isDataFiltered) {
      this.tableService.getTableForPlayer(this.currentUser.uid, this.roundId, this.gameId).pipe(take(1)).subscribe({
        next: (playerTable) => {
          if (playerTable) {
            this.filterString = playerTable.id;
          } else {
            this.filterString = undefined;
          }

          this.filteredTables = this.tables.filter((table) => table.id === this.filterString);
        }
      });
    } else {
      this.filteredTables = this.tables;
    }

    this.filteredTables.sort((a, b) => a.number - b.number);
  }

  private checkCurrentUserIsPlayer(): void {
    this.gamePlayerService.getPlayer(this.currentUser.uid, this.gameId).subscribe({
      next: (player) => {
        if (player) {
          this.isUserPlayer = true;
        } else {
          this.isUserPlayer = false;
        }
      }
    });
  }
}
