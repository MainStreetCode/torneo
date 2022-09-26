import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../player';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { Router } from '@angular/router';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];
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

    this.addPlayerToGame({ name } as Player);
  }

  delete(player: Player): void {
    this.playerService.deletePlayer(player.id, this.game);
  }

  showPlayerDetail(player: Player): void {
    this.router.navigateByUrl(`/game/${this.game.id}/player/${player.id}`);
  }

  addPlayerToGame(player: Player): void {
    if (this.game) {
      this.playerService.addPlayer(player, this.game.id);
    }
  }
}
