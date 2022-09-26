import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameConfigurationComponent } from './game-configuration.component';

describe('GameSetupComponent', () => {
  let component: GameConfigurationComponent;
  let fixture: ComponentFixture<GameConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
