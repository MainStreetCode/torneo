import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GamePlayer } from '../game-player';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { Router } from '@angular/router';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { of, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginDialogComponent } from '../../user/login/login-dialog/login-dialog-component';
import { User } from 'firebase/auth';
import { RoundService } from 'src/app/services/round/round.service';
@Component({
  selector: 'app-game-players',
  templateUrl: './game-players.component.html',
  styleUrls: ['./game-players.component.css']
})
export class GamePlayersComponent implements OnInit, OnDestroy {
  @Input() game?: Game;
  players: GamePlayer[] = [];
  isAdmin$ = of(false);  
  isGameJoinable$ = of(true);
  currentUser: User;
  private subscriptions: Subscription[] = [];

  constructor(private playerService: GamePlayerService,
              private gameService: GameService,
              private authService: AuthService,
              private roundService: RoundService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    if (!this.game?.id) {
      return;
    }
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin$ = this.gameService.isCurrentUserAdmin(this.game.id);

    this.getPlayers();

    this.subscriptions.push(
      this.authService.isLoggedIn$.subscribe({
        next: (loggedIn) => {
          if (loggedIn) {
            this.checkIsGameJoinable();
          }
        }
      })
    );
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

          this.checkIsGameJoinable();
        }
      })
    );
  }

  private checkIsGameJoinable(): void {
    this.currentUser = this.authService.getCurrentUser();
    // if the current user is one of the players in the game, then disable the join button
    if (this.currentUser && this.players.find((player) => player.uid === this.currentUser.uid)) {
      this.isGameJoinable$ = of(false);
    }

    // if the game has already started, then the game is not joinable
    this.subscriptions.push(
      this.roundService.roundsForGame(this.game.id).subscribe({
        next: (rounds) => {
          if (rounds.length > 0) {
            this.isGameJoinable$ = of(false);
          }
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

    this.addPlayerToGame({ displayName } as GamePlayer);
  }

  addPlayerToGame(player: GamePlayer): void {
    if (this.game) {
      this.playerService.addPlayer(player, this.game.id);
    }
  }

  joinGame(): void {
    this.subscriptions.push(
      this.authService.isLoggedIn$.subscribe({
        next: (loggedIn) => {
          // if user is logged in then add player to game
          if (loggedIn) {
            this.createPlayerFromCurrentUser();
          } else {
            this.showJoinDialog();
          }
        }
      })
    );
  }

  private createPlayerFromCurrentUser(): void {
    this.subscriptions.push(
      this.authService.currentUser$.subscribe({
        next: (currentUser) => {
          if (currentUser) {
            const newPlayer = {
              uid: currentUser.uid,
              displayName: currentUser.displayName
            } as unknown as GamePlayer;

            this.addPlayerToGame(newPlayer);
          }
        }
      })
    );
  }

  private showJoinDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'dialog-container',
      data: {
        title: 'Join Game',
        message: 'Before you can join a game, you must login first',
        confirmButtonText: 'Login'
    }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.showLoginDialog();
        }
      })
    );
  }

  private showLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      panelClass: 'dialog-container',
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      })
    );
  }
}
