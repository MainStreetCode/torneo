import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { TableService } from 'src/app/services/table/table.service';

import { TablesComponent } from './tables.component';

describe('TablesComponent', () => {
  let component: TablesComponent;
  let fixture: ComponentFixture<TablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablesComponent ],
      providers: [
        { provide: TableService, useValue: { getTableForPlayer: () => of(undefined) } },
        { provide: AuthService, useValue: { getCurrentUser: () => null } },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ gameId: 'game-1', roundId: 'round-1' }) } }
        },
        { provide: GamePlayerService, useValue: { getPlayer: () => of(undefined) } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablesComponent);
    component = fixture.componentInstance;
    component.tables = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
