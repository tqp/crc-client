import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormattingService } from '@tqp/services/formatting.service';
import { SponsorLetter } from '../../../../../models/sponsor.letter';
import { Sponsor } from '../../../../../models/people/sponsor.model';
import { Student } from '../../../../../models/people/student.model';
import { SponsorLetterService } from '../../../../../services/events/sponsor-letter.service';
import { SponsorService } from '../../../../../services/people/sponsor.service';
import { RelationshipService } from '../../../../../services/relationships/relationship.service';
import { Caregiver } from '../../../../../models/people/caregiver.model';
import { StudentService } from '../../../../../services/people/student.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sponsor-letter-detail-edit-dialog',
  templateUrl: './sponsor-letter-detail-edit-dialog.component.html',
  styleUrls: ['./sponsor-letter-detail-edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SponsorLetterDetailEditDialogComponent implements OnInit {
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public dataLoaded: boolean = true;
  public sponsorLetterEditForm: FormGroup;
  public sponsorLetter: SponsorLetter;
  public sponsorList: Sponsor[];
  public studentList: Student[];

  public validationMessages = {
    'sponsorLetterId': [],
    'sponsorId': [],
    'studentId': [],
    'sponsorIdDropdown': [],
    'studentIdDropdown': [],
    'sponsorLetterDate': [
      {type: 'required', message: 'A date is required.'}
    ]
  };

  constructor(private dialogRef: MatDialogRef<SponsorLetterDetailEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private sponsorLetterService: SponsorLetterService,
              private formBuilder: FormBuilder,
              private studentService: StudentService,
              private sponsorService: SponsorService,
              private formattingService: FormattingService,
              private relationshipService: RelationshipService,
              public _matDialog: MatDialog) {
    this.getStudentList();
    this.getSponsorList();

    // if (this.data.studentId != null) {
    //   this.getSponsorListByStudentId(this.data.studentId);
    // }

    // if (this.data.sponsorId != null) {
    //   this.getStudentListBySponsorId(this.data.sponsorId);
    // }

    if (this.data.action === 'update') {
      this.getSponsorLetterByStudentId(this.data.studentId);
    } else {
      this.dataLoaded = true;
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.sponsorLetterEditForm = this.formBuilder.group({
      sponsorLetterId: new FormControl({value: 0, disabled: true}),
      sponsorId: new FormControl({value: this.data.sponsorId != null ? this.data.sponsorId : 0, disabled: true}),
      studentId: new FormControl({value: this.data.studentId != null ? this.data.studentId : 0, disabled: true}),
      sponsorIdDropdown: new FormControl({value: 0, disabled: false}),
      studentIdDropdown: new FormControl({value: 0, disabled: false}),
      sponsorLetterDate: new FormControl(moment().format('DD-MMM-yyyy'), Validators.required)
    });
  }

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

  private getSponsorList(): void {
    this.sponsorService.getSponsorList().subscribe(
      (response: Sponsor[]) => {
        // console.log('response', response);
        this.sponsorList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getSponsorLetterByStudentId(studentId: number): void {
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
        // console.log('response', response);
        this.sponsorList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getStudentListBySponsorId(sponsorId: number): void {
    this.relationshipService.getStudentListBySponsorId(sponsorId).subscribe(
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
        this.dialogRef.close(['delete', this.sponsorLetterEditForm.getRawValue()]);
      }
      this.confirmDialogRef = null;
    });
  }

  public save(): void {
    this.dialogRef.close([this.data.action, this.sponsorLetterEditForm.getRawValue()]);
  }

}
