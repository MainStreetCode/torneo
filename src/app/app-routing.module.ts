import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GamePlayerDetailComponent } from './components/player/game-player-detail/player-detail.component';
import { GamePlayersComponent } from './components/player/game-players/game-players.component';
import { GameDetailComponent } from './components/game/game-detail/game-detail.component';
import { GamesComponent } from './components/game/games/games.component';
import { LoginComponent } from './components/user/login/login.component';


const routes: Routes = [  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'gamePlayers', component: GamePlayersComponent },
  { path: 'games', component: GamesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'game/:gameId/player/:playerId', component: GamePlayerDetailComponent },
  { path: 'game/:gameId', component: GameDetailComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }