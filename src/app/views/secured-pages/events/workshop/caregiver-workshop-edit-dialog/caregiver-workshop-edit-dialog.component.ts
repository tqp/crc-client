import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-caregiver-workshop-edit-dialog',
  templateUrl: './caregiver-workshop-edit-dialog.component.html',
  styleUrls: ['./caregiver-workshop-edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CaregiverWorkshopEditDialogComponent implements OnInit {
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public caregiverWorkshopEditForm: FormGroup;

  public validationMessages = {
    'caregiverWorkshopId': [
      {type: 'required', message: 'A Caregiver is required'}
    ],
    'workshopName': [
      {type: 'required', message: 'A Workshop Name is required'}
    ],
    'workshopDate': [
      {type: 'required', message: 'A Workshop Date is required'}
    ]
  };

  constructor(private dialogRef: MatDialogRef<CaregiverWorkshopEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.caregiverWorkshopEditForm = this.formBuilder.group({
      caregiverWorkshopId: new FormControl({value: 0, disabled: true}),
      workshopName: new FormControl('', [Validators.required]),
      workshopDate: new FormControl(moment().format('DD-MMM-yyyy'), Validators.required)
    });

    // setTimeout(() => {
    //   this.relationSurnameField.nativeElement.focus();
    // }, 0);
  }

  // BUTTONS

  public delete(): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false,
      minWidth: '30%'
    });
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close(['delete', this.caregiverWorkshopEditForm.getRawValue()]);
      }
      this.confirmDialogRef = null;
    });
  }

  public save(): void {
    console.log('raw', this.caregiverWorkshopEditForm.getRawValue());
    this.dialogRef.close([this.data.action, this.caregiverWorkshopEditForm.getRawValue()]);
  }

}
