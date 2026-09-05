import { RoundService } from './round.service';

describe('RoundService', () => {
  let service: RoundService;

  beforeEach(() => {
    service = new RoundService({ add: () => undefined } as any, {} as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
