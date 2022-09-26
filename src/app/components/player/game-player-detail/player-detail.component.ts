import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { GamePlayer } from '../gamePlayer';

@Component({
  selector: 'app-game-player-detail',
  templateUrl: './game-player-detail.component.html',
  styleUrls: ['./game-player-detail.component.css']
})
export class GamePlayerDetailComponent implements OnInit {
  @Input() player?: GamePlayer;
  @Input() gameId?: string;


  constructor(private route: ActivatedRoute, private playerService: GamePlayerService, private location: Location) { }

  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    const playerId = this.route.snapshot.paramMap.get('playerId');

    this.playerService.getPlayer(playerId, this.gameId).subscribe({
      next: (player) => this.player = player
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
}
