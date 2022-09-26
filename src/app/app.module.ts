import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GamePlayersComponent } from './components/player/game-players/game-players.component';
import { FormsModule } from '@angular/forms';
import { GamePlayerDetailComponent } from './components/player/game-player-detail/player-detail.component';
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

import { GameDetailComponent } from './components/game/game-detail/game-detail.component';
import { GamesComponent } from './components/game/games/games.component';
import { UserComponent } from './components/user/user-detail/user.component';
import { LoginComponent } from './components/user/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    GamePlayersComponent,
    GamePlayerDetailComponent,
    SystemMessagesComponent,
    DashboardComponent,
    PlayerSearchComponent,
    GamesComponent,
    GameDetailComponent,
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
