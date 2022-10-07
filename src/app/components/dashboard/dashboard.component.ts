import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { GamePlayer } from '../player/game-player';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  players: GamePlayer[] = [];
  public games: Game[];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.games$.subscribe({
      next: (games) => {
        this.games = games;
      }
    });
  }
}
