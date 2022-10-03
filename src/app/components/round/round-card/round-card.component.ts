import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RoundMediatorService } from 'src/app/services/round-mediator/round-mediator.service';
import { Round } from 'src/app/services/round/round';
import { RoundService } from 'src/app/services/round/round.service';

@Component({
  selector: 'app-round-card',
  templateUrl: './round-card.component.html',
  styleUrls: ['./round-card.component.css']
})
export class RoundCardComponent implements OnInit {
  @Input() round: Round;
  @Input() gameId: string;

  allTablesPointsConfirmed$ = of(false);

  constructor(private roundMediatorService: RoundMediatorService, private roundService: RoundService, private router: Router) { }

  ngOnInit(): void {
    this.allTablesPointsConfirmed$ = this.roundMediatorService.allTablesConfirmed(this.round.id, this.gameId);
  }

  delete(round: Round): void {
    this.roundService.deleteRound(round.id, this.gameId);
  }

  view(round: Round): void {
    this.router.navigateByUrl(`/game/${this.gameId}/round/${round.id}`);
  }

  configuration(): void {
    this.router.navigateByUrl(`/game/${this.gameId}/configuration`);
  }
}
