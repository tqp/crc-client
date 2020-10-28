import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceReportByPaymentPeriodComponent } from './finance-report-by-payment-period.component';

describe('FinanceReportByPaymentPeriodComponent', () => {
  let component: FinanceReportByPaymentPeriodComponent;
  let fixture: ComponentFixture<FinanceReportByPaymentPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceReportByPaymentPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceReportByPaymentPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
