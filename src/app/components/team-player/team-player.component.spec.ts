import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth/auth.service';

import { TeamPlayerComponent } from './team-player.component';

describe('TeamPlayerComponent', () => {
  let component: TeamPlayerComponent;
  let fixture: ComponentFixture<TeamPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamPlayerComponent ],
      providers: [
        { provide: AuthService, useValue: { getCurrentUser: () => null } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamPlayerComponent);
    component = fixture.componentInstance;
    component.teamPlayer = {
      player: {
        uid: 'player-1',
        displayName: 'Player 1',
        pointsForRound: []
      } as any,
      points: 0,
      isPointsConfirmed: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
