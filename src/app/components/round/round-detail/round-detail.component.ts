import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/services/game/game.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { Round } from 'src/app/services/round/round';
import { RoundService } from 'src/app/services/round/round.service';
import { GamePlayer } from '../../player/game-player';

@Component({
  selector: 'app-round-detail',
  templateUrl: './round-detail.component.html',
  styleUrls: ['./round-detail.component.css']
})
export class RoundDetailComponent implements OnInit {
  gameId?: string;
  round?: Round;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private roundService: RoundService) { }

  ngOnInit(): void {
    this.getRound();
  }

  getRound(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    const roundId = this.route.snapshot.paramMap.get('roundId');

    this.roundService.getRound(roundId, this.gameId).subscribe({
      next: (round) => {
        this.round = round;
      }
    });
  }

}
