import { GamePlayerService } from './game-player.service';
import { firstValueFrom } from 'rxjs';

describe('GamePlayerService', () => {
  let service: GamePlayerService;

  beforeEach(() => {
    service = new GamePlayerService({ add: () => undefined } as any, {} as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns an empty observable for non-empty search terms until search is implemented', (done) => {
    service.searchPlayers('alice').subscribe({
      next: (players) => {
        expect(players).toEqual([]);
        done();
      }
    });
  });

  it('patches only player profile fields', async () => {
    const update = jasmine.createSpy('update').and.returnValue(Promise.resolve());
    service = new GamePlayerService({ add: () => undefined } as any, createStore({ update }) as any);

    await firstValueFrom(service.updatePlayerProfile('player-1', 'game-1', {
      displayName: 'Angela',
      fixedTableNumber: 2
    }));

    expect(update).toHaveBeenCalledWith({
      displayName: 'Angela',
      fixedTableNumber: 2
    });
  });

  it('updates one round score inside the latest player document', async () => {
    const playerRef = {};
    const transaction = {
      get: jasmine.createSpy('get').and.returnValue(Promise.resolve({
        exists: true,
        data: () => ({
          pointsForRound: [
            { roundId: 'round-1', roundNumber: 1, points: 8 }
          ]
        })
      })),
      update: jasmine.createSpy('update')
    };
    service = new GamePlayerService(
      { add: () => undefined } as any,
      createStore({
        ref: playerRef,
        runTransaction: (callback) => callback(transaction)
      }) as any
    );

    await firstValueFrom(service.updatePlayerRoundPoints('player-1', 'game-1', {
      roundId: 'round-2',
      roundNumber: 2,
      points: 12
    }));

    expect(transaction.get).toHaveBeenCalledWith(playerRef as any);
    expect(transaction.update).toHaveBeenCalledWith(playerRef as any, {
      pointsForRound: [
        { roundId: 'round-1', roundNumber: 1, points: 8 },
        { roundId: 'round-2', roundNumber: 2, points: 12 }
      ]
    });
  });

  it('replaces an existing round score without dropping other rounds', async () => {
    const playerRef = {};
    const transaction = {
      get: jasmine.createSpy('get').and.returnValue(Promise.resolve({
        exists: true,
        data: () => ({
          pointsForRound: [
            { roundId: 'round-1', roundNumber: 1, points: 8 },
            { roundId: 'round-2', roundNumber: 2, points: 9 }
          ]
        })
      })),
      update: jasmine.createSpy('update')
    };
    service = new GamePlayerService(
      { add: () => undefined } as any,
      createStore({
        ref: playerRef,
        runTransaction: (callback) => callback(transaction)
      }) as any
    );

    await firstValueFrom(service.updatePlayerRoundPoints('player-1', 'game-1', {
      roundId: 'round-2',
      roundNumber: 2,
      points: 12
    }));

    expect(transaction.update).toHaveBeenCalledWith(playerRef as any, {
      pointsForRound: [
        { roundId: 'round-1', roundNumber: 1, points: 8 },
        { roundId: 'round-2', roundNumber: 2, points: 12 }
      ]
    });
  });
});

function createStore(options: {
  update?: jasmine.Spy;
  ref?: unknown;
  runTransaction?: (callback: (transaction: unknown) => Promise<void>) => Promise<void>;
}) {
  const playerDoc = {
    update: options.update ?? jasmine.createSpy('update').and.returnValue(Promise.resolve()),
    ref: options.ref ?? {}
  };
  const playersCollection = {
    doc: jasmine.createSpy('playerDoc').and.returnValue(playerDoc)
  };
  const gameDoc = {
    collection: jasmine.createSpy('playersCollection').and.returnValue(playersCollection)
  };
  const gamesCollection = {
    doc: jasmine.createSpy('gameDoc').and.returnValue(gameDoc)
  };

  return {
    collection: jasmine.createSpy('gamesCollection').and.returnValue(gamesCollection),
    firestore: {
      runTransaction: options.runTransaction ?? ((callback) => callback({
        get: () => Promise.resolve({ exists: true, data: () => ({}) }),
        update: () => undefined
      }))
    }
  };
}
