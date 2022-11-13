import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { User } from 'firebase/auth';
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
          this.games = games;
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

  private isGameAdmin(game: Game): boolean {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && game.adminIds.find((adminId) => adminId === currentUser.uid)) {
      return true;
    }

    return false;
  }
}
