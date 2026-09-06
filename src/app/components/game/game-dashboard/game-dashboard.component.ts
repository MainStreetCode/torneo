import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'firebase/auth';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { GamePlayer } from 'src/app/components/player/game-player';
import { LoginDialogComponent } from 'src/app/components/user/login/login-dialog/login-dialog-component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { Round } from 'src/app/services/round/round';
import { RoundService } from 'src/app/services/round/round.service';
import { environment } from 'src/environments/environment';
import { RoundsComponent } from '../../round/rounds/rounds.component';
import { GameDashboardTab } from './game-dashboard-tab';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.css']
})

export class GameDashboardComponent implements OnInit, OnDestroy {
  @Input() game?: Game;
  @ViewChild(RoundsComponent) roundsComponent?: RoundsComponent;
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
  nextStepIcon = 'person_add';
  nextStepTitle = 'Add players';
  nextStepDescription = 'Add at least 4 players before starting the first round.';
  nextStepButtonText = 'Go to players';
  showStandingsAction = false;
  canCurrentUserJoin = false;
  hasCurrentUserJoined = false;
  private nextStepAction: 'players' | 'rounds' | 'configuration' | 'currentRound' = 'players';
  private latestRound?: Round;
  private currentUser?: User;
  private players: GamePlayer[] = [];
  private hasRoundsStarted = false;
  private subscriptions: Subscription[] = [];
  private dashboardSubscriptions: Subscription[] = [];
  private dashboardGameId?: string;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private gamePlayerService: GamePlayerService,
    private roundService: RoundService,
    private authService: AuthService,
    private dialog: MatDialog,
    private location: Location,
    private router: Router,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.getGame();
    this.parseURLParams();
    this.watchCurrentUser();
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
          this.updateNextStep();
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
    this.players = players;
    this.playerCount = players.length;
    this.updateJoinState();
    this.updateDashboardStatus();
    this.updateNextStep();
  }

  private updateRoundStats(rounds: Round[]): void {
    const sortedRounds = [...rounds].sort((a, b) => a.number - b.number);

    this.roundCount = sortedRounds.length;
    this.completedRoundCount = sortedRounds.filter((round) => round.pointsConfirmed).length;
    this.nextRoundNumber = this.roundCount + 1;
    this.latestRound = this.roundCount > 0 ? sortedRounds[this.roundCount - 1] : undefined;
    this.hasRoundsStarted = this.roundCount > 0;
    this.latestRoundLabel = this.roundCount > 0
      ? `Round ${this.latestRound.number}`
      : 'No rounds started';

    this.updateJoinState();
    this.updateProgressPercentage();
    this.updateDashboardStatus();
    this.updateNextStep();
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
      this.dashboardStatus = this.latestRound.pointsConfirmed ? 'Game completed' : `Round ${this.latestRound.number} started`;
      return;
    }

    this.dashboardStatus = this.latestRound.pointsConfirmed
      ? `Round ${this.latestRound.number} completed`
      : `Round ${this.latestRound.number} started`;
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

  takeNextStep(): void {
    switch (this.nextStepAction) {
      case 'configuration':
        this.router.navigateByUrl(`/game/${this.game?.id}/configuration`);
        break;
      case 'rounds':
        this.startNextRound();
        break;
      case 'currentRound':
        if (this.game?.id && this.latestRound?.id) {
          this.router.navigateByUrl(`/game/${this.game.id}/round/${this.latestRound.id}`);
        }
        break;
      case 'players':
      default:
        this.showPlayersSection();
        break;
    }
  }

  viewStandings(): void {
    this.showPlayersSection();
  }

  joinTournament(): void {
    if (!this.game?.id || this.hasCurrentUserJoined || this.hasRoundsStarted) {
      return;
    }

    this.subscriptions.push(
      this.authService.isLoggedIn$.pipe(take(1)).subscribe({
        next: (loggedIn) => {
          if (loggedIn) {
            this.createPlayerFromCurrentUser();
          } else {
            this.showJoinDialog();
          }
        }
      })
    );
  }

  goBack(): void {
    this.location.back();
  }

  private watchCurrentUser(): void {
    this.subscriptions.push(
      this.authService.isLoggedIn$.subscribe({
        next: () => this.updateJoinState()
      })
    );
  }

  private updateJoinState(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.hasCurrentUserJoined = !!this.currentUser
      && this.players.some((player) => player.uid === this.currentUser?.uid);
    this.canCurrentUserJoin = !!this.game?.id && !this.hasCurrentUserJoined && !this.hasRoundsStarted;
  }

  private createPlayerFromCurrentUser(): void {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser || !this.game?.id || this.hasRoundsStarted) {
      return;
    }

    this.gamePlayerService.addPlayer({
      uid: currentUser.uid,
      displayName: currentUser.displayName
    } as unknown as GamePlayer, this.game.id);
  }

  private showJoinDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'dialog-container',
      data: {
        title: 'Join tournament',
        message: 'Log in to join this tournament and appear in the standings.',
        confirmButtonText: 'Log in'
      }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.showLoginDialog();
        }
      })
    );
  }

  private showLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      panelClass: 'dialog-container',
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe()
    );
  }

  private updateNextStep(): void {
    const configuredRounds = this.game?.numberOfRounds ?? 0;
    this.showStandingsAction = false;

    if (configuredRounds === 0) {
      this.nextStepIcon = 'tune';
      this.nextStepTitle = 'Finish tournament setup';
      this.nextStepDescription = 'Set the number of rounds before players can start competing.';
      this.nextStepButtonText = 'Open setup';
      this.nextStepAction = 'configuration';
      return;
    }

    if (this.playerCount < 4) {
      this.nextStepIcon = 'person_add';
      this.nextStepTitle = 'Add players';
      this.nextStepDescription = 'You need at least 4 players to create the first table.';
      this.nextStepButtonText = 'Go to players';
      this.nextStepAction = 'players';
      return;
    }

    if (!this.latestRound) {
      this.nextStepIcon = 'play_arrow';
      this.nextStepTitle = 'Start round 1';
      this.nextStepDescription = 'Players are ready. Start the first round to create tables.';
      this.nextStepButtonText = 'Start round 1';
      this.nextStepAction = 'rounds';
      return;
    }

    if (!this.latestRound.pointsConfirmed) {
      this.nextStepIcon = 'edit_note';
      this.nextStepTitle = `Enter scores for round ${this.latestRound.number}`;
      this.nextStepDescription = 'Open the active round, enter table scores, and confirm them.';
      this.nextStepButtonText = 'Open current round';
      this.nextStepAction = 'currentRound';
      return;
    }

    if (this.roundCount < configuredRounds) {
      this.nextStepIcon = 'play_arrow';
      this.nextStepTitle = `Start round ${this.nextRoundNumber}`;
      this.nextStepDescription = `Round ${this.latestRound.number} is complete. Start the next round when everyone is ready.`;
      this.nextStepButtonText = `Start round ${this.nextRoundNumber}`;
      this.showStandingsAction = true;
      this.nextStepAction = 'rounds';
      return;
    }

    this.nextStepIcon = 'leaderboard';
    this.nextStepTitle = 'Review final standings';
    this.nextStepDescription = 'All configured rounds are complete. Check the player standings and point totals.';
    this.nextStepButtonText = 'View standings';
    this.nextStepAction = 'players';
  }

  private startNextRound(): void {
    if (this.roundsComponent) {
      this.roundsComponent.startRound(this.nextRoundNumber);
      return;
    }

    this.selectTab(this.roundsTab);
  }

  private showPlayersSection(): void {
    this.selectTab(this.playersTab);
    window.setTimeout(() => {
      document.getElementById('players-standings')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

