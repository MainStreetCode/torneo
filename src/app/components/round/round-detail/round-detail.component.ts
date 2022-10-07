import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
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
export class RoundDetailComponent implements OnInit {
  gameId?: string;
  roundId?: string;
  round?: Round;
  tables?: Table[];
  unConfirmedTables$ = of([]);
  allTablesPointsConfirmed$ = of(false);
  sectionName: string;

  constructor(
    private route: ActivatedRoute,
    private roundService: RoundService,
    private tableService: TableService,
    private roundMediatorService: RoundMediatorService,
    private location: Location) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.roundId = this.route.snapshot.paramMap.get('roundId');

    this.getRound();
    this.getTables();

    this.allTablesPointsConfirmed$ = this.roundMediatorService.allTablesConfirmed(this.roundId, this.gameId);
    this.unConfirmedTables$ = this.roundMediatorService.unconfirmedTables(this.roundId, this.gameId);

    // TODO: run this only once when all points are confirmed
    this.allTablesPointsConfirmed$.subscribe({
      next: (confirmed) => {
        if (confirmed) {
          this.tables.forEach((table) => {
            this.roundMediatorService.updateGamePlayerPoints(table.id, this.roundId, this.gameId);
          });
        }
      }
    });
  }

  getRound(): void {
    this.roundService.getRound(this.roundId, this.gameId).subscribe({
      next: (round) => {
        this.round = round;
        this.sectionName = `Round ${round.number}`;
      }
    });
  }

  getTables(): void {
    this.tableService.getTablesForRound(this.roundId, this.gameId).subscribe({
      next: (tables) => {
        if (tables) {
          this.tables = tables;
        }
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

}
