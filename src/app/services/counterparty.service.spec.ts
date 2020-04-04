import { TestBed } from '@angular/core/testing';

import { CounterpartyService } from './counterparty.service';

describe('CounterpartyService', () => {
  let service: CounterpartyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterpartyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
