import { TestBed } from '@angular/core/testing';

import { TruckerService } from './trucker.service';

describe('TruckerService', () => {
  let service: TruckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
