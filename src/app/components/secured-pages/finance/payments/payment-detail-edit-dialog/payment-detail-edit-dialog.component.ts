import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Caregiver } from '../../../../../models/people/caregiver.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CaregiverService } from '../../../../../services/people/caregiver.service';
import { Loan } from '../../../../../models/loan.model';
import { LoanService } from '../../../../../services/finance/loan.service';

@Component({
  selector: 'app-payment-detail-edit-dialog',
  templateUrl: './payment-detail-edit-dialog.component.html',
  styleUrls: ['./payment-detail-edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentDetailEditDialogComponent implements OnInit {
  public paymentEditForm: FormGroup;
  public caregiverList: Caregiver[];
  public loanList: Loan[] = [];
  public caregiverId: number;

  public temp: number = 0;
  public optionDisabled: boolean = true;

  public validationMessages = {
    'caregiverId': [
      {type: 'required', message: 'A Caregiver is required.'},
      {type: 'validateNonZeroValue', message: 'You must select a Caregiver.'}
    ],
    'loanId': [
      {type: 'required', message: 'A Loan is required.'},
      {type: 'validateNonZeroValue', message: 'You must select a loan.'}
    ],
    'paymentDate': [
      {type: 'required', message: 'A Payment Date is required.'}
    ],
    'paymentAmount': [
      {type: 'required', message: 'A Payment Amount is required.'}
    ],
  };

  static validateNonZeroValue(fc: FormControl) {
    // This is just an example of a client-side validation
    console.log('fc', fc.value);
    if (fc.value === 0) {
      console.log('here');
      return ({validateNonZeroValue: true});
    } else {
      return null;
    }
  }

  constructor(private dialogRef: MatDialogRef<PaymentDetailEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private caregiverService: CaregiverService,
              private loanService: LoanService
  ) {
    this.getCaregiverWithLoanList();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.paymentEditForm = this.formBuilder.group({
      caregiverId: new FormControl(0, [Validators.required]),
      loanId: new FormControl({value: 0, disabled: true}, [Validators.required]),
      paymentDate: new FormControl('', Validators.required),
      paymentAmount: new FormControl('', Validators.required)
    });

    // setTimeout(() => {
    //   this.relationSurnameField.nativeElement.focus();
    // }, 0);
  }

  // Load Option Value Lists

  private getCaregiverWithLoanList(): void {
    this.caregiverService.getCaregiverWithLoanList().subscribe(
      (response: Caregiver[]) => {
        console.log('response', response);
        this.caregiverList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public caregiverChanged(event: any): void {
    const caregiverId = event.target.value;
    console.log('caregiverChanged', caregiverId);
    if (caregiverId > 0) {
      this.paymentEditForm.get('loanId').enable();
    } else {
      this.paymentEditForm.get('loanId').disable();
    }
    this.loanService.getLoanListByCaregiverId(caregiverId).subscribe(
      (response: Loan[]) => {
        console.log('response', response);
        this.loanList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public reset(): void {
    console.log('reset');
  }

  public save(): void {
    this.dialogRef.close(this.paymentEditForm.value);
  }

}
