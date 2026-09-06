import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Game } from 'src/app/services/game/game';
import { GameService } from 'src/app/services/game/game.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { Round } from 'src/app/services/round/round';
import { RoundService } from 'src/app/services/round/round.service';

import { GamePlayersComponent } from './game-players.component';

describe('PlayersComponent', () => {
  let component: GamePlayersComponent;
  let fixture: ComponentFixture<GamePlayersComponent>;
  let addPlayerSpy: jasmine.Spy;
  let rounds$: BehaviorSubject<Round[]>;

  beforeEach(async () => {
    addPlayerSpy = jasmine.createSpy('addPlayer');
    rounds$ = new BehaviorSubject<Round[]>([]);

    await TestBed.configureTestingModule({
      declarations: [ GamePlayersComponent ],
      providers: [
        { provide: GamePlayerService, useValue: { playersForGame: () => of([]), addPlayer: addPlayerSpy } },
        { provide: GameService, useValue: { isCurrentUserAdmin: () => of(false) } },
        {
          provide: AuthService,
          useValue: {
            getCurrentUser: () => null,
            isLoggedIn$: of(false),
            currentUser$: of(null)
          }
        },
        { provide: RoundService, useValue: { roundsForGame: () => rounds$.asObservable() } },
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of(undefined) }) } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlayersComponent);
    component = fixture.componentInstance;
    component.game = {
      id: 'game-1',
      name: 'Game',
      adminIds: [],
      numberOfRounds: 3,
      createdDate: new Date(),
      byePool: []
    } as Game;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('locks player adds when rounds already exist', () => {
    rounds$.next([{ id: 'round-1', number: 1, byes: [], pointsConfirmed: false } as Round]);

    expect(component.hasRoundsStarted).toBeTrue();
  });

  it('does not add a player after rounds have started', () => {
    rounds$.next([{ id: 'round-1', number: 1, byes: [], pointsConfirmed: false } as Round]);

    component.add('Late Player');

    expect(addPlayerSpy).not.toHaveBeenCalled();
  });
});
