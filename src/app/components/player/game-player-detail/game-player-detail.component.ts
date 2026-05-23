import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GameService } from 'src/app/services/game/game.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { GamePlayer } from '../game-player';

@Component({
  selector: 'app-game-player-detail',
  templateUrl: './game-player-detail.component.html',
  styleUrls: ['./game-player-detail.component.css']
})
export class GamePlayerDetailComponent implements OnInit, OnDestroy {
  @Input() player?: GamePlayer;
  @Input() gameId?: string;
  sectionName: string;
  isAdmin = false;
  isDisabled = true;
  isCurrentUserAdmin = false;
  isSaving = false;
  playerLoaded = false;
  totalPoints = 0;
  roundsPlayed = 0;
  initials = '?';
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private playerService: GamePlayerService,
    private location: Location,
    private gameService: GameService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPlayer();
    this.setDisabledState();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getPlayer(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    const playerId = this.route.snapshot.paramMap.get('playerId');

    this.subscriptions.push(
      this.playerService.getPlayer(playerId, this.gameId).subscribe({
        next: (player) => {
          this.playerLoaded = true;
          this.player = player;

          if (player) {
            this.sectionName = `${player.displayName.toUpperCase()} Details`;
            this.updatePlayerSummary();
          }
        }
      }),
      this.gameService.getGame(this.gameId).subscribe({
        next: (game) => {
          if (game?.adminIds && game.adminIds.find((adminId) => adminId === playerId)) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        }
      })
    );
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (!this.player || this.isSaving) {
      return;
    }

    this.isSaving = true;
    this.subscriptions.push(
      this.playerService.updatePlayer(this.player, this.gameId).subscribe({
        next: () => {
          this.isSaving = false;
          this.sectionName = `${this.player.displayName.toUpperCase()} Details`;
          this.updatePlayerSummary();
          this.snackBar.open('Player details saved.', 'Dismiss', {
            duration: 4000
          });
        },
        error: () => {
          this.isSaving = false;
          this.snackBar.open('Unable to save player details.', 'Dismiss', {
            duration: 5000
          });
        }
      })
    );
  }

  toggleIsAdmin(isAdmin: boolean): void {
    if (!this.isCurrentUserAdmin || !this.player) {
      return;
    }

    if (isAdmin) {
      this.gameService.addAdmin(this.gameId, this.player.uid);
      this.isAdmin = true;
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'dialog-container',
      data: {
        title: 'Remove Admin',
        message: `Remove admin access for ${this.player.displayName || 'this player'}?`,
        confirmButtonText: 'Remove'
      }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.gameService.deleteAdmin(this.gameId, this.player.uid);
          this.isAdmin = false;
          return;
        }

        this.isAdmin = true;
      })
    );
  }

  private setDisabledState(): void {
    this.subscriptions.push(
      this.gameService.isCurrentUserAdmin(this.gameId).subscribe({
        next: (isGameAdmin) => {
          const currentUser = this.authService.getCurrentUser();
          this.isCurrentUserAdmin = isGameAdmin

          // if current user is game admin or is this player then isDisabled = false
          if (currentUser && (currentUser.uid === this.player?.uid || isGameAdmin)) {
            this.isDisabled = false;
          }
        }
      })
    );
  }

  private updatePlayerSummary(): void {
    const pointsForRound = this.player?.pointsForRound ?? [];
    this.roundsPlayed = pointsForRound.length;
    this.totalPoints = pointsForRound.reduce((total, roundPoints) => total + roundPoints.points, 0);
    this.initials = this.getInitials(this.player?.displayName);
  }

  private getInitials(value: string): string {
    if (!value) {
      return '?';
    }

    const words = value.trim().split(/\s+/);
    const firstInitial = words[0]?.charAt(0) ?? '';
    const secondInitial = words.length > 1 ? words[1]?.charAt(0) ?? '' : '';
    return `${firstInitial}${secondInitial}`.toUpperCase();
  }
}
