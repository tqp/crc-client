import { TestBed } from '@angular/core/testing';

import { StudentSponsorLetterService } from './student-sponsor-letter.service';

describe('StudentSponsorLetterService', () => {
  let service: StudentSponsorLetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentSponsorLetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
