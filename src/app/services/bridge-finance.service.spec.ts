import { TestBed } from '@angular/core/testing';

import { BridgeFinanceService } from './bridge-finance.service';

describe('BridgeFinanceService', () => {
  let service: BridgeFinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BridgeFinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
