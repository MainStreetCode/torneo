import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GamePlayer } from 'src/app/components/player/game-player';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { Round } from 'src/app/services/round/round';
import { RoundService } from 'src/app/services/round/round.service';
import { environment } from 'src/environments/environment';
import { GameDashboardTab } from './game-dashboard-tab';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.css']
})

export class GameDashboardComponent implements OnInit, OnDestroy {
  @Input() game?: Game;
  sectionName: string;
  gameURL: string;
  selectedTab = GameDashboardTab.Players;
  readonly playersTab = GameDashboardTab.Players;
  readonly roundsTab = GameDashboardTab.Rounds;
  playerCount = 0;
  roundCount = 0;
  completedRoundCount = 0;
  progressPercentage = 0;
  nextRoundNumber = 1;
  dashboardStatus = 'Waiting for players';
  latestRoundLabel = 'No rounds started';
  private latestRound?: Round;
  private subscriptions: Subscription[] = [];
  private dashboardSubscriptions: Subscription[] = [];
  private dashboardGameId?: string;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private gamePlayerService: GamePlayerService,
    private roundService: RoundService,
    private location: Location,
    private router: Router,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.getGame();
    this.parseURLParams();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.dashboardSubscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private parseURLParams(): void {
    this.subscriptions.push(
      this.route.queryParams.subscribe(params => {
        const tab = Number(params.selectedTab);
        if (Number.isFinite(tab)) {
          this.selectedTab = tab as GameDashboardTab;
        }

        const roundEnded = params.roundEnded;
        if (roundEnded) {
          this.snackBar.open(`Round ${roundEnded} ended. Scores updated.`, 'Dismiss', {
            duration: 5000
          });

          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              roundEnded: null
            },
            queryParamsHandling: 'merge',
            replaceUrl: true
          });
        }
      })
    );
  }

  private getGame(): void {
    const id = this.route.snapshot.paramMap.get('gameId');

    if (!id) {
      return;
    }

    this.subscriptions.push(
      this.gameService.getGame(id).subscribe({
        next: (game) => {
          if (!game) {
            return;
          }

          this.game = game;
          this.gameURL = `${environment.url}/#/game/${this.game.id}/dashboard`;
          this.sectionName = `${this.game.name.toUpperCase()} Dashboard`;
          this.updateDashboardStatus();
          this.updateProgressPercentage();
          this.watchDashboardData(this.game.id);
        }
      })
    );
  }

  private watchDashboardData(gameId: string): void {
    if (this.dashboardGameId === gameId) {
      return;
    }

    this.dashboardGameId = gameId;
    this.dashboardSubscriptions.forEach((subscription) => subscription.unsubscribe());
    this.dashboardSubscriptions = [
      this.gamePlayerService.playersForGame(gameId).subscribe({
        next: (players) => this.updatePlayerStats(players)
      }),
      this.roundService.roundsForGame(gameId).subscribe({
        next: (rounds) => this.updateRoundStats(rounds)
      })
    ];
  }

  private updatePlayerStats(players: GamePlayer[]): void {
    this.playerCount = players.length;
    this.updateDashboardStatus();
  }

  private updateRoundStats(rounds: Round[]): void {
    const sortedRounds = [...rounds].sort((a, b) => a.number - b.number);

    this.roundCount = sortedRounds.length;
    this.completedRoundCount = sortedRounds.filter((round) => round.pointsConfirmed).length;
    this.nextRoundNumber = this.roundCount + 1;
    this.latestRound = this.roundCount > 0 ? sortedRounds[this.roundCount - 1] : undefined;
    this.latestRoundLabel = this.roundCount > 0
      ? `Round ${this.latestRound.number}`
      : 'No rounds started';

    this.updateProgressPercentage();
    this.updateDashboardStatus();
  }

  private updateProgressPercentage(): void {
    const configuredRounds = this.game?.numberOfRounds ?? 0;
    this.progressPercentage = configuredRounds > 0
      ? Math.min(100, Math.round((this.roundCount / configuredRounds) * 100))
      : 0;
  }

  private updateDashboardStatus(): void {
    const configuredRounds = this.game?.numberOfRounds ?? 0;

    if (configuredRounds === 0) {
      this.dashboardStatus = 'Setup needed';
      return;
    }

    if (!this.latestRound) {
      this.dashboardStatus = this.playerCount > 0 ? 'Ready for round 1' : 'Waiting for players';
      return;
    }

    if (this.roundCount >= configuredRounds) {
      this.dashboardStatus = this.latestRound.pointsConfirmed ? 'Game completed' : 'All rounds started';
      return;
    }

    this.dashboardStatus = this.latestRound.pointsConfirmed
      ? `Round ${this.latestRound.number} completed`
      : `Round ${this.latestRound.number} active`;
  }

  selectTab(tabNumber: number): void {
    this.selectedTab = tabNumber as unknown as GameDashboardTab;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        selectedTab: this.selectedTab
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // do not trigger navigation
    });
  }

  goBack(): void {
    this.location.back();
  }
}

