import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GameService } from 'src/app/services/game/game.service';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { TableService } from 'src/app/services/table/table.service';
import { Table } from '../../table';

import { TablesComponent } from './tables.component';

describe('TablesComponent', () => {
  let component: TablesComponent;
  let fixture: ComponentFixture<TablesComponent>;
  let tableService: jasmine.SpyObj<TableService>;
  let authService: jasmine.SpyObj<AuthService>;
  let gameService: jasmine.SpyObj<GameService>;
  let gamePlayerService: jasmine.SpyObj<GamePlayerService>;
  let currentUser: { uid: string } | undefined;
  let loginState: BehaviorSubject<boolean>;

  beforeEach(async () => {
    tableService = jasmine.createSpyObj<TableService>('TableService', ['getTableForPlayer']);
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['getCurrentUser']);
    gameService = jasmine.createSpyObj<GameService>('GameService', ['isCurrentUserAdmin']);
    gamePlayerService = jasmine.createSpyObj<GamePlayerService>('GamePlayerService', ['getPlayer']);
    currentUser = undefined;
    loginState = new BehaviorSubject<boolean>(true);

    tableService.getTableForPlayer.and.returnValue(of(undefined));
    authService.getCurrentUser.and.callFake(() => currentUser as never);
    Object.defineProperty(authService, 'isLoggedIn$', { get: () => loginState.asObservable() });
    gameService.isCurrentUserAdmin.and.returnValue(of(false));
    gamePlayerService.getPlayer.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      declarations: [ TablesComponent ],
      providers: [
        { provide: TableService, useValue: tableService },
        { provide: AuthService, useValue: authService },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ gameId: 'game-1', roundId: 'round-1' }) } }
        },
        { provide: GameService, useValue: gameService },
        { provide: GamePlayerService, useValue: gamePlayerService }
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

  it('defaults a non-admin player to their own table', () => {
    const tables = createTables();
    currentUser = { uid: 'player-1' };
    tableService.getTableForPlayer.and.returnValue(of(tables.find((table) => table.id === 'table-2')));
    gamePlayerService.getPlayer.and.returnValue(of({ uid: 'player-1', displayName: 'Angela', pointsForRound: [] } as never));

    fixture = TestBed.createComponent(TablesComponent);
    component = fixture.componentInstance;
    component.tables = tables;
    fixture.detectChanges();

    expect(component.isUserPlayer).toBeTrue();
    expect(component.isUserAdmin).toBeFalse();
    expect(component.isDataFiltered).toBeTrue();
    expect(component.filteredTables.map((table) => table.id)).toEqual(['table-2']);
  });

  it('keeps an admin player on all tables by default', () => {
    const tables = createTables();
    currentUser = { uid: 'player-1' };
    gameService.isCurrentUserAdmin.and.returnValue(of(true));
    tableService.getTableForPlayer.and.returnValue(of(tables.find((table) => table.id === 'table-2')));
    gamePlayerService.getPlayer.and.returnValue(of({ uid: 'player-1', displayName: 'Angela', pointsForRound: [] } as never));

    fixture = TestBed.createComponent(TablesComponent);
    component = fixture.componentInstance;
    component.tables = tables;
    fixture.detectChanges();

    expect(component.isUserPlayer).toBeTrue();
    expect(component.isUserAdmin).toBeTrue();
    expect(component.isDataFiltered).toBeFalse();
    expect(component.filteredTables.map((table) => table.id)).toEqual(['table-1', 'table-2']);
  });

  it('lets a default-filtered player expand back to all tables', () => {
    const tables = createTables();
    currentUser = { uid: 'player-1' };
    tableService.getTableForPlayer.and.returnValue(of(tables.find((table) => table.id === 'table-2')));
    gamePlayerService.getPlayer.and.returnValue(of({ uid: 'player-1', displayName: 'Angela', pointsForRound: [] } as never));

    fixture = TestBed.createComponent(TablesComponent);
    component = fixture.componentInstance;
    component.tables = tables;
    fixture.detectChanges();

    component.filterTables();

    expect(component.isDataFiltered).toBeFalse();
    expect(component.filteredTables.map((table) => table.id)).toEqual(['table-1', 'table-2']);
  });

  it('applies the player default filter when auth resolves after init', () => {
    const tables = createTables();
    tableService.getTableForPlayer.and.returnValue(of(tables.find((table) => table.id === 'table-2')));
    gamePlayerService.getPlayer.and.returnValue(of({ uid: 'player-1', displayName: 'Angela', pointsForRound: [] } as never));

    component.tables = tables;
    component.ngOnChanges();
    currentUser = { uid: 'player-1' };
    loginState.next(true);

    expect(component.isUserPlayer).toBeTrue();
    expect(component.isUserAdmin).toBeFalse();
    expect(component.isDataFiltered).toBeTrue();
    expect(component.filteredTables.map((table) => table.id)).toEqual(['table-2']);
  });
});

function createTables(): Table[] {
  return [
    { id: 'table-2', number: 2, name: 'Table 2', playerIds: [], pointsConfirmed: false },
    { id: 'table-1', number: 1, name: 'Table 1', playerIds: [], pointsConfirmed: false }
  ];
}
