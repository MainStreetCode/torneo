import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/services/game/game.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { GamePlayer } from '../game-player';

@Component({
  selector: 'app-game-player-detail',
  templateUrl: './game-player-detail.component.html',
  styleUrls: ['./game-player-detail.component.css']
})
export class GamePlayerDetailComponent implements OnInit {
  @Input() player?: GamePlayer;
  @Input() gameId?: string;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private playerService: GamePlayerService,
    private location: Location,
    private gameService: GameService) { }

  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    const playerId = this.route.snapshot.paramMap.get('playerId');

    this.playerService.getPlayer(playerId, this.gameId).subscribe({
      next: (player) => this.player = player
    });

    this.gameService.getGame(this.gameId).subscribe({
      next: (game) => {
        if (game.adminIds && game.adminIds.find((adminId) => adminId === playerId)) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.player) {
      this.playerService.updatePlayer(this.player, this.gameId);
    }
  }

  toggleIsAdmin(): void {
    // if isAdmin was true, then delete player as admin
    if (this.isAdmin) {
      this.gameService.deleteAdmin(this.gameId, this.player.uid);
    } else {
      // else isAdmin was false, add player as admin
      this.gameService.addAdmin(this.gameId, this.player.uid);
    }
  }
}
