import { TeamService } from './team.service';

describe('TeamService', () => {
  let service: TeamService;

  beforeEach(() => {
    service = new TeamService({ add: () => undefined } as any, {} as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
