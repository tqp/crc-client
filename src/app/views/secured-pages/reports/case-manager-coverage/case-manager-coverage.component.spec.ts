import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseManagerCoverageComponent } from './case-manager-coverage.component';

describe('CaseManagerCoverageComponent', () => {
  let component: CaseManagerCoverageComponent;
  let fixture: ComponentFixture<CaseManagerCoverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseManagerCoverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseManagerCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
