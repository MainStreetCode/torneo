import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game-configuration',
  templateUrl: './game-configuration.component.html',
  styleUrls: ['./game-configuration.component.css']
})
export class GameConfigurationComponent implements OnInit {
  @Input() game?: Game;
  public gameURL: string;
  public sectionName: string;
  public isAdmin$ = of(false);

  constructor(private route: ActivatedRoute, private gameService: GameService, private location: Location) {

  }

  ngOnInit(): void {
    this.getGame();
  }

  getGame(): void {
    const id = this.route.snapshot.paramMap.get('gameId');

    if (!id) {
      return;
    }

    this.gameService.getGame(id).subscribe({
      next: (game) => {
        this.game = game;
        this.gameURL = `${environment.url}/game/${this.game.id}`;
        this.isAdmin$ = this.gameService.isCurrentUserAdmin(this.game.id);
        this.sectionName = `${game.name.toUpperCase()} Configuration`;
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
