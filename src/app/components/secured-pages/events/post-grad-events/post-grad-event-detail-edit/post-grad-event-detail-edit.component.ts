import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostGradEventService } from '../../../../../services/events/post-grad-event.service';
import { PostGradEvent } from '../../../../../models/post-grad-event.model';
import { Caregiver } from '../../../../../models/people/caregiver.model';
import { StudentService } from '../../../../../services/people/student.service';
import { Student } from '../../../../../models/people/student.model';
import { PostGradEventType } from '../../../../../models/types/type-post-grad-event.model';
import { PostGradEventTypeService } from '../../../../../services/reference-tables/post-grad-event-type.service';
import * as moment from 'moment';
import { validateNonZeroValue } from '@tqp/validators/custom.validators';
import { FormattingService } from '@tqp/services/formatting.service';

@Component({
  selector: 'app-post-grad-event-detail-edit',
  templateUrl: './post-grad-event-detail-edit.component.html',
  styleUrls: ['./post-grad-event-detail-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostGradEventDetailEditComponent implements OnInit {
  @ViewChild('defaultInputField', {static: false}) defaultInputField: ElementRef;
  public pageSource: string;
  public newRecord: boolean;
  public studentList: Student[];
  public postGradEventTypeList: PostGradEventType[];
  public postGradEvent: PostGradEvent;
  public postGradEventEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  public validationMessages = {
    'postGradEventId': [
      {type: 'required', message: 'An ID is required.'}
    ],
    'studentId': [
      {type: 'required', message: 'A Student is required.'},
      {type: 'validateNonZeroValue', message: 'You must select a Student.'}
    ],
    'postGradEventDate': [
      {type: 'required', message: 'An Event Date is required.'}
    ],
    'postGradEventTypeId': [
      {type: 'required', message: 'An Event Type is required.'}
    ],
    'postGradEventComments': [],
  };

  constructor(private route: ActivatedRoute,
              private studentService: StudentService,
              private postGradEventService: PostGradEventService,
              private postGradEventTypeService: PostGradEventTypeService,
              private formattingService: FormattingService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.initializeForm();
    this.getStudentList();
    this.getVisitTypeList();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const postGradEventId = params['id'];
        console.log('postGradEventId', postGradEventId);
        this.getPostGradEventDetail(postGradEventId);
      } else {
        // Create new Person
        this.newRecord = true;
        this.postGradEvent = new PostGradEvent();
        this.postGradEvent.postGradEventId = null;
        setTimeout(() => {
          this.defaultInputField.nativeElement.focus();
        }, 0);
      }
    }).then();
  }

  private initializeForm(): void {
    this.postGradEventEditForm = this.formBuilder.group({
      postGradEventId: new FormControl(),
      studentId: new FormControl(0, [Validators.required, validateNonZeroValue]),
      postGradEventDate: new FormControl(moment().format('DD-MMM-yyyy'), Validators.required),
      postGradEventTypeId: new FormControl(0, [Validators.required, validateNonZeroValue]),
      postGradEventComments: new FormControl(''),
    });
  }

  // Load Option Value Lists

  private getStudentList(): void {
    this.studentService.getStudentList().subscribe(
      (response: Caregiver[]) => {
        // console.log('response', response);
        this.studentList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getVisitTypeList(): void {
    this.postGradEventTypeService.getPostGradEventTypeList().subscribe(
      (response: PostGradEventType[]) => {
        // console.log('response', response);
        this.postGradEventTypeList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getPostGradEventDetail(postGradEventId: number): void {
    this.postGradEventService.getPostGradEventDetail(postGradEventId).subscribe(
      response => {
        this.postGradEvent = response;
        console.log('response', response);
        this.postGradEventEditForm.controls['postGradEventId'].patchValue(this.postGradEvent.postGradEventId);
        this.postGradEventEditForm.controls['studentId'].patchValue(this.postGradEvent.studentId);
        this.postGradEventEditForm.controls['postGradEventTypeId'].patchValue(this.postGradEvent.postGradEventTypeId);
        this.postGradEventEditForm.controls['postGradEventDate'].patchValue(this.formattingService.formatMySqlDateAsStandard(this.postGradEvent.postGradEventDate));
        this.postGradEventEditForm.controls['postGradEventComments'].patchValue(this.postGradEvent.postGradEventComments);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public delete(postGradEventId: number): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postGradEventService.deletePostGradEvent(postGradEventId).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['post-grad-events/post-grad-event-list']).then();
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
    const postGradEvent = new PostGradEvent();
    // console.log('postGradEventEditForm', this.postGradEventEditForm.value);
    postGradEvent.postGradEventId = this.postGradEventEditForm.value.postGradEventId;
    postGradEvent.studentId = this.postGradEventEditForm.value.studentId;
    postGradEvent.postGradEventTypeId = this.postGradEventEditForm.value.postGradEventTypeId;
    postGradEvent.postGradEventDate = this.formattingService.formatStandardDateAsMySql(this.postGradEventEditForm.value.postGradEventDate);
    postGradEvent.postGradEventComments = this.postGradEventEditForm.value.postGradEventComments;

    if (this.newRecord) {
      this.postGradEventService.createPostGradEvent(postGradEvent).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['post-grad-events/post-grad-event-detail', response.postGradEventId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.postGradEventService.updatePostGradEvent(postGradEvent).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['post-grad-events/post-grad-event-detail', response.postGradEventId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.postGradEvent.postGradEventId) {
      this.router.navigate(['post-grad-events/post-grad-event-detail', this.postGradEvent.postGradEventId]).then();
    } else {
      this.router.navigate(['post-grad-events/post-grad-event-list']).then();
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
    if (event.ctrlKey && event.key === 'd') {
      event.preventDefault();
      this.delete(this.postGradEvent.postGradEventId);
    }
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      this.save();
    }
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault();
      this.cancel();
    }
  }

}
