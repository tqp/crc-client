import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CaregiverWorkshopService } from '../caregiver-workshop.service';
import { CaregiverWorkshop } from '../../../../../models/caregiver-workshop.model';
import { FormattingService } from '@tqp/services/formatting.service';
import * as moment from 'moment';

@Component({
  selector: 'app-caregiver-workshop-edit-dialog',
  templateUrl: './caregiver-workshop-edit-dialog.component.html',
  styleUrls: ['./caregiver-workshop-edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CaregiverWorkshopEditDialogComponent implements OnInit {
  @ViewChild('workshopNameField', {static: false}) public workshopNameField: ElementRef;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public dataLoaded: boolean = false;
  public caregiverWorkshopEditForm: FormGroup;
  public caregiverWorkshop: CaregiverWorkshop;

  public validationMessages = {
    'caregiverWorkshopId': [
      {type: 'required', message: 'A Caregiver Workshop ID is required'}
    ],
    'caregiverId': [
      {type: 'required', message: 'A Caregiver ID is required'}
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
              private workshopService: CaregiverWorkshopService,
              private formattingService: FormattingService,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog
  ) {
    if (this.data.action === 'update') {
      this.getCaregiverWorkshopDetail(this.data.caregiverWorkshopId);
    } else {
      this.dataLoaded = true;
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.caregiverWorkshopEditForm = this.formBuilder.group({
      caregiverWorkshopId: new FormControl({value: this.data.caregiverWorkshopId, disabled: true}),
      caregiverId: new FormControl({value: this.data.caregiverId, disabled: true}, [Validators.required]),
      workshopName: new FormControl('', [Validators.required]),
      workshopDate: new FormControl(moment().format('DD-MMM-yyyy'), Validators.required)
    });
    setTimeout(() => {
      this.workshopNameField.nativeElement.focus();
    }, 0);
  }

  private getCaregiverWorkshopDetail(caregiverWorkshopId: number): void {
    this.workshopService.getCaregiverWorkshopDetail(caregiverWorkshopId).subscribe(
      response => {
        // console.log('response', response);
        this.caregiverWorkshop = response;
        this.caregiverWorkshop.workshopDate = this.formattingService.formatMySqlDateAsStandard(this.caregiverWorkshop.workshopDate);
        this.caregiverWorkshopEditForm.controls['caregiverWorkshopId'].patchValue(this.caregiverWorkshop.caregiverWorkshopId);
        this.caregiverWorkshopEditForm.controls['caregiverId'].patchValue(this.caregiverWorkshop.caregiverId);
        this.caregiverWorkshopEditForm.controls['workshopName'].patchValue(this.caregiverWorkshop.workshopName);
        this.caregiverWorkshopEditForm.controls['workshopDate'].patchValue(this.caregiverWorkshop.workshopDate);
        this.dataLoaded = true;
      },
      error => {
        console.error('Error: ', error);
      }
    );
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
    // console.log('raw', this.caregiverWorkshopEditForm.getRawValue());
    this.dialogRef.close([this.data.action, this.caregiverWorkshopEditForm.getRawValue()]);
  }

}
