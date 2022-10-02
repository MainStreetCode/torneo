import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { table } from 'console';
import { Game } from 'src/app/services/game/game';
import { RoundMediatorService } from 'src/app/services/round-mediator/round-mediator.service';
import { Round } from 'src/app/services/round/round';
import { RoundService } from 'src/app/services/round/round.service';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.css']
})
export class RoundsComponent implements OnInit {
  @Input() game: Game;
  rounds: Round[] = [];

  constructor(private roundService: RoundService, private router: Router, private roundMediatorService: RoundMediatorService) { }

  ngOnInit(): void {
    this.getRounds();
  }

  getRounds(): void {
    this.roundService.roundsForGame(this.game.id).subscribe({
      next: (rounds) => {
        this.rounds = rounds.sort((a, b) => a.number - b.number);
      }
    });
  }

  startRound(roundNumber: number): void {
    if (roundNumber <= this.game.numberOfRounds) {
      this.roundMediatorService.createRound(this.game.id);
    }
  }

  delete(round: Round): void {
    this.roundService.deleteRound(round.id, this.game.id);
  }

  view(round: Round): void {
    this.router.navigateByUrl(`/game/${this.game.id}/round/${round.id}`);
  }

  configuration(): void {
    this.router.navigateByUrl(`/game/${this.game.id}/configuration`);
  }
}
