import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { Player } from '../player';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  @Input() player?: Player;
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
