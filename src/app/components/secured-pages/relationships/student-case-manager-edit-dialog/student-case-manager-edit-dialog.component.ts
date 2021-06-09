import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CaseManager } from '../../../../models/people/case-manager.model';
import { CaseManagerService } from '../../../../services/people/case-manager.service';
import * as moment from 'moment';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { FormattingService } from '@tqp/services/formatting.service';
import { validateNonZeroValue } from '@tqp/validators/custom.validators';

@Component({
  selector: 'app-student-case-manager-edit-dialog',
  templateUrl: './student-case-manager-edit-dialog.component.html',
  styleUrls: ['./student-case-manager-edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentCaseManagerEditDialogComponent implements OnInit {
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public dataLoaded: boolean = false;
  public studentCaseManagerEditForm: FormGroup;
  public caseManagerList: CaseManager[];
  public caseManagerRelationship: CaseManager;

  public validationMessages = {
    'relationshipId': [],
    'caseManagerUserId': [
      {type: 'required', message: 'A Case Manager is required.'},
      {type: 'validateNonZeroValue', message: 'A Case Manager is required.'}
    ],
    'relationshipStartDate': [
      {type: 'required', message: 'An Effective Date is required.'}
    ]
  };

  constructor(private dialogRef: MatDialogRef<StudentCaseManagerEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private caseManagerService: CaseManagerService,
              private formBuilder: FormBuilder,
              private formattingService: FormattingService,
              public _matDialog: MatDialog) {
    this.getCaseManagerList(this.data.caseManagerId);
    if (this.data.action === 'update') {
      this.getCaseManagerDetailByStudentId(this.data.studentId);
    } else {
      this.dataLoaded = true;
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.studentCaseManagerEditForm = this.formBuilder.group({
      relationshipId: new FormControl({value: 0, disabled: true}),
      caseManagerUserId: new FormControl(0, [Validators.required, validateNonZeroValue]),
      relationshipStartDate: new FormControl(moment().format('DD-MMM-yyyy'), Validators.required)
    });

    // setTimeout(() => {
    //   this.relationSurnameField.nativeElement.focus();
    // }, 0);
  }

  // LOAD DATA

  private getCaseManagerDetailByStudentId(studentId: number): void {
    this.caseManagerService.getCurrentCaseManagerDetailByStudentId(studentId).subscribe(
      response => {
        console.log('response', response);
        this.caseManagerRelationship = response;
        this.caseManagerRelationship.relationshipStartDate = this.formattingService.formatMySqlDateAsStandard(this.caseManagerRelationship.relationshipStartDate);
        this.studentCaseManagerEditForm.controls['relationshipId'].patchValue(this.caseManagerRelationship.relationshipId);
        this.studentCaseManagerEditForm.controls['userId'].patchValue(this.caseManagerRelationship.caseManagerUserId);
        this.studentCaseManagerEditForm.controls['relationshipStartDate'].patchValue(this.caseManagerRelationship.relationshipStartDate);
        this.dataLoaded = true;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // LOAD OPTION VALUE LISTS

  private getCaseManagerList(excludeId: number): void {
    this.caseManagerService.getCaseManagerList().subscribe(
      (response: CaseManager[]) => {
        console.log('caseManagerList', response);
        this.caseManagerList = response;
        this.caseManagerList = this.caseManagerList.filter(item => {
          return item.caseManagerUserId !== excludeId;
        });
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
        this.dialogRef.close(['delete', this.studentCaseManagerEditForm.getRawValue()]);
      }
      this.confirmDialogRef = null;
    });
  }

  public save(): void {
    this.dialogRef.close([this.data.action, this.studentCaseManagerEditForm.getRawValue()]);
  }

}
