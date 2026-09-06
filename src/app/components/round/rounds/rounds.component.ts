import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { combineLatest, EMPTY, of, Subscription } from 'rxjs';
import { finalize, switchMap, take } from 'rxjs/operators';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { RoundMediatorService } from 'src/app/services/round-mediator/round-mediator.service';
import { Round } from 'src/app/services/round/round';
import { RoundService } from 'src/app/services/round/round.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.css']
})
export class RoundsComponent implements OnInit, OnDestroy {
  @Input() game: Game;
  rounds: Round[] = [];
  playerCount = 0;
  isUserAdmin = false;
  isStartingRound = false;
  allTablesPointsConfirmed$ = of(false);
  private subscriptions: Subscription[] = [];

  constructor(
    private roundService: RoundService,
    private roundMediatorService: RoundMediatorService,
    private gameService: GameService,
    private router: Router,
    private dialog: MatDialog,
    private playerService: GamePlayerService) { }

  ngOnInit(): void {
    this.getRounds();

    this.subscriptions.push(
      this.gameService.isCurrentUserAdmin(this.game.id).subscribe({
        next: (isAdmin) => {
          this.isUserAdmin = isAdmin;
        }
      })
    );

    this.subscriptions.push(
      this.playerService.playersForGame(this.game.id).subscribe({
        next: (players) => {
          this.playerCount = players.length;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getRounds(): void {
    this.subscriptions.push(
      this.roundService.roundsForGame(this.game.id).subscribe({
        next: (rounds) => {
          if (rounds.length === 0) {
            this.rounds = [];
            return;
          }
          this.rounds = rounds.sort((a, b) => a.number - b.number);
          const lastRound = this.rounds[this.rounds.length - 1];
          this.allTablesPointsConfirmed$ = this.roundMediatorService.allTablesConfirmed(lastRound.id, this.game.id);
        }
      })
    );
  }

  startRound(roundNumber: number): void {
    if (this.isStartingRound) {
      return;
    }

    this.isStartingRound = true;
    this.subscriptions.push(
      combineLatest([
        this.allTablesPointsConfirmed$,
        this.playerService.playersForGame(this.game.id).pipe(take(1))
      ]).pipe(
        switchMap(([allPointsConfirmed, players]) => {
          if (roundNumber > 1 && !allPointsConfirmed) {
            this.showErrorDialog('Start round', `Confirm all table scores for round ${roundNumber - 1} first.`);
            return EMPTY;
          }

          if (players && players.length < 4) {
            this.showErrorDialog('Start round', 'Add at least 4 players to start a round.');
            return EMPTY;
          }

          if (roundNumber <= this.game.numberOfRounds) {
            return this.roundMediatorService.createRound(this.game.id, roundNumber);
          }

          return EMPTY;
        }),
        finalize(() => {
          this.isStartingRound = false;
        })
      ).subscribe({
        next: (result) => {
          if (result?.round?.id) {
            this.router.navigateByUrl(`/game/${this.game.id}/round/${result.round.id}`);
          }
        },
        error: (error) => {
          this.showErrorDialog('Start round', error.message || 'Unable to start the round.');
        }
      })
    );
  }

  configuration(): void {
    this.router.navigateByUrl(`/game/${this.game.id}/configuration`);
  }

  goToPlayers(): void {
    this.router.navigateByUrl(`/game/${this.game.id}/dashboard?selectedTab=0`);
  }

  takeEmptyRoundsAction(): void {
    if (!this.isUserAdmin) {
      return;
    }

    if (!this.hasConfiguredRounds) {
      this.configuration();
      return;
    }

    if (!this.hasEnoughPlayers) {
      this.goToPlayers();
      return;
    }

    this.startRound(1);
  }

  get hasConfiguredRounds(): boolean {
    return (Number(this.game?.numberOfRounds) || 0) > 0;
  }

  get hasEnoughPlayers(): boolean {
    return this.playerCount >= 4;
  }

  get emptyRoundsIcon(): string {
    if (!this.hasConfiguredRounds) {
      return 'tune';
    }

    if (!this.hasEnoughPlayers) {
      return 'group_add';
    }

    return 'play_arrow';
  }

  get emptyRoundsTitle(): string {
    return 'No rounds yet';
  }

  get emptyRoundsMessage(): string {
    if (!this.hasConfiguredRounds) {
      return 'Set the number of rounds before starting round 1.';
    }

    if (!this.hasEnoughPlayers) {
      return `Add ${4 - this.playerCount} more player${4 - this.playerCount === 1 ? '' : 's'}, then start round 1.`;
    }

    if (!this.isUserAdmin) {
      return 'Setup is ready. Waiting for an admin to start round 1.';
    }

    return 'Setup is ready. Start round 1 to create tables.';
  }

  get emptyRoundsActionIcon(): string {
    if (!this.hasConfiguredRounds) {
      return 'tune';
    }

    if (!this.hasEnoughPlayers) {
      return 'group';
    }

    return 'play_arrow';
  }

  get emptyRoundsActionText(): string {
    if (!this.hasConfiguredRounds) {
      return 'Open setup';
    }

    if (!this.hasEnoughPlayers) {
      return 'Go to players';
    }

    return 'Start round 1';
  }

  get showEmptyRoundsAction(): boolean {
    return this.isUserAdmin;
  }

  showErrorDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'dialog-container',
      data: {
        title,
        message,
        showActionButtons: false
      }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe()
    );
  }
}
