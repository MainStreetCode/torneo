import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePlayerDetailComponent } from './components/player/game-player-detail/game-player-detail.component';
import { GamePlayersComponent } from './components/player/game-players/game-players.component';
import { GameConfigurationComponent } from './components/game/game-configuration/game-configuration.component';
import { GamesComponent } from './components/game/games/games.component';
import { LoginComponent } from './components/user/login/login.component';
import { GameDashboardComponent } from './components/game/game-dashboard/game-dashboard.component';
import { RoundsComponent } from './components/round/rounds/rounds.component';
import { RoundDetailComponent } from './components/round/round-detail/round-detail.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'games', component: GamesComponent },
  { path: 'gamePlayers', component: GamePlayersComponent },
  { path: 'game/:gameId/player/:playerId', component: GamePlayerDetailComponent },
  { path: 'game/:gameId/dashboard', component: GameDashboardComponent },
  { path: 'game/:gameId/configuration', component: GameConfigurationComponent },
  { path: 'game/:gameId/rounds', component: RoundsComponent },
  { path: 'game/:gameId/round/:roundId', component: RoundDetailComponent },
  { path: 'userProfile', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
