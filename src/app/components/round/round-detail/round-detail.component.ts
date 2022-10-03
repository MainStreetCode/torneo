import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private roundService: RoundService,
    private tableService: TableService) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.roundId = this.route.snapshot.paramMap.get('roundId');

    this.getRound();
    this.getTables();
  }

  getRound(): void {

    this.roundService.getRound(this.roundId, this.gameId).subscribe({
      next: (round) => {
        this.round = round;
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

}
