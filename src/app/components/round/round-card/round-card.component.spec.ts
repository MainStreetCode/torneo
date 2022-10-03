import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundCardComponent } from './round-card.component';

describe('RoundCardComponent', () => {
  let component: RoundCardComponent;
  let fixture: ComponentFixture<RoundCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
