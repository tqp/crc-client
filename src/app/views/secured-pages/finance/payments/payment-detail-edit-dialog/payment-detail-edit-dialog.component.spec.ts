import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailEditDialogComponent } from './payment-detail-edit-dialog.component';

describe('PaymentDetailEditDialogComponent', () => {
  let component: PaymentDetailEditDialogComponent;
  let fixture: ComponentFixture<PaymentDetailEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentDetailEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDetailEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
