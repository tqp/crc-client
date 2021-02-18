import { TestBed } from '@angular/core/testing';

import { CaregiverCoverageService } from './caregiver-coverage.service';

describe('CaregiverCoverageService', () => {
  let service: CaregiverCoverageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaregiverCoverageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
