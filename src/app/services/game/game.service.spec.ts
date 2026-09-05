import { of } from 'rxjs';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    service = new GameService({ add: () => undefined } as any, {
      collection: () => ({
        valueChanges: () => of([])
      })
    } as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns false when checking admin status for a missing game', (done) => {
    service.isUserAdmin('player-1', 'missing-game').subscribe({
      next: (isAdmin) => {
        expect(isAdmin).toBeFalse();
        done();
      }
    });
  });
});
