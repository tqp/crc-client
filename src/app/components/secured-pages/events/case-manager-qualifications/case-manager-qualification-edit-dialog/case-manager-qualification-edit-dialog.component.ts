import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormattingService } from '@tqp/services/formatting.service';
import * as moment from 'moment';
import { CaseManagerQualificationService } from '../../../../../services/events/case-manager-qualification.service';
import { CaseManagerQualification } from '../../../../../models/case-manager-qualification.model';

@Component({
  selector: 'app-case-manager-qualification-edit-dialog',
  templateUrl: './case-manager-qualification-edit-dialog.component.html',
  styleUrls: ['./case-manager-qualification-edit-dialog.component.css']
})
export class CaseManagerQualificationEditDialogComponent implements OnInit {
  @ViewChild('qualificationInstitutionField', {static: false}) public qualificationInstitutionField: ElementRef;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public dataLoaded: boolean = false;
  public caseManagerQualificationEditForm: FormGroup;
  public caseManagerQualification: CaseManagerQualification;

  public validationMessages = {
    'caseManagerQualificationId': [
      {type: 'required', message: 'A Case Manager Qualification ID is required'}
    ],
    'caseManagerId': [
      {type: 'required', message: 'A Case Manager ID is required'}
    ],
    'qualificationInstitution': [],
    'qualificationName': [
      {type: 'required', message: 'A Qualification Name is required'}
    ]
  };

  constructor(private dialogRef: MatDialogRef<CaseManagerQualificationEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private qualificationService: CaseManagerQualificationService,
              private formattingService: FormattingService,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog
  ) {
    if (this.data.action === 'update') {
      this.getCaseManagerQualificationDetail(this.data.caseManagerQualificationId);
    } else {
      this.dataLoaded = true;
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.caseManagerQualificationEditForm = this.formBuilder.group({
      caseManagerQualificationId: new FormControl({value: this.data.caseManagerQualificationId, disabled: true}),
      caseManagerId: new FormControl({value: this.data.caseManagerId, disabled: true}, [Validators.required]),
      qualificationInstitution: new FormControl('', [Validators.required]),
      qualificationName: new FormControl('', [Validators.required]),
    });
    setTimeout(() => {
      this.qualificationInstitutionField.nativeElement.focus();
    }, 0);
  }

  private getCaseManagerQualificationDetail(caseManagerQualificationId: number): void {
    this.qualificationService.getCaseManagerQualificationDetail(caseManagerQualificationId).subscribe(
      response => {
        // console.log('response', response);
        this.caseManagerQualification = response;
        this.caseManagerQualificationEditForm.controls['caseManagerQualificationId'].patchValue(this.caseManagerQualification.caseManagerQualificationId);
        this.caseManagerQualificationEditForm.controls['caseManagerId'].patchValue(this.caseManagerQualification.caseManagerId);
        this.caseManagerQualificationEditForm.controls['qualificationInstitution'].patchValue(this.caseManagerQualification.qualificationInstitution);
        this.caseManagerQualificationEditForm.controls['qualificationName'].patchValue(this.caseManagerQualification.qualificationName);
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
        this.dialogRef.close(['delete', this.caseManagerQualificationEditForm.getRawValue()]);
      }
      this.confirmDialogRef = null;
    });
  }

  public save(): void {
    // console.log('raw', this.caregiverWorkshopEditForm.getRawValue());
    this.dialogRef.close([this.data.action, this.caseManagerQualificationEditForm.getRawValue()]);
  }

}
