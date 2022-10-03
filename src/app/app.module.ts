import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GamePlayersComponent } from './components/player/game-players/game-players.component';
import { FormsModule } from '@angular/forms';
import { GamePlayerDetailComponent } from './components/player/game-player-detail/game-player-detail.component';
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

import { GameConfigurationComponent } from './components/game/game-configuration/game-configuration.component';
import { GamesComponent } from './components/game/games/games.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { LoginComponent } from './components/user/login/login.component';
import { GameDashboardComponent } from './components/game/game-dashboard/game-dashboard.component';
import { RoundsComponent } from './components/round/rounds/rounds.component';
import { RoundDetailComponent } from './components/round/round-detail/round-detail.component';
import { TableDetailComponent } from './components/table/table-detail/table-detail.component';
import { TeamComponent } from './components/team/team.component';
import { TeamPlayerComponent } from './components/team-player/team-player.component';
import { LoginDialogComponent } from './components/user/login/login-dialog/login-dialog-component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponentComponent } from './components/confirm-dialog-component/confirm-dialog-component.component';
import { TablesComponent } from './components/table/tables/tables/tables.component';
import { RoundCardComponent } from './components/round/round-card/round-card.component';

@NgModule({
  declarations: [
    AppComponent,
    GamePlayersComponent,
    GamePlayerDetailComponent,
    SystemMessagesComponent,
    DashboardComponent,
    PlayerSearchComponent,
    GamesComponent,
    GameConfigurationComponent,
    UserProfileComponent,
    LoginComponent,
    GameDashboardComponent,
    RoundsComponent,
    RoundDetailComponent,
    TableDetailComponent,
    TeamComponent,
    TeamPlayerComponent,
    LoginDialogComponent,
    ConfirmDialogComponentComponent,
    TablesComponent,
    RoundCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    QRCodeModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
