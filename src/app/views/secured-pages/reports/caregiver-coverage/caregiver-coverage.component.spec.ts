import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverCoverageComponent } from './caregiver-coverage.component';

describe('CaregiverCoverageComponent', () => {
  let component: CaregiverCoverageComponent;
  let fixture: ComponentFixture<CaregiverCoverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaregiverCoverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
