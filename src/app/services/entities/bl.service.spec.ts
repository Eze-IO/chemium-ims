import { TestBed } from '@angular/core/testing';

import { BLService } from './bl.service';

describe('BLService', () => {
  let service: BLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
