import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game/game.service';
import { RoundMediatorService } from 'src/app/services/round-mediator/round-mediator.service';
import { Round } from 'src/app/services/round/round';
import { RoundService } from 'src/app/services/round/round.service';
import { TableService } from 'src/app/services/table/table.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { Table } from '../../table/table';

@Component({
  selector: 'app-round-detail',
  templateUrl: './round-detail.component.html',
  styleUrls: ['./round-detail.component.css']
})
export class RoundDetailComponent implements OnInit, OnDestroy {
  gameId?: string;
  roundId?: string;
  round?: Round;
  tables?: Table[];
  unConfirmedTables$ = of([]);
  allTablesPointsConfirmed$ = of(false);
  sectionName: string;
  isAdmin$ = of(false);

  private subscriptions: Subscription[] = [];
  private hasRedirectedToDashboard = false;
  private previousPointsConfirmed?: boolean;
  private isEndingRound = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roundService: RoundService,
    private tableService: TableService,
    private roundMediatorService: RoundMediatorService,
    private gameService: GameService,
    private location: Location,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.roundId = this.route.snapshot.paramMap.get('roundId');

    this.getRound();
    this.getTables();

    this.allTablesPointsConfirmed$ = this.roundMediatorService.allTablesConfirmed(this.roundId, this.gameId);
    this.unConfirmedTables$ = this.roundMediatorService.unconfirmedTables(this.roundId, this.gameId);

    this.isAdmin$ = this.gameService.isCurrentUserAdmin(this.gameId);

    return;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  endRound(): void {
    this.isEndingRound = true;
    this.subscriptions.push(
      this.roundMediatorService.finalizeRoundIfReady(this.roundId, this.gameId).subscribe({
        next: (finalized) => {
          if (finalized) {
            this.navigateToScores();
          }
        },
        error: (error) => {
          this.isEndingRound = false;
          this.showErrorDialog('End Round', error.message || 'The round could not be ended.');
        },
        complete: () => {
          this.isEndingRound = false;
        }
      })
    );
  }

  getRound(): void {
    this.subscriptions.push(
      this.roundService.getRound(this.roundId, this.gameId).subscribe({
        next: (round) => {
          if (!round) {
            this.round = undefined;
            return;
          }

          const wasPointsConfirmed = this.previousPointsConfirmed;
          this.round = round;
          this.sectionName = `Round ${round.number}`;

          if (!this.isEndingRound && wasPointsConfirmed === false && round.pointsConfirmed) {
            this.navigateToScores();
          }

          this.previousPointsConfirmed = !!round.pointsConfirmed;
        }
      })
    );
  }

  getTables(): void {
    this.subscriptions.push(
      this.tableService.getTablesForRound(this.roundId, this.gameId).subscribe({
        next: (tables) => {
          if (tables) {
            this.tables = tables;
          }
        }
      })
    );
  }

  goBack(): void {
    this.location.back();
  }

  private navigateToScores(): void {
    if (this.hasRedirectedToDashboard || !this.gameId || !this.round) {
      return;
    }

    this.hasRedirectedToDashboard = true;
    this.router.navigateByUrl(`/game/${this.gameId}/dashboard?selectedTab=0&roundEnded=${this.round.number}`);
  }

  private showErrorDialog(title: string, message: string): void {
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
