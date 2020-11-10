import { TestBed } from '@angular/core/testing';

import { ImpairmentTypeService } from './impairment-type.service';

describe('ImpairmentTypeService', () => {
  let service: ImpairmentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpairmentTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
