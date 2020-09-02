import { TestBed } from '@angular/core/testing';

import { TierTypeService } from './tier-type.service';

describe('TierTypeService', () => {
  let service: TierTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TierTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
