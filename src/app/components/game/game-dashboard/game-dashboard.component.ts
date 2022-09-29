import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { environment } from 'src/environments/environment';
import { GameDashboardTab } from './game-dashboard-tab';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.css']
})

export class GameDashboardComponent implements OnInit {
  @Input() game?: Game;
  gameURL: string;
  selectedTab = GameDashboardTab.Players;
  readonly playersTab = GameDashboardTab.Players;
  readonly roundsTab = GameDashboardTab.Rounds;

  constructor(private route: ActivatedRoute, private gameService: GameService, private location: Location, private router: Router) {

  }

  ngOnInit(): void {
    this.getGame();
    this.parseURLParams();
  }

  parseURLParams(): void {
    this.route.queryParams
      .subscribe(params => {
        const tab = params.selectedTab;
        if (tab) {
          this.selectedTab = tab;
        }
      }
    );
  }

  getGame(): void {
    const id = this.route.snapshot.paramMap.get('gameId');

    if (!id) {
      return;
    }

    this.gameService.getGame(id).subscribe({
      next: (game) => {
        this.game = game;
        this.gameURL = `${environment.url}/game/${this.game.id}/dashboard`;
      }
    });
  }

  selectTab(tab: GameDashboardTab): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        selectedTab: tab
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // do not trigger navigation
    });
  }

  goBack(): void {
    this.location.back();
  }
}

