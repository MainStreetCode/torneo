import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import { LoginDialogComponent } from './components/user/login/login-dialog/login-dialog-component';
import { environment } from '../environments/environment';
import { GameService } from './services/game/game.service';
import { RoundService } from './services/round/round.service';

interface Breadcrumb {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Torneo';
  isLoggedIn$: Observable<boolean>;
  breadcrumbs: Breadcrumb[] = [{ label: 'Tournaments', url: '/games' }];
  currentGameId?: string;
  private subscriptions: Subscription[] = [];
  private routeContextSubscriptions: Subscription[] = [];
  private currentGameName?: string;
  private currentRoundNumber?: number;
  private currentRoutePath = '';
  private currentRoundId?: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              public dialog: MatDialog,
              private titleService: Title,
              private gameService: GameService,
              private roundService: RoundService) {

  }

  ngOnInit(): void {
    this.titleService.setTitle(environment.appTitle);
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.subscriptions.push(
      this.router.events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      ).subscribe(() => this.updateRouteContext())
    );
    this.updateRouteContext();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.clearRouteContextSubscriptions();
  }

  login(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      panelClass: 'dialog-container'
      // data: { null }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      })
    );
  }

  logout(): void {
    firebase.auth().signOut();
    this.goHome();
  }

  goHome(): void {
    this.router.navigateByUrl('');
  }

  userProfile(): void {
    this.router.navigateByUrl('userProfile');
  }

  private updateRouteContext(): void {
    this.clearRouteContextSubscriptions();

    const routeContext = this.getActiveRouteContext();
    this.currentGameId = routeContext.params.gameId;
    this.currentRoundId = routeContext.params.roundId;
    this.currentGameName = undefined;
    this.currentRoundNumber = undefined;
    this.currentRoutePath = routeContext.path;

    if (this.currentGameId) {
      this.routeContextSubscriptions.push(
        this.gameService.getGame(this.currentGameId).subscribe({
          next: (game) => {
            this.currentGameName = game?.name;
            this.updateBreadcrumbs();
          }
        })
      );
    }

    if (this.currentGameId && this.currentRoundId) {
      this.routeContextSubscriptions.push(
        this.roundService.getRound(this.currentRoundId, this.currentGameId).subscribe({
          next: (round) => {
            this.currentRoundNumber = round?.number;
            this.updateBreadcrumbs();
          }
        })
      );
    }

    this.updateBreadcrumbs();
  }

  private updateBreadcrumbs(): void {
    const breadcrumbs: Breadcrumb[] = [{ label: 'Tournaments', url: '/games' }];

    if (!this.currentGameId) {
      if (this.currentRoutePath === 'userProfile') {
        breadcrumbs.push({ label: 'Profile' });
      }
      this.breadcrumbs = breadcrumbs;
      return;
    }

    breadcrumbs.push({
      label: this.currentGameName || 'Tournament',
      url: `/game/${this.currentGameId}/dashboard`
    });

    if (this.currentRoutePath === 'game/:gameId/configuration') {
      breadcrumbs.push({ label: 'Setup' });
    } else if (this.currentRoutePath === 'game/:gameId/rounds') {
      breadcrumbs.push({ label: 'Rounds' });
    } else if (this.currentRoutePath === 'game/:gameId/round/:roundId') {
      breadcrumbs.push({ label: this.currentRoundNumber ? `Round ${this.currentRoundNumber}` : 'Round' });
    } else if (this.currentRoutePath === 'game/:gameId/player/:playerId') {
      breadcrumbs.push({ label: 'Player details' });
    }

    this.breadcrumbs = breadcrumbs;
  }

  private getActiveRouteContext(): { params: Record<string, string>; path: string } {
    const params: Record<string, string> = {};
    let activeRoute = this.route.root;

    Object.assign(params, activeRoute.snapshot.params);

    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
      Object.assign(params, activeRoute.snapshot.params);
    }

    return {
      params,
      path: activeRoute.snapshot.routeConfig?.path || ''
    };
  }

  private clearRouteContextSubscriptions(): void {
    this.routeContextSubscriptions.forEach((subscription) => subscription.unsubscribe());
    this.routeContextSubscriptions = [];
  }
}
