import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayersComponent } from './components/player/players/players.component';
import { FormsModule } from '@angular/forms';
import { PlayerDetailComponent } from './components/player/player-detail/player-detail.component';
import { SystemMessagesComponent } from './components/system-messages/system-messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerSearchComponent } from './components/player/player-search/player-search.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { MatCardModule } from '@angular/material/card';
import { QRCodeModule } from 'angularx-qrcode';

import { TournamentDetailComponent } from './components/tournament/tournament-detail/tournament-detail.component';
import { TournamentsComponent } from './components/tournament/tournaments/tournaments.component';
import { UserComponent } from './components/user/user-detail/user.component';
import { LoginComponent } from './components/user/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    PlayerDetailComponent,
    SystemMessagesComponent,
    DashboardComponent,
    PlayerSearchComponent,
    TournamentsComponent,
    TournamentDetailComponent,
    UserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
