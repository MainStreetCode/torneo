import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { table } from 'console';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
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
  isUserAdmin = false;

  constructor(
    private roundService: RoundService,
    private roundMediatorService: RoundMediatorService,
    private gameService: GameService) { }

  ngOnInit(): void {
    this.getRounds();

    this.gameService.isCurrentUserAdmin(this.game.id).subscribe({
      next: (isAdmin) => {
        this.isUserAdmin = isAdmin;
      }
    });
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
}
