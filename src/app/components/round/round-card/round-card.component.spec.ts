import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { GameService } from 'src/app/services/game/game.service';
import { RoundMediatorService } from 'src/app/services/round-mediator/round-mediator.service';

import { RoundCardComponent } from './round-card.component';

describe('RoundCardComponent', () => {
  let component: RoundCardComponent;
  let fixture: ComponentFixture<RoundCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundCardComponent ],
      providers: [
        { provide: GameService, useValue: { isCurrentUserAdmin: () => of(false) } },
        { provide: RoundMediatorService, useValue: { allTablesConfirmed: () => of(false), deleteRound: () => undefined } },
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of(undefined) }) } },
        { provide: Router, useValue: jasmine.createSpyObj<Router>('Router', ['navigateByUrl']) }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundCardComponent);
    component = fixture.componentInstance;
    component.round = {
      id: 'round-1',
      number: 1,
      byes: [],
      pointsConfirmed: false
    };
    component.gameId = 'game-1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
