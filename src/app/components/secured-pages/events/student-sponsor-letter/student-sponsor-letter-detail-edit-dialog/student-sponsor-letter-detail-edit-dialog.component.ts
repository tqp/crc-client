import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormattingService } from '@tqp/services/formatting.service';
import * as moment from 'moment';
import { StudentSponsorLetterService } from '../../../../../services/events/student-sponsor-letter.service';
import { StudentSponsorLetter } from '../../../../../models/student-sponsor.letter';
import { Sponsor } from '../../../../../models/people/sponsor.model';
import { Student } from '../../../../../models/people/student.model';
import { SponsorService } from '../../../../../services/people/sponsor.service';
import { StudentService } from '../../../../../services/people/student.service';

@Component({
  selector: 'app-student-sponsor-letter-detail-edit-dialog',
  templateUrl: './student-sponsor-letter-detail-edit-dialog.component.html',
  styleUrls: ['./student-sponsor-letter-detail-edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentSponsorLetterDetailEditDialogComponent implements OnInit {
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public dataLoaded: boolean = true;
  public studentSponsorLetterEditForm: FormGroup;
  public studentSponsorLetter: StudentSponsorLetter;
  public sponsorList: Sponsor[];
  public studentList: Student[];

  public validationMessages = {
    'studentSponsorLetterId': [],
    'sponsorId': [],
    'studentId': [],
    'sponsorIdDropdown': [],
    'studentIdDropdown': [],
    'studentSponsorLetterDate': [
      {type: 'required', message: 'A date is required.'}
    ]
  };

  constructor(private dialogRef: MatDialogRef<StudentSponsorLetterDetailEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private studentSponsorLetterService: StudentSponsorLetterService,
              private formBuilder: FormBuilder,
              private formattingService: FormattingService,
              private sponsorService: SponsorService,
              private studentService: StudentService,
              public _matDialog: MatDialog) {
    console.log('data', this.data);

    if (this.data.studentId != null) {
      this.getSponsorListByStudentId(this.data.studentId);
    }

    if (this.data.sponsorId != null) {
      this.getStudentListBySponsorId(this.data.sponsorId);
    }

    if (this.data.action === 'update') {
      this.getStudentSponsorLetterByStudentId(this.data.studentId);
    } else {
      this.dataLoaded = true;
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.studentSponsorLetterEditForm = this.formBuilder.group({
      studentSponsorLetterId: new FormControl({value: 0, disabled: true}),
      sponsorId: new FormControl({value: this.data.sponsorId != null ? this.data.sponsorId : 0, disabled: true}),
      studentId: new FormControl({value: this.data.studentId != null ? this.data.studentId : 0, disabled: true}),
      sponsorIdDropdown: new FormControl({value: 0, disabled: false}),
      studentIdDropdown: new FormControl({value: 0, disabled: false}),
      studentSponsorLetterDate: new FormControl(moment().format('DD-MMM-yyyy'), Validators.required)
    });
  }

  // LOAD DATA

  private getStudentSponsorLetterByStudentId(studentId: number): void {
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

  private getSponsorListByStudentId(studentId: number): void {
    this.sponsorService.getSponsorListByStudentId(studentId).subscribe(
      (response: Sponsor[]) => {
        console.log('response', response);
        this.sponsorList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getStudentListBySponsorId(sponsorId: number): void {
    this.studentService.getStudentListBySponsorId(sponsorId).subscribe(
      (response: Student[]) => {
        console.log('response', response);
        this.studentList = response;
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
        this.dialogRef.close(['delete', this.studentSponsorLetterEditForm.getRawValue()]);
      }
      this.confirmDialogRef = null;
    });
  }

  public save(): void {
    this.dialogRef.close([this.data.action, this.studentSponsorLetterEditForm.getRawValue()]);
  }

}
