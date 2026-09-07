import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { combineLatest, of, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { LoginDialogComponent } from '../../user/login/login-dialog/login-dialog-component';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { RoundService } from 'src/app/services/round/round.service';
import { GamePlayer } from '../../player/game-player';
import { Round } from 'src/app/services/round/round';

interface TournamentStats {
  playerCount: number;
  roundCount: number;
  completedRoundCount: number;
  configuredRoundCount: number;
  tableCount: number;
  statusLabel: string;
  statusClass: string;
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})

export class GamesComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  gameAdminMap: Map<string, boolean> = new Map();
  tournamentStatsMap: Map<string, TournamentStats> = new Map();
  isLoggedIn$ = of(false);
  isLoading = true;
  private subscriptions: Subscription[] = [];
  private tournamentStatsSubscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private gameService: GameService,
    private router: Router,
    private authService: AuthService,
    private gamePlayerService: GamePlayerService,
    private roundService: RoundService) { }

  ngOnInit(): void {
    this.getGames();

    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.clearTournamentStatsSubscriptions();
  }

  getGames(): void {
    this.subscriptions.push(
      this.gameService.games$.subscribe({
        next: (games) => {
          this.games = games.sort((a, b) => this.compareGamesByCreatedDateDesc(a, b));
          this.games.map((game) => {
            this.gameAdminMap.set(game.id, this.isGameAdmin(game));
          });
          this.refreshTournamentStats();
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'dialog-container',
      data: {
        title: 'Delete tournament',
        message: `Delete ${game.name}? This cannot be undone.`,
        confirmButtonText: 'Delete'
      }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.gameService.deleteGame(game.id);
        }
      })
    );
  }

  dashboard(game: Game): void {
    this.router.navigateByUrl(`/game/${game.id}/dashboard`);
  }

  configuration(game: Game): void {
    this.router.navigateByUrl(`/game/${game.id}/configuration`);
  }

  login(): void {
    this.dialog.open(LoginDialogComponent, {
      panelClass: 'dialog-container'
    });
  }

  getAdminTournamentCount(): number {
    return this.games.filter((game) => this.gameAdminMap.get(game.id)).length;
  }

  getLatestCreatedDate(): Date | null {
    return this.games.length ? this.getCreatedDate(this.games[0]) : null;
  }

  getTournamentStats(game: Game): TournamentStats {
    return this.tournamentStatsMap.get(game.id) || this.createTournamentStats(game, [], []);
  }

  getCreatedDate(game: Game): Date | null {
    const time = this.getCreatedDateTime(game);

    return time === Number.NEGATIVE_INFINITY ? null : new Date(time);
  }

  private refreshTournamentStats(): void {
    this.clearTournamentStatsSubscriptions();
    this.tournamentStatsMap = new Map(this.games.map((game) => [game.id, this.createTournamentStats(game, [], [])]));

    this.games.forEach((game) => {
      this.tournamentStatsSubscriptions.push(
        combineLatest([
          this.gamePlayerService.playersForGame(game.id),
          this.roundService.roundsForGame(game.id)
        ]).subscribe({
          next: ([players, rounds]) => {
            this.tournamentStatsMap.set(game.id, this.createTournamentStats(game, players, rounds));
          }
        })
      );
    });
  }

  private clearTournamentStatsSubscriptions(): void {
    this.tournamentStatsSubscriptions.forEach((subscription) => subscription.unsubscribe());
    this.tournamentStatsSubscriptions = [];
  }

  private createTournamentStats(game: Game, players: GamePlayer[], rounds: Round[]): TournamentStats {
    const sortedRounds = [...rounds].sort((a, b) => a.number - b.number);
    const completedRoundCount = sortedRounds.filter((round) => round.pointsConfirmed).length;
    const configuredRoundCount = Number(game.numberOfRounds) || 0;
    const roundCount = sortedRounds.length;
    const playerCount = players.length;
    const tableCount = playerCount ? Math.ceil(playerCount / 4) : 0;
    const status = this.getTournamentStatus(playerCount, roundCount, completedRoundCount, configuredRoundCount);

    return {
      playerCount,
      roundCount,
      completedRoundCount,
      configuredRoundCount,
      tableCount,
      statusLabel: status.label,
      statusClass: status.className
    };
  }

  private getTournamentStatus(
    playerCount: number,
    roundCount: number,
    completedRoundCount: number,
    configuredRoundCount: number
  ): { label: string; className: string } {
    if (configuredRoundCount > 0 && completedRoundCount >= configuredRoundCount) {
      return { label: 'Complete', className: 'complete' };
    }

    if (roundCount > 0) {
      return { label: 'In play', className: 'in-play' };
    }

    if (playerCount > 0 || configuredRoundCount > 0) {
      return { label: 'Setup', className: 'setup' };
    }

    return { label: 'New', className: 'new' };
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
