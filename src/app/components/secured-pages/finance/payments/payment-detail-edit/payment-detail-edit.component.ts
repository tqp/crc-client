import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Payment } from '../../../../../models/payment.model';
import { PaymentService } from '../../../../../services/finance/payment.service';
import { FormattingService } from '@tqp/services/formatting.service';

@Component({
  selector: 'app-payment-detail-edit',
  templateUrl: './payment-detail-edit.component.html',
  styleUrls: ['./payment-detail-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentDetailEditComponent implements OnInit {
  @ViewChild('paymentSurnameInputField', {static: false}) paymentSurnameInputField: ElementRef;
  public pageSource: string;
  public newRecord: boolean;
  public payment: Payment;
  public paymentEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  public validationMessages = {
    'paymentId': [
      {type: 'required', message: 'An ID is required.'}
    ],
    'paymentAmount': [
      {type: 'required', message: 'A Payment Amount is required.'}
    ],
    'paymentDate': [
      {type: 'required', message: 'A Payment Date is required.'}
    ]
  };

  constructor(private route: ActivatedRoute,
              private paymentService: PaymentService,
              private formattingService: FormattingService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const paymentId = params['id'];
        // console.log('paymentId', paymentId);
        this.getPaymentDetail(paymentId);
      } else {
        // Create new Person
        this.newRecord = true;
        this.payment = new Payment();
        this.payment.paymentId = null;
        setTimeout(() => {
          this.paymentSurnameInputField.nativeElement.focus();
        }, 0);
      }
    }).then();
  }

  private initializeForm(): void {
    this.paymentEditForm = this.formBuilder.group({
      paymentId: new FormControl(''),
      paymentAmount: new FormControl(''),
      paymentDate: new FormControl(''),
    });
  }

  private getPaymentDetail(paymentId: number): void {
    this.paymentService.getPaymentDetail(paymentId).subscribe(
      response => {
        this.payment = response;
        console.log('response', response);
        this.paymentEditForm.controls['paymentId'].patchValue(this.payment.paymentId);
        this.paymentEditForm.controls['paymentAmount'].patchValue(this.payment.paymentAmount);
        this.paymentEditForm.controls['paymentDate'].patchValue(this.formattingService.formatMySqlDateAsStandard(this.payment.paymentDate));
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public delete(paymentId: number): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paymentService.deletePayment(paymentId).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['payments/payment-list']).then();
          },
          error => {
            console.error('Error: ' + error.message);
          }
        );
      }
      this.confirmDialogRef = null;
    });
  }

  public save(): void {
    const payment = new Payment();
    // console.log('crudEditForm', this.paymentEditForm.value);
    payment.paymentId = this.paymentEditForm.value.paymentId;
    payment.paymentAmount = this.paymentEditForm.value.paymentAmount;
    payment.paymentDate = this.formattingService.formatStandardDateAsMySql(this.paymentEditForm.value.paymentDate);

    if (this.newRecord) {
      this.paymentService.createPayment(payment).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['payments/payment-detail', response.paymentId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.paymentService.updatePayment(payment).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['payments/payment-detail', response.paymentId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.payment.paymentId) {
      this.router.navigate(['payments/payment-detail', this.payment.paymentId]).then();
    } else {
      this.router.navigate(['payments/payment-list']).then();
    }
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.save();
    }
    if (event.key === 'Escape') {
      this.cancel();
    }
  }

}
