import { TestBed } from '@angular/core/testing';

import { StringExService } from './string-ex.service';

describe('StringExService', () => {
  let service: StringExService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringExService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
