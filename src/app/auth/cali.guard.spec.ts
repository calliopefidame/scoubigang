import { TestBed } from '@angular/core/testing';

import { CALIGuard } from './cali.guard';

describe('CALIGuard', () => {
  let guard: CALIGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CALIGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
