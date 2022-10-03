import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { GameService } from 'src/app/services/game/game.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { GamePlayer } from '../game-player';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit {
  @Input() player: GamePlayer;
  gameId: string;
  isAdmin$ = of(false);
  currentUser: User;
  totalPoints = 0;

  constructor(
    private playerService: GamePlayerService,
    private gameService: GameService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');

    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin$ = this.gameService.isCurrentUserAdmin(this.gameId);

    this.calculatePoints();
  }

  calculatePoints(): void {
    this.totalPoints = 0;
    if (this.player.pointsForRound) {
      this.player.pointsForRound.forEach(
        (roundPoints) => {
          this.totalPoints += roundPoints.points;
        }
      );
    }
  }

  delete(player: GamePlayer): void {
    this.playerService.deletePlayer(player.uid, this.gameId);
  }

  view(player: GamePlayer): void {
    this.router.navigateByUrl(`/game/${this.gameId}/player/${player.uid}`);
  }
}
