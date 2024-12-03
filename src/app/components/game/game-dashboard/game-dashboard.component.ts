import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { environment } from 'src/environments/environment';
import { GameDashboardTab } from './game-dashboard-tab';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.css']
})

export class GameDashboardComponent implements OnInit, OnDestroy {
  @Input() game?: Game;
  sectionName: string;
  gameURL: string;
  selectedTab = GameDashboardTab.Players;
  readonly playersTab = GameDashboardTab.Players;
  readonly roundsTab = GameDashboardTab.Rounds;
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private gameService: GameService, private location: Location, private router: Router) {

  }

  ngOnInit(): void {
    this.getGame();
    this.parseURLParams();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private parseURLParams(): void {
    this.route.queryParams
      .subscribe(params => {
        const tab = params.selectedTab;
        if (tab) {
          this.selectedTab = tab;
        }
      }
      );
  }

  private getGame(): void {
    const id = this.route.snapshot.paramMap.get('gameId');

    if (!id) {
      return;
    }

    this.subscriptions.push(
      this.gameService.getGame(id).subscribe({
        next: (game) => {
          this.game = game;
          this.gameURL = `${environment.url}/game/${this.game.id}/dashboard`;
          this.sectionName = `${this.game.name.toUpperCase()} Dashboard`;
          console.log(this.gameURL);
        }
      })
    );
  }

  selectTab(tabNumber: number): void {
    this.selectedTab = tabNumber as unknown as GameDashboardTab;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        selectedTab: this.selectedTab
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

