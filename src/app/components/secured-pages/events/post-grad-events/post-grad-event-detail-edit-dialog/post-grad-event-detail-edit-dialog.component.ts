import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostGradEvent } from '../../../../../models/post-grad-event.model';
import { PostGradEventType } from '../../../../../models/types/type-post-grad-event.model';
import { PostGradEventTypeService } from '../../../../../services/reference-tables/post-grad-event-type.service';
import { FormattingService } from '@tqp/services/formatting.service';
import { validateNonZeroValue } from '@tqp/validators/custom.validators';
import * as moment from 'moment';

@Component({
  selector: 'app-post-grad-event-detail-edit-dialog',
  templateUrl: './post-grad-event-detail-edit-dialog.component.html',
  styleUrls: ['./post-grad-event-detail-edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostGradEventDetailEditDialogComponent implements OnInit {
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
    ],
    'postGradEventComments': [],
  };

  constructor(private dialogRef: MatDialogRef<PostGradEventDetailEditDialogComponent>,
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
      postGradEventDate: new FormControl(moment().format('DD-MMM-yyyy'), Validators.required),
      postGradEventComments: new FormControl(),
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
