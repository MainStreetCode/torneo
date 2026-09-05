import { TableService } from './table.service';

describe('TableService', () => {
  let service: TableService;

  beforeEach(() => {
    service = new TableService({ add: () => undefined } as any, {} as any, {} as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
