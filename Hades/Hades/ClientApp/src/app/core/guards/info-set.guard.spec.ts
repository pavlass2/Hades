import { TestBed } from '@angular/core/testing';

import { InfoSetGuard } from './info-set.guard';

describe('InfoSetGuard', () => {
  let guard: InfoSetGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InfoSetGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
