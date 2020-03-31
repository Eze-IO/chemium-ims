import { TestBed } from '@angular/core/testing';

import { RestAPIServiceService } from './rest-apiservice.service';

describe('RestAPIServiceService', () => {
  let service: RestAPIServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestAPIServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
