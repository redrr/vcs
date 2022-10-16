import { TestBed } from '@angular/core/testing';

import { SecurityGuardService } from './security-guard.service';

describe('SecurityGuardService', () => {
  let service: SecurityGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
