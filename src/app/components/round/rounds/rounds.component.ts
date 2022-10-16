import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { combineLatest, of, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
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
  isUserAdmin = false;
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
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getRounds(): void {
    this.subscriptions.push(
      this.roundService.roundsForGame(this.game.id).subscribe({
        next: (rounds) => {
          this.rounds = rounds.sort((a, b) => a.number - b.number);
          const lastRound = this.rounds[this.rounds.length - 1];
          this.allTablesPointsConfirmed$ = this.roundMediatorService.allTablesConfirmed(lastRound.id, this.game.id);
        }
      })
    );
  }

  startRound(roundNumber: number): void {
    this.subscriptions.push(
      combineLatest([
        this.allTablesPointsConfirmed$,
        this.playerService.playersForGame(this.game.id).pipe(take(1))
      ]).subscribe({
        next: ([allPointsConfirmed, players]) => {
          if (!allPointsConfirmed) {
            this.showErrorDialog('Start Round', `Please confirm all points for round ${roundNumber - 1} first`);
            return;
          }

          if (players && players.length < 4) {
            this.showErrorDialog('Start Round', 'You need to have at least 4 players to start a round');
            return;
          }

          if (roundNumber <= this.game.numberOfRounds) {
              this.roundMediatorService.createRound(this.game.id);
          }
        }
      })
    );
  }

  configuration(): void {
    this.router.navigateByUrl(`/game/${this.game.id}/configuration`);
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
