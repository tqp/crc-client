import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgramStatusService } from './program-status.service';
import { ProgramStatusPackage } from './ProgramStatusPackage';
import * as moment from 'moment';
import { ConfirmDialogComponent } from '../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { FormattingService } from '../../../../../@tqp/services/formatting.service';
import { ProgramStatus } from './ProgramStatus';
import { validateNonZeroValue } from '../../../../../@tqp/validators/custom.validators';

@Component({
  selector: 'app-student-program-status-edit-dialog',
  templateUrl: './student-program-status-edit-dialog.component.html',
  styleUrls: ['./student-program-status-edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentProgramStatusEditDialogComponent implements OnInit {
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public dataLoaded: boolean = false;
  public programStatusEditForm: FormGroup;
  public programStatusPackageLevelOne: ProgramStatusPackage;
  public programStatusPackageLevelTwo: ProgramStatusPackage;
  public programStatusRelationship: ProgramStatus;

  public validationMessages = {
    'programStatusId': [],
    'programStatusLevelOneId': [
      {type: 'required', message: 'A Program Status is required'}
    ],
    'programStatusLevelTwoId': [
      {type: 'required', message: 'This field is required'}
    ],
    'relationshipStartDate': [
      {type: 'required', message: 'An Effective Date is required'}
    ]
  };

  constructor(private dialogRef: MatDialogRef<StudentProgramStatusEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private programStatusService: ProgramStatusService,
              private formBuilder: FormBuilder,
              private formattingService: FormattingService,
              public _matDialog: MatDialog) {
    this.getProgramStatusPayload_LevelOne();
    if (this.data.action === 'update') {
      this.getProgramStatusDetailByStudentId(this.data.studentId);
    } else {
      this.dataLoaded = true;
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.programStatusEditForm = this.formBuilder.group({
      programStatusId: new FormControl({value: 0, disabled: true}),
      programStatusLevelOneId: new FormControl(0, [Validators.required, validateNonZeroValue]),
      programStatusLevelTwoId: new FormControl(0, [Validators.required, validateNonZeroValue]),
      relationshipStartDate: new FormControl(moment().format('DD-MMM-yyyy'), Validators.required),
    });
  }

  private getProgramStatusDetailByStudentId(studentId: number): void {
    this.programStatusService.getProgramStatusDetailByStudentId(studentId).subscribe(
      response => {
        // console.log('response', response);
        this.programStatusRelationship = response;
        this.programStatusRelationship.programStatusStartDate = this.formattingService.formatMySqlDateAsStandard(this.programStatusRelationship.programStatusStartDate);
        this.programStatusEditForm.controls['programStatusId'].patchValue(this.programStatusRelationship.programStatusId);
        this.programStatusEditForm.controls['programStatusLevelOneId'].patchValue(this.programStatusRelationship.programStatusLevelOneId);
        this.programStatusEditForm.controls['programStatusLevelTwoId'].patchValue(this.programStatusRelationship.programStatusLevelTwoId);
        this.programStatusEditForm.controls['relationshipStartDate'].patchValue(this.programStatusRelationship.programStatusStartDate);

        if (this.programStatusRelationship.programStatusLevelOneId) {
          this.programStatusService.getProgramStatusPackage(this.programStatusRelationship.programStatusLevelOneId).subscribe(
            (response2: ProgramStatusPackage) => {
              this.programStatusPackageLevelTwo = response2;
            },
            error => {
              console.error('Error: ', error);
            }
          );
        }

        this.dataLoaded = true;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // LOAD OPTION VALUE LISTS

  private getProgramStatusPayload_LevelOne(): void {
    this.programStatusService.getProgramStatusPackage(0).subscribe(
      (response: ProgramStatusPackage) => {
        this.programStatusPackageLevelOne = response;
        // console.log('programStatusPackageLevelOne', this.programStatusPackageLevelOne);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public programStatusLevelOneChanged(event: any): void {
    const programStatusLevelOneId = event.target.value;
    this.programStatusEditForm.get('programStatusLevelTwoId').patchValue(0);
    // console.log('programStatusLevelOneChanged', programStatusLevelOneId);
    this.programStatusService.getProgramStatusPackage(programStatusLevelOneId).subscribe(
      (response: ProgramStatusPackage) => {
        this.programStatusPackageLevelTwo = response;
        // console.log('programStatusPackageLevelTwo', this.programStatusPackageLevelTwo);
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
        this.dialogRef.close(['delete', this.programStatusEditForm.getRawValue()]);
      }
      this.confirmDialogRef = null;
    });
  }

  public save(): void {
    this.dialogRef.close([this.data.action, this.programStatusEditForm.getRawValue()]);
  }

}
