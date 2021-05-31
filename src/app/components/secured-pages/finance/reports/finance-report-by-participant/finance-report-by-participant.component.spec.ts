import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceReportByParticipantComponent } from './finance-report-by-participant.component';

describe('FinanceReportByParticipantComponent', () => {
  let component: FinanceReportByParticipantComponent;
  let fixture: ComponentFixture<FinanceReportByParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceReportByParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceReportByParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
