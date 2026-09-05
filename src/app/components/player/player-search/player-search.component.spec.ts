import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';

import { PlayerSearchComponent } from './player-search.component';

describe('PlayerSearchComponent', () => {
  let component: PlayerSearchComponent;
  let fixture: ComponentFixture<PlayerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerSearchComponent ],
      providers: [
        { provide: GamePlayerService, useValue: { searchPlayers: () => of([]) } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
