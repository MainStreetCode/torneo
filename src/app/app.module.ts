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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';

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
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TablesComponent } from './components/table/tables/tables/tables.component';
import { RoundCardComponent } from './components/round/round-card/round-card.component';
import { PlayerCardComponent } from './components/player/player-card/player-card.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProgressDialogComponent } from './components/progress-dialog/progress-dialog.component';

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
    ConfirmDialogComponent,
    TablesComponent,
    RoundCardComponent,
    PlayerCardComponent,
    SectionHeaderComponent,
    ProgressDialogComponent
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
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    QRCodeModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
