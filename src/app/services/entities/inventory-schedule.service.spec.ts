import { TestBed } from '@angular/core/testing';

import { InventoryScheduleService } from './inventory-schedule.service';

describe('InventoryScheduleService', () => {
  let service: InventoryScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
