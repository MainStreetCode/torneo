import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlayerDetailComponent } from './components/player/player-detail/player-detail.component';
import { PlayersComponent } from './components/player/players/players.component';
import { TournamentDetailComponent } from './components/tournament/tournament-detail/tournament-detail.component';
import { TournamentsComponent } from './components/tournament/tournament-list/tournaments.component';


const routes: Routes = [  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'players', component: PlayersComponent },
  { path: 'tournaments', component: TournamentsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tournament/:tournamentId/player/:playerId', component: PlayerDetailComponent },
  { path: 'tournament/:tournamentId', component: TournamentDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }