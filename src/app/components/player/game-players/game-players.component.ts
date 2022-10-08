import { Component, Input, OnInit } from '@angular/core';
import { GamePlayer } from '../game-player';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { Router } from '@angular/router';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginDialogComponent } from '../../user/login/login-dialog/login-dialog-component';
import { User } from 'firebase/auth';
@Component({
  selector: 'app-game-players',
  templateUrl: './game-players.component.html',
  styleUrls: ['./game-players.component.css']
})
export class GamePlayersComponent implements OnInit {
  @Input() game?: Game;
  players: GamePlayer[] = [];
  isAdmin$ = of(false);
  isCurrentUserGamePlayer = false;
  currentUser: User;

  constructor(private playerService: GamePlayerService,
              private router: Router,
              private gameService: GameService,
              private authService: AuthService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    if (!this.game?.id) {
      return;
    }
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin$ = this.gameService.isCurrentUserAdmin(this.game.id);

    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.playersForGame(this.game.id).subscribe({
      next: (players) => {
        this.players = players;

        if (this.currentUser && this.players.find((player) => player.uid === this.currentUser.uid)) {
          this.isCurrentUserGamePlayer = true;
        } else {
          this.isCurrentUserGamePlayer = false;
        }
      }
    });
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
    this.authService.isLoggedIn$.subscribe({
      next: (loggedIn) => {
        // if user is logged in then add player to game
        if (loggedIn) {
          this.createPlayerFromCurrentUser();
        } else {
          this.showJoinDialog();
        }
      }
    });
  }

  private createPlayerFromCurrentUser(): void {
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
        });
  }

  private showJoinDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        title: 'Join Game',
        message: 'Before you can join a game, you must login first',
        confirmButtonText: 'Login'
    }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoginDialog();
      }
    });
  }

  private showLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '360px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
