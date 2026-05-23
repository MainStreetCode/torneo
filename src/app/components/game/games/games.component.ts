import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { of, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProgressDialogComponent } from '../../progress-dialog/progress-dialog.component';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})

export class GamesComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  gameAdminMap: Map<string, boolean> = new Map();
  isLoggedIn$ = of(false);
  private subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private gameService: GameService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getGames();

    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getGames(): void {
    const dialogRef = this.dialog.open(ProgressDialogComponent, {});

    this.subscriptions.push(
      this.gameService.games$.subscribe({
        next: (games) => {
          this.games = games.sort((a, b) => this.compareGamesByCreatedDateDesc(a, b));
          this.games.map((game) => {
            this.gameAdminMap.set(game.id, this.isGameAdmin(game));
          });
          dialogRef.close();
        }
      })
    );
  }

  add(name: string): void {
    name = name.trim();

    const currentUser = this.authService.getCurrentUser();
    if (!name || !currentUser) { return; }

    this.subscriptions.push(
      this.gameService.addGame({ name } as Game, currentUser.uid).subscribe({
        next: (game) => {
          if (game) {
            this.configuration(game);
          }
        }
      })
    );
  }

  delete(game: Game): void {
    this.gameService.deleteGame(game.id);
  }

  dashboard(game: Game): void {
    this.router.navigateByUrl(`/game/${game.id}/dashboard`);
  }

  configuration(game: Game): void {
    this.router.navigateByUrl(`/game/${game.id}/configuration`);
  }

  getCreatedDate(game: Game): Date | null {
    const time = this.getCreatedDateTime(game);

    return time === Number.NEGATIVE_INFINITY ? null : new Date(time);
  }

  private isGameAdmin(game: Game): boolean {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && game.adminIds.find((adminId) => adminId === currentUser.uid)) {
      return true;
    }

    return false;
  }

  private compareGamesByCreatedDateDesc(a: Game, b: Game): number {
    const dateComparison = this.getCreatedDateTime(b) - this.getCreatedDateTime(a);

    if (dateComparison !== 0) {
      return dateComparison;
    }

    return a.name.localeCompare(b.name) || a.id.localeCompare(b.id);
  }

  private getCreatedDateTime(game: Game): number {
    const createdDate = game.createdDate as Date | string | number | { toDate: () => Date } | undefined;

    if (!createdDate) {
      return Number.NEGATIVE_INFINITY;
    }

    const date: Date | string | number = this.hasToDate(createdDate) ? createdDate.toDate() : createdDate;
    const time = date ? new Date(date).getTime() : Number.NEGATIVE_INFINITY;

    return Number.isNaN(time) ? Number.NEGATIVE_INFINITY : time;
  }

  private hasToDate(value: Date | string | number | { toDate: () => Date }): value is { toDate: () => Date } {
    return typeof value === 'object' && 'toDate' in value;
  }
}
