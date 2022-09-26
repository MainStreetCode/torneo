import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
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
        this.gameURL = `${environment.url}/game/${this.game.id}`;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.game) {
      this.gameService.updateGame(this.game);
    }
  }
}
