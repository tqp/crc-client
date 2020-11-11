import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProgramStatusService } from '../program-status.service';
import { ProgramStatusPackage } from '../ProgramStatusPackage';
import * as moment from 'moment';

@Component({
  selector: 'app-student-program-status-edit-dialog',
  templateUrl: './student-program-status-edit-dialog.component.html',
  styleUrls: ['./student-program-status-edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentProgramStatusEditDialogComponent implements OnInit {
  public programStatusEditForm: FormGroup;
  public programStatusPackageLevelOne: ProgramStatusPackage;
  public programStatusPackageLevelTwo: ProgramStatusPackage;
  public programStatusPackageLevelThree: ProgramStatusPackage;

  public validationMessages = {
    'programStatusLevelOneId': [
      {type: 'required', message: 'A Program Status is required'}
    ],
    'programStatusLevelTwoId': [
      {type: 'required', message: 'This field is required'}
    ],
    'programStatusLevelThreeId': [
      {type: 'required', message: 'This field is required'}
    ],
    'programStatusStartDate': [
      {type: 'required', message: 'An Effective Date is required'}
    ]
  };

  constructor(private dialogRef: MatDialogRef<StudentProgramStatusEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private programStatusService: ProgramStatusService,
              private formBuilder: FormBuilder) {
    this.getProgramStatusPayload_LevelOne();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.programStatusEditForm = this.formBuilder.group({
      programStatusLevelOneId: new FormControl(0, Validators.required),
      programStatusLevelTwoId: new FormControl(0, Validators.required),
      programStatusLevelThreeId: new FormControl(0, Validators.required),
      programStatusStartDate: new FormControl(moment().format('MM/DD/YYYY'), Validators.required),
    });

    // setTimeout(() => {
    //   this.relationSurnameField.nativeElement.focus();
    // }, 0);
  }

  // Load Option Value Lists

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

  public programStatusLevelTwoChanged(event: any): void {
    const programStatusLevelTwoId = event.target.value;
    this.programStatusEditForm.get('programStatusLevelThreeId').patchValue(0);
    // console.log('programStatusLevelTwoChanged', programStatusLevelTwoId);
    this.programStatusService.getProgramStatusPackage(programStatusLevelTwoId).subscribe(
      (response: ProgramStatusPackage) => {
        this.programStatusPackageLevelThree = response;
        // console.log('programStatusPackageLevelThree', this.programStatusPackageLevelThree);
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
    this.dialogRef.close(this.programStatusEditForm.value);
  }

}
