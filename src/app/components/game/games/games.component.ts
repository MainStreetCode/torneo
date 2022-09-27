import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { getAuth } from 'firebase/auth';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: Game[] = [];

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.gameService.games$.subscribe({
      next: (games) => {
        this.games = games;
      }
    });
  }

  add(name: string): void {
    name = name.trim();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!name || !user) { return; }

    this.gameService.addGame({ name } as Game, user.uid);
  }

  delete(game: Game): void {
    this.gameService.deleteGame(game.id);
  }

  dashboard(game: Game): void {
    this.router.navigateByUrl(`/game/${game.id}/dashboard`);
  }

  configuration(game: Game): void {
    this.router.navigateByUrl(`/game/${game.id}/configuration`);
  }
}
