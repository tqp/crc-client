import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sponsor } from '../../people/sponsors/Sponsor';
import { SponsorService } from '../../people/sponsors/sponsor.service';

@Component({
  selector: 'app-student-sponsor-edit-dialog',
  templateUrl: './student-sponsor-edit-dialog.component.html',
  styleUrls: ['./student-sponsor-edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentSponsorEditDialogComponent implements OnInit {
  public studentSponsorEditForm: FormGroup;
  public sponsorList: Sponsor[];

  public validationMessages = {
    'sponsorId': [
      {type: 'required', message: 'A Case Manager is required'}
    ],
    'relationshipStartDate': [
      {type: 'required', message: 'An Effective Date is required'}
    ]
  };

  constructor(private dialogRef: MatDialogRef<StudentSponsorEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private sponsorService: SponsorService,
              private formBuilder: FormBuilder) {
    this.getSponsorList();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.studentSponsorEditForm = this.formBuilder.group({
      sponsorId: new FormControl(0, Validators.required),
      relationshipStartDate: new FormControl('', Validators.required)
    });

    // setTimeout(() => {
    //   this.relationSurnameField.nativeElement.focus();
    // }, 0);
  }

  // Load Option Value Lists

  private getSponsorList(): void {
    this.sponsorService.getSponsorList().subscribe(
      (response: Sponsor[]) => {
        console.log('response', response);
        this.sponsorList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // Buttons

  public reset(): void {
    console.log('reset');
  }

  public save(): void {
    this.dialogRef.close(this.studentSponsorEditForm.value);
  }

}
