import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Caregiver } from '../../../../../models/people/caregiver.model';
import { Loan } from '../../../../../models/loan.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CaregiverService } from '../../../../../services/people/caregiver.service';
import { LoanService } from '../../../../../services/finance/loan.service';

@Component({
  selector: 'app-loan-detail-edit-dialog',
  templateUrl: './loan-detail-edit-dialog.component.html',
  styleUrls: ['./loan-detail-edit-dialog.component.scss']
})
export class LoanDetailEditDialogComponent implements OnInit {
  public loanEditForm: FormGroup;
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
    'loanAmount': [
      {type: 'required', message: 'A Loan Amount is required.'}
    ],
    'loanDescription': [
      {type: 'required', message: 'A Description is required.'}
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

  constructor(private dialogRef: MatDialogRef<LoanDetailEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private caregiverService: CaregiverService,
              private loanService: LoanService
  ) {
    this.getCaregiverList();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loanEditForm = this.formBuilder.group({
      caregiverId: new FormControl(0, [Validators.required]),
      loanAmount: new FormControl('', Validators.required),
      loanDescription: new FormControl('', Validators.required)
    });

    // setTimeout(() => {
    //   this.relationSurnameField.nativeElement.focus();
    // }, 0);
  }

  // Load Option Value Lists

  private getCaregiverList(): void {
    this.caregiverService.getCaregiverList().subscribe(
      (response: Caregiver[]) => {
        // console.log('response', response);
        this.caregiverList = response;
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
    this.dialogRef.close(this.loanEditForm.value);
  }

}
