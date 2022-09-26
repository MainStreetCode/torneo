import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GamePlayerDetailComponent } from './components/player/game-player-detail/player-detail.component';
import { GamePlayersComponent } from './components/player/game-players/game-players.component';
import { GameConfigurationComponent } from './components/game/game-configuration/game-configuration.component';
import { GamesComponent } from './components/game/games/games.component';
import { LoginComponent } from './components/user/login/login.component';
import { GameDashboardComponent } from './components/game/game-dashboard/game-dashboard.component';


const routes: Routes = [
  { path: 'gamePlayers', component: GamePlayersComponent },
  { path: 'games', component: GamesComponent },
  { path: 'game/:gameId/player/:playerId', component: GamePlayerDetailComponent },
  { path: 'game/:gameId/dashboard', component: GameDashboardComponent },
  { path: 'game/:gameId/configuration', component: GameConfigurationComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
