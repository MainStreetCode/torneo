import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { GameService } from 'src/app/services/game/game.service';
import { RoundMediatorService } from 'src/app/services/round-mediator/round-mediator.service';
import { Round } from 'src/app/services/round/round';
import { RoundService } from 'src/app/services/round/round.service';
import { TableService } from 'src/app/services/table/table.service';
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
  updateCounter = 0;

  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roundService: RoundService,
    private tableService: TableService,
    private roundMediatorService: RoundMediatorService,
    private gameService: GameService,
    private location: Location) { }

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
    this.updateCounter = 0;

    this.subscriptions.push(
      this.allTablesPointsConfirmed$.pipe(
        take(1),
        switchMap((confirmed) => {
          if (confirmed) {
            return this.roundMediatorService.updatePlayerPoints(this.roundId, this.gameId);
          }
        })
      ).subscribe({
        next: () => {
          this.updateCounter++;
          if (this.updateCounter === this.tables.length) {
            this.roundMediatorService.updateByePlayerPoints(this.roundId, this.gameId).subscribe({
              complete: () => {
                this.router.navigateByUrl(`/game/${this.gameId}/dashboard`);
              }
            });
          }
        }
      })
    );
  }

  getRound(): void {
    this.subscriptions.push(
      this.roundService.getRound(this.roundId, this.gameId).subscribe({
        next: (round) => {
          this.round = round;
          this.sectionName = `Round ${round.number}`;
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

}
