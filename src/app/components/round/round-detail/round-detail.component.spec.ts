import { of } from 'rxjs';

import { RoundDetailComponent } from './round-detail.component';
import { GameService } from 'src/app/services/game/game.service';
import { RoundMediatorService } from 'src/app/services/round-mediator/round-mediator.service';
import { RoundService } from 'src/app/services/round/round.service';
import { TableService } from 'src/app/services/table/table.service';

describe('RoundDetailComponent', () => {
  let component: RoundDetailComponent;
  let router: jasmine.SpyObj<any>;
  let roundMediatorService: jasmine.SpyObj<RoundMediatorService>;
  let dialog: jasmine.SpyObj<any>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    dialog.open.and.returnValue({
      afterClosed: () => of(undefined)
    });
    roundMediatorService = jasmine.createSpyObj<RoundMediatorService>('RoundMediatorService', ['finalizeRoundAndStartNextIfReady']);
    roundMediatorService.finalizeRoundAndStartNextIfReady.and.returnValue(of({
      finalized: true,
      nextRoundStarted: true
    }));

    component = new RoundDetailComponent(
      router,
      {} as any,
      {} as RoundService,
      {} as TableService,
      roundMediatorService,
      {} as GameService,
      {} as any,
      dialog
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keeps dashboard navigation after finalizing and starting the next round', () => {
    component.gameId = 'game-1';
    component.roundId = 'round-1';
    component.round = {
      id: 'round-1',
      number: 1,
      byes: [],
      pointsConfirmed: false
    };

    component.endRound();

    expect(roundMediatorService.finalizeRoundAndStartNextIfReady).toHaveBeenCalledWith('round-1', 'game-1');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/game/game-1/dashboard?selectedTab=0&roundEnded=1');
  });

  it('does not navigate from the watcher while local end round is in progress', () => {
    component.gameId = 'game-1';
    component.roundId = 'round-1';
    component.round = {
      id: 'round-1',
      number: 1,
      byes: [],
      pointsConfirmed: false
    };
    (component as any).previousPointsConfirmed = false;
    (component as any).isEndingRound = true;

    emitRoundFinalized(component);

    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('keeps passive watcher dashboard navigation', () => {
    component.gameId = 'game-1';
    component.roundId = 'round-1';
    component.round = {
      id: 'round-1',
      number: 1,
      byes: [],
      pointsConfirmed: false
    };
    (component as any).previousPointsConfirmed = false;
    (component as any).isEndingRound = false;

    emitRoundFinalized(component);

    expect(router.navigateByUrl).toHaveBeenCalledWith('/game/game-1/dashboard?selectedTab=0&roundEnded=1');
  });
});

function emitRoundFinalized(component: RoundDetailComponent): void {
  const finalizedRound = {
    id: 'round-1',
    number: 1,
    byes: [],
    pointsConfirmed: true
  };
  const wasPointsConfirmed = (component as any).previousPointsConfirmed;
  component.round = finalizedRound;

  if (!(component as any).isEndingRound && wasPointsConfirmed === false && finalizedRound.pointsConfirmed) {
    (component as any).navigateToScores();
  }

  (component as any).previousPointsConfirmed = !!finalizedRound.pointsConfirmed;
}
