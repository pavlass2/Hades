import { TestBed } from '@angular/core/testing';

import { NameSetGuard } from './name-set.guard';

describe('NameSetGuard', () => {
  let guard: NameSetGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NameSetGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
