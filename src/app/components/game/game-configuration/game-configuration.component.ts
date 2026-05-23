import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { environment } from 'src/environments/environment';
import { ProgressDialogComponent } from '../../progress-dialog/progress-dialog.component';

@Component({
  selector: 'app-game-configuration',
  templateUrl: './game-configuration.component.html',
  styleUrls: ['./game-configuration.component.css']
})
export class GameConfigurationComponent implements OnInit, OnDestroy {
  public gameId: string;
  public game?: Game;
  public gameURL: string;
  public sectionName: string;
  public isAdmin$ = of(false);
  public isSaving = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService,
    private location: Location,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getGame();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getGame(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');

    if (!this.gameId) {
      return;
    }

    this.gameURL = `${environment.url}/#/game/${this.gameId}/dashboard`;
    const dialogRef = this.dialog.open(ProgressDialogComponent, {});

    this.subscriptions.push(
      this.gameService.getGame(this.gameId).subscribe({
        next: (game) => {
          if (!game) {
            dialogRef.close();
            return;
          }

          this.game = game;
          this.isAdmin$ = this.gameService.isCurrentUserAdmin(this.game.id);
          this.sectionName = `${game.name.toUpperCase()} Configuration`;
          dialogRef.close();
        }
      })
    );
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (!this.game || this.isSaving) {
      return;
    }

    this.isSaving = true;
    this.subscriptions.push(
      this.gameService.updateGame(this.game).subscribe({
        next: () => {
          this.isSaving = false;
          this.sectionName = `${this.game.name.toUpperCase()} Configuration`;
          this.snackBar.open('Game configuration saved.', 'Dismiss', {
            duration: 4000
          });
        },
        error: () => {
          this.isSaving = false;
          this.snackBar.open('Unable to save game configuration.', 'Dismiss', {
            duration: 5000
          });
        }
      })
    );
  }

  startGame(): void {
    if (this.game) {
      this.router.navigateByUrl(`/game/${this.game.id}/dashboard?selectedTab=1`);
    }
  }
}
