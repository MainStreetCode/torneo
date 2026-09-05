import { GamePlayerService } from './game-player.service';

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
});
