import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormattingService } from '../../../../../@tqp/services/formatting.service';
import * as moment from 'moment';
import { PostGradEvent } from './PostGradEvent';
import { PostGradEventType } from '../../reference-tables/post-grad-event-type/PostGradEventType';
import { validateNonZeroValue } from '../../../../../@tqp/validators/custom.validators';
import { PostGradEventTypeService } from '../../reference-tables/post-grad-event-type/post-grad-event-type.service';

@Component({
  selector: 'app-student-post-grad-event-edit-dialog',
  templateUrl: './student-post-grad-event-edit-dialog.component.html',
  styleUrls: ['./student-post-grad-event-edit-dialog.component.scss']
})
export class StudentPostGradEventEditDialogComponent implements OnInit {
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public dataLoaded: boolean = false;
  public postGradEventEditForm: FormGroup;
  public postGradEvent: PostGradEvent;
  public postGradEventTypeList: PostGradEventType[];

  public validationMessages = {
    'postGradEventId': [],
    'postGradEventTypeId': [],
    'postGradEventDate': [
      {type: 'required', message: 'A date is required'}
    ]
  };

  constructor(private dialogRef: MatDialogRef<StudentPostGradEventEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private postGradEventTypeService: PostGradEventTypeService,
              private formBuilder: FormBuilder,
              private formattingService: FormattingService,
              public _matDialog: MatDialog) {
    this.getPostGradEventTypeList();
    if (this.data.action === 'update') {
      this.getPostGradEventDetailByStudentId(this.data.studentId);
    } else {
      this.dataLoaded = true;
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.postGradEventEditForm = this.formBuilder.group({
      postGradEventId: new FormControl({value: 0, disabled: true}),
      postGradEventTypeId: new FormControl(0, [Validators.required, validateNonZeroValue]),
      postGradEventDate: new FormControl(moment().format('MM/DD/YYYY'), Validators.required),
    });
  }

  // LOAD DATA

  private getPostGradEventDetailByStudentId(studentId: number): void {
    // this.postGradEventService.getPostGradEventDetailByStudentId(studentId).subscribe(
    //   response => {
    //     // console.log('response', response);
    //     this.postGradEvent = response;
    //     this.postGradEvent.postGradEventDate = this.formattingService.formatMySqlDateAsStandard(this.postGradEvent.postGradEventDate);
    //     this.dataLoaded = true;
    //   },
    //   error => {
    //     console.error('Error: ', error);
    //   }
    // );
  }

  // LOAD OPTION VALUE LISTS

  private getPostGradEventTypeList(): void {
    this.postGradEventTypeService.getPostGradEventTypeList().subscribe(
      (response: PostGradEventType[]) => {
        console.log('response', response);
        this.postGradEventTypeList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public postGradEventTypeChanged(event: any): void {
    const postGradEventType = event.target.value;
    console.log('postGradEventType', postGradEventType);
    // this.programStatusEditForm.get('programStatusLevelTwoId').patchValue(0);
    // this.programStatusService.getProgramStatusPackage(programStatusLevelOneId).subscribe(
    //   (response: ProgramStatusPackage) => {
    //     this.programStatusPackageLevelTwo = response;
    //     // console.log('programStatusPackageLevelTwo', this.programStatusPackageLevelTwo);
    //   },
    //   error => {
    //     console.error('Error: ', error);
    //   }
    // );
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
        this.dialogRef.close(['delete', this.postGradEventEditForm.getRawValue()]);
      }
      this.confirmDialogRef = null;
    });
  }

  public save(): void {
    this.dialogRef.close([this.data.action, this.postGradEventEditForm.getRawValue()]);
  }

}
