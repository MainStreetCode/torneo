import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { GameService } from 'src/app/services/game/game.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { GamePlayer } from '../game-player';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');

    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin$ = this.gameService.isCurrentUserAdmin(this.gameId);

    this.calculatePoints();
  }

  public delete(player: GamePlayer): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'dialog-container',
      data: {
        title: 'Delete Player',
        message: 'Are you sure you want to delete this player?',
        confirmButtonText: 'Yes'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.playerService.deletePlayer(player.uid, this.gameId);
      }
    });
  }

  public view(player: GamePlayer): void {
    this.router.navigateByUrl(`/game/${this.gameId}/player/${player.uid}`);
  }

  private calculatePoints(): void {
    this.totalPoints = 0;
    if (this.player.pointsForRound) {
      this.player.pointsForRound.forEach(
        (roundPoints) => {
          this.totalPoints += roundPoints.points;
        }
      );
    }
  }
}
