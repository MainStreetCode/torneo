import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from 'firebase/auth';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  gameAdminMap: Map<string, boolean> = new Map();

  constructor(private gameService: GameService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.gameService.games$.subscribe({
      next: (games) => {
        this.games = games;
        this.games.map((game) => {
          this.gameAdminMap.set(game.id, this.isGameAdmin(game));
        });
      }
    });
  }

  add(name: string): void {
    name = name.trim();

    const currentUser = this.authService.getCurrentUser();
    if (!name || !currentUser) { return; }

    this.gameService.addGame({ name } as Game, currentUser.uid).subscribe({
      next: (game) => {
        if (game) {
          this.configuration(game);
        }
      }
    });
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

  private isGameAdmin(game: Game): boolean {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && game.adminIds.find((adminId) => adminId === currentUser.uid)) {
      return true;
    }

    return false;
  }
}
