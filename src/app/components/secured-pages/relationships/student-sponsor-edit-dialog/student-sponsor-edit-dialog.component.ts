import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sponsor } from '../../../../models/people/sponsor.model';
import { SponsorService } from '../../../../services/people/sponsor.service';
import * as moment from 'moment';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { FormattingService } from '@tqp/services/formatting.service';
import { validateNonZeroValue } from '@tqp/validators/custom.validators';

@Component({
  selector: 'app-student-sponsor-edit-dialog',
  templateUrl: './student-sponsor-edit-dialog.component.html',
  styleUrls: ['./student-sponsor-edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentSponsorEditDialogComponent implements OnInit {
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public dataLoaded: boolean = false;
  public studentSponsorEditForm: FormGroup;
  public sponsorList: Sponsor[];
  public sponsorRelationship: Sponsor;

  public validationMessages = {
    'relationshipId': [],
    'sponsorId': [
      {type: 'required', message: 'A Sponsor is required.'},
      {type: 'validateNonZeroValue', message: 'A Sponsor is required.'}
    ],
    'relationshipStartDate': [
      {type: 'required', message: 'An Effective Date is required.'}
    ]
  };

  constructor(private dialogRef: MatDialogRef<StudentSponsorEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private sponsorService: SponsorService,
              private formBuilder: FormBuilder,
              private formattingService: FormattingService,
              public _matDialog: MatDialog) {
    this.getSponsorList(this.data.sponsorId);
    if (this.data.action === 'update') {
      this.getSponsorDetailByStudentId(this.data.studentId);
    } else {
      this.dataLoaded = true;
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.studentSponsorEditForm = this.formBuilder.group({
      relationshipId: new FormControl({value: 0, disabled: true}),
      sponsorId: new FormControl(0, [Validators.required, validateNonZeroValue]),
      relationshipStartDate: new FormControl(moment().format('DD-MMM-yyyy'), Validators.required)
    });

    // setTimeout(() => {
    //   this.relationSurnameField.nativeElement.focus();
    // }, 0);
  }

  // LOAD DATA

  private getSponsorDetailByStudentId(studentId: number): void {
    this.sponsorService.getCurrentSponsorDetailByStudentId(studentId).subscribe(
      response => {
        console.log('response', response);
        this.sponsorRelationship = response;
        this.sponsorRelationship.relationshipStartDate = this.formattingService.formatMySqlDateAsStandard(this.sponsorRelationship.relationshipStartDate);
        this.studentSponsorEditForm.controls['relationshipId'].patchValue(this.sponsorRelationship.relationshipId);
        this.studentSponsorEditForm.controls['sponsorId'].patchValue(this.sponsorRelationship.sponsorId);
        this.studentSponsorEditForm.controls['relationshipStartDate'].patchValue(this.sponsorRelationship.relationshipStartDate);
        this.dataLoaded = true;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // LOAD OPTION VALUE LISTS

  private getSponsorList(excludeId: number): void {
    this.sponsorService.getSponsorList().subscribe(
      (response: Sponsor[]) => {
        // console.log('response', response);
        this.sponsorList = response;
        this.sponsorList = this.sponsorList.filter(item => {
          return item.sponsorId !== excludeId;
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
        this.dialogRef.close(['delete', this.studentSponsorEditForm.getRawValue()]);
      }
      this.confirmDialogRef = null;
    });
  }

  public save(): void {
    this.dialogRef.close([this.data.action, this.studentSponsorEditForm.getRawValue()]);
  }

}
