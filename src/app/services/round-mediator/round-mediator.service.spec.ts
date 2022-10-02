import { TestBed } from '@angular/core/testing';

import { RoundMediatorService } from './round-mediator.service';

describe('RoundMediatorService', () => {
  let service: RoundMediatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoundMediatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
