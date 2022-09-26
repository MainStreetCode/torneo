import { Component, Input, OnInit } from '@angular/core';
import { GamePlayer } from '../gamePlayer';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { Router } from '@angular/router';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-game-players',
  templateUrl: './game-players.component.html',
  styleUrls: ['./game-players.component.css']
})
export class GamePlayersComponent implements OnInit {
  players: GamePlayer[] = [];
  @Input() game?: Game;

  constructor(private playerService: GamePlayerService, private router: Router) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.playersForGame(this.game.id).subscribe({
      next: (players) => {
        this.players = players;
      }
    });
  }

  add(name: string): void {
    name = name.trim();

    if (!name) { return; }

    this.addPlayerToGame({ name } as GamePlayer);
  }

  delete(player: GamePlayer): void {
    this.playerService.deletePlayer(player.id, this.game);
  }

  showPlayerDetail(player: GamePlayer): void {
    this.router.navigateByUrl(`/game/${this.game.id}/player/${player.id}`);
  }

  addPlayerToGame(player: GamePlayer): void {
    if (this.game) {
      this.playerService.addPlayer(player, this.game.id);
    }
  }
}
