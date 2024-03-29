import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EMPTY, of, Subscription, switchMap } from 'rxjs';
import { GameService } from 'src/app/services/game/game.service';
import { RoundMediatorService } from 'src/app/services/round-mediator/round-mediator.service';
import { Round } from 'src/app/services/round/round';
import { RoundService } from 'src/app/services/round/round.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-round-card',
  templateUrl: './round-card.component.html',
  styleUrls: ['./round-card.component.css']
})
export class RoundCardComponent implements OnInit, OnDestroy {
  @Input() round: Round;
  @Input() gameId: string;
  isAdmin$ = of(false);
  allTablesPointsConfirmed$ = of(false);
  private subscriptions: Subscription[] = [];

  constructor(
    private gameService: GameService,
    private roundMediatorService: RoundMediatorService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.allTablesPointsConfirmed$ = this.roundMediatorService.allTablesConfirmed(this.round.id, this.gameId);
    this.isAdmin$ = this.gameService.isCurrentUserAdmin(this.gameId);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public delete(round: Round): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'dialog-container',
      data: {
        title: 'Delete Round',
        message: 'Are you sure you want to delete this round?',
        confirmButtonText: 'Yes'
      }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.roundMediatorService.deleteRound(round.id, this.gameId);
        }
      })
    );
  }

  public view(round: Round): void {
    this.router.navigateByUrl(`/game/${this.gameId}/round/${round.id}`);
  }

  public configuration(): void {
    this.router.navigateByUrl(`/game/${this.gameId}/configuration`);
  }
}
