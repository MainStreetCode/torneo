import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { RoundMediatorService } from 'src/app/services/round-mediator/round-mediator.service';
import { RoundService } from 'src/app/services/round/round.service';
import { environment } from 'src/environments/environment';
import { ProgressDialogComponent } from '../../progress-dialog/progress-dialog.component';

@Component({
  selector: 'app-game-configuration',
  templateUrl: './game-configuration.component.html',
  styleUrls: ['./game-configuration.component.css']
})
export class GameConfigurationComponent implements OnInit, OnDestroy {
  public gameId: string;
  public game?: Game;
  public gameURL: string;
  public sectionName: string;
  public isAdmin$ = of(false);
  public isSaving = false;
  public isStartingRound = false;
  public playerCount = 0;
  public roundCount = 0;
  public nextStepIcon = 'tune';
  public nextStepTitle = 'Set the number of rounds';
  public nextStepDescription = 'Choose how many rounds this tournament should have, then save the setup.';
  public nextStepButtonText = 'Save setup';
  public nextStepCanSave = false;
  private nextStepAction: 'save' | 'players' | 'rounds' | 'startRound' = 'save';
  private subscriptions: Subscription[] = [];
  private setupSubscriptions: Subscription[] = [];
  private setupGameId?: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService,
    private gamePlayerService: GamePlayerService,
    private roundMediatorService: RoundMediatorService,
    private roundService: RoundService,
    private location: Location,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getGame();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.setupSubscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getGame(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');

    if (!this.gameId) {
      return;
    }

    this.gameURL = `${environment.url}/#/game/${this.gameId}/dashboard`;
    const dialogRef = this.dialog.open(ProgressDialogComponent, {});

    this.subscriptions.push(
      this.gameService.getGame(this.gameId).subscribe({
        next: (game) => {
          if (!game) {
            dialogRef.close();
            return;
          }

          this.game = game;
          this.isAdmin$ = this.gameService.isCurrentUserAdmin(this.game.id);
          this.sectionName = `${game.name.toUpperCase()} Configuration`;
          this.updateNextStep();
          this.watchSetupData(game.id);
          dialogRef.close();
        }
      })
    );
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (!this.game || this.isSaving) {
      return;
    }

    this.isSaving = true;
    this.subscriptions.push(
      this.gameService.updateGame(this.game).subscribe({
        next: () => {
          this.isSaving = false;
          this.sectionName = `${this.game.name.toUpperCase()} Configuration`;
          this.updateNextStep();
          this.snackBar.open('Game configuration saved.', 'Dismiss', {
            duration: 4000
          });
        },
        error: () => {
          this.isSaving = false;
          this.snackBar.open('Unable to save game configuration.', 'Dismiss', {
            duration: 5000
          });
        }
      })
    );
  }

  startGame(): void {
    if (this.game) {
      this.router.navigateByUrl(`/game/${this.game.id}/dashboard?selectedTab=1`);
    }
  }

  takeNextStep(): void {
    if (this.nextStepAction === 'save') {
      this.save();
      return;
    }

    if (this.nextStepAction === 'players') {
      document.getElementById('players-setup')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (this.nextStepAction === 'startRound') {
      this.startFirstRound();
      return;
    }

    if (this.game) {
      this.router.navigateByUrl(`/game/${this.game.id}/dashboard?selectedTab=1`);
    }
  }

  get isRoundCountConfigured(): boolean {
    return (Number(this.game?.numberOfRounds) || 0) > 0;
  }

  get hasEnoughPlayers(): boolean {
    return this.playerCount >= 4;
  }

  get hasStartedRounds(): boolean {
    return this.roundCount > 0;
  }

  private watchSetupData(gameId: string): void {
    if (this.setupGameId === gameId) {
      return;
    }

    this.setupGameId = gameId;
    this.setupSubscriptions.forEach((subscription) => subscription.unsubscribe());
    this.setupSubscriptions = [
      this.gamePlayerService.playersForGame(gameId).subscribe({
        next: (players) => {
          this.playerCount = players.length;
          this.updateNextStep();
        }
      }),
      this.roundService.roundsForGame(gameId).subscribe({
        next: (rounds) => {
          this.roundCount = rounds.length;
          this.updateNextStep();
        }
      })
    ];
  }

  private updateNextStep(): void {
    if (!this.isRoundCountConfigured) {
      this.nextStepIcon = 'tune';
      this.nextStepTitle = 'Set the number of rounds';
      this.nextStepDescription = 'Choose how many rounds this tournament should have, then save the setup.';
      this.nextStepButtonText = 'Save setup';
      this.nextStepCanSave = true;
      this.nextStepAction = 'save';
      return;
    }

    if (!this.hasEnoughPlayers) {
      this.nextStepIcon = 'group_add';
      this.nextStepTitle = 'Add players';
      this.nextStepDescription = `Add ${4 - this.playerCount} more player${4 - this.playerCount === 1 ? '' : 's'} to start the first round.`;
      this.nextStepButtonText = 'Add players';
      this.nextStepCanSave = false;
      this.nextStepAction = 'players';
      return;
    }

    if (!this.hasStartedRounds) {
      this.nextStepIcon = 'play_arrow';
      this.nextStepTitle = 'Start round 1';
      this.nextStepDescription = 'Setup is ready. Start the first round to create tables.';
      this.nextStepButtonText = 'Start round 1';
      this.nextStepCanSave = false;
      this.nextStepAction = 'startRound';
      return;
    }

    this.nextStepIcon = 'table_bar';
    this.nextStepTitle = 'Continue tournament';
    this.nextStepDescription = 'Rounds have started. Use the dashboard to enter scores and manage remaining rounds.';
    this.nextStepButtonText = 'Open rounds';
    this.nextStepCanSave = false;
    this.nextStepAction = 'rounds';
  }

  private startFirstRound(): void {
    if (!this.game || this.isSaving || this.isStartingRound) {
      return;
    }

    const game = this.game;
    this.isSaving = true;
    this.isStartingRound = true;
    this.subscriptions.push(
      this.gameService.updateGame(game).pipe(
        switchMap(() => this.roundMediatorService.createRound(game.id, 1)),
        finalize(() => {
          this.isSaving = false;
          this.isStartingRound = false;
        })
      ).subscribe({
        next: (result) => {
          if (result?.round?.id) {
            this.router.navigateByUrl(`/game/${game.id}/round/${result.round.id}`);
          }
        },
        error: (error) => {
          this.snackBar.open(error.message || 'Unable to start round 1.', 'Dismiss', {
            duration: 5000
          });
        }
      })
    );
  }
}
