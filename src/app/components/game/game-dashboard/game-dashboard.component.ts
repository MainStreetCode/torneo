import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.css']
})
export class GameDashboardComponent implements OnInit {
  @Input() game?: Game;
  public gameURL: string;

  constructor(private route: ActivatedRoute, private gameService: GameService, private location: Location) {

  }

  ngOnInit(): void {
    this.getGame();
  }

  getGame(): void {
    const id = this.route.snapshot.paramMap.get('gameId');
    this.gameService.getGame(id).subscribe({
      next: (game) => {
        this.game = game;
        this.gameURL = `${environment.url}/game/${this.game.id}/dashboard`;
      }
    });
  }

}
