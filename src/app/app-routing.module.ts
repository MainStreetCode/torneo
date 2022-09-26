import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlayerDetailComponent } from './components/player/player-detail/player-detail.component';
import { PlayersComponent } from './components/player/players/players.component';
import { GameDetailComponent } from './components/game/game-detail/game-detail.component';
import { GamesComponent } from './components/game/games/games.component';
import { LoginComponent } from './components/user/login/login.component';


const routes: Routes = [  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'players', component: PlayersComponent },
  { path: 'games', component: GamesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'game/:gameId/player/:playerId', component: PlayerDetailComponent },
  { path: 'game/:gameId', component: GameDetailComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }