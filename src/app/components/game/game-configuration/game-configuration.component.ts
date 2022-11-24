import { Dialog } from '@angular/cdk/dialog';
import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
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
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService,
    private location: Location,
    private dialog: MatDialog) {
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

    this.gameURL = `${environment.url}/game/${this.gameId}`;
    const dialogRef = this.dialog.open(ProgressDialogComponent, {});

    this.subscriptions.push(
      this.gameService.getGame(this.gameId).subscribe({
        next: (game) => {
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
    if (this.game) {
      this.gameService.updateGame(this.game);
    }
  }

  startGame(): void {
    this.router.navigateByUrl(`/game/${this.game.id}/dashboard?selectedTab=1`);
  }
}
