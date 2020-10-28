import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceAddPaymentDialogComponent } from './finance-add-payment-dialog.component';

describe('FinanceAddPaymentDialogComponent', () => {
  let component: FinanceAddPaymentDialogComponent;
  let fixture: ComponentFixture<FinanceAddPaymentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceAddPaymentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceAddPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
