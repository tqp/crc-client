import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofinanceByPaymentPeriodComponent } from './microfinance-by-payment-period.component';

describe('MicrofinanceByPaymentPeriodComponent', () => {
  let component: MicrofinanceByPaymentPeriodComponent;
  let fixture: ComponentFixture<MicrofinanceByPaymentPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicrofinanceByPaymentPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrofinanceByPaymentPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
