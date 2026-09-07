import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GamePlayer } from '../game-player';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { of, Subscription } from 'rxjs';
import { RoundService } from 'src/app/services/round/round.service';
@Component({
  selector: 'app-game-players',
  templateUrl: './game-players.component.html',
  styleUrls: ['./game-players.component.css']
})
export class GamePlayersComponent implements OnInit, OnDestroy {
  @Input() game?: Game;
  @Input() showHeader = true;
  @Input() showAddPlayerHeader = true;
  players: GamePlayer[] = [];
  isAdmin$ = of(false);  
  hasRoundsStarted = false;
  hasScores = false;
  private subscriptions: Subscription[] = [];

  constructor(private playerService: GamePlayerService,
              private gameService: GameService,
              private roundService: RoundService) { }

  ngOnInit(): void {
    if (!this.game?.id) {
      return;
    }
    this.isAdmin$ = this.gameService.isCurrentUserAdmin(this.game.id);

    this.getPlayers();
    this.watchRoundsStarted();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getPlayers(): void {
    this.subscriptions.push(
      this.playerService.playersForGame(this.game.id).subscribe({
        next: (players) => {
          this.players = players.sort((a, b) => {
            const playerAPoints = this.calculateTotalPoints(a);
            const playerBPoints = this.calculateTotalPoints(b);

            return playerBPoints - playerAPoints;
          });
          this.hasScores = players.some((player) => (player.pointsForRound?.length ?? 0) > 0);
        }
      })
    );
  }

  private watchRoundsStarted(): void {
    this.subscriptions.push(
      this.roundService.roundsForGame(this.game.id).subscribe({
        next: (rounds) => {
          this.hasRoundsStarted = rounds.length > 0;
        }
      })
    );
  }

  private calculateTotalPoints(player: GamePlayer): number {
    let totalPoints = 0;
    if (player.pointsForRound) {
      player.pointsForRound.forEach(
        (roundPoints) => {
          totalPoints += roundPoints.points;
        }
      );
    }
    return totalPoints;
  }

  add(displayName: string): void {
    displayName = displayName.trim();

    if (!displayName) { return; }
    if (this.hasRoundsStarted) { return; }

    this.addPlayerToGame({ displayName } as GamePlayer);
  }

  addPlayerToGame(player: GamePlayer): void {
    if (this.game && !this.hasRoundsStarted) {
      this.playerService.addPlayer(player, this.game.id);
    }
  }
}
