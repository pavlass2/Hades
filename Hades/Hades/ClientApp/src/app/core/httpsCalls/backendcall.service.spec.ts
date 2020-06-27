import { TestBed } from '@angular/core/testing';

import { BackendcallService } from './backendcall.service';

describe('BackendcallService', () => {
  let service: BackendcallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendcallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
