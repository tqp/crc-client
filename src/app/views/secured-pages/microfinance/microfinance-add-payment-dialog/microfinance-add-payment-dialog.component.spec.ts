import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofinanceAddPaymentDialogComponent } from './microfinance-add-payment-dialog.component';

describe('MicrofinanceAddPaymentDialogComponent', () => {
  let component: MicrofinanceAddPaymentDialogComponent;
  let fixture: ComponentFixture<MicrofinanceAddPaymentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicrofinanceAddPaymentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrofinanceAddPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
