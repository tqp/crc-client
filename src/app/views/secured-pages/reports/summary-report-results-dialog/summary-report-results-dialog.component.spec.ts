import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryReportResultsDialogComponent } from './summary-report-results-dialog.component';

describe('SummaryReportResultsDialogComponent', () => {
  let component: SummaryReportResultsDialogComponent;
  let fixture: ComponentFixture<SummaryReportResultsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryReportResultsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryReportResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
