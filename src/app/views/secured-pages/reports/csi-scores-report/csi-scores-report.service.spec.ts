import { TestBed } from '@angular/core/testing';

import { CsiScoresReportService } from './csi-scores-report.service';

describe('CsiScoresReportService', () => {
  let service: CsiScoresReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsiScoresReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
