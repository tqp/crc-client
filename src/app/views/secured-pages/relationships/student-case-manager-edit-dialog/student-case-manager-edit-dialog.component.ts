import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CaseManager } from '../../people/case-managers/CaseManager';
import { CaseManagerService } from '../../people/case-managers/case-manager.service';
import * as moment from 'moment';

@Component({
  selector: 'app-student-case-manager-edit-dialog',
  templateUrl: './student-case-manager-edit-dialog.component.html',
  styleUrls: ['./student-case-manager-edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentCaseManagerEditDialogComponent implements OnInit {
  public studentCaseManagerEditForm: FormGroup;
  public caseManagerList: CaseManager[];

  public validationMessages = {
    'caseManagerId': [
      {type: 'required', message: 'A Case Manager is required'}
    ],
    'relationshipStartDate': [
      {type: 'required', message: 'An Effective Date is required'}
    ]
  };

  constructor(private dialogRef: MatDialogRef<StudentCaseManagerEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private caseManagerService: CaseManagerService,
              private formBuilder: FormBuilder) {
    this.getCaseManagerList();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.studentCaseManagerEditForm = this.formBuilder.group({
      caseManagerId: new FormControl(0, Validators.required),
      relationshipStartDate: new FormControl(moment().format('MM/DD/YYYY'), Validators.required)
    });

    // setTimeout(() => {
    //   this.relationSurnameField.nativeElement.focus();
    // }, 0);
  }

  // Load Option Value Lists

  private getCaseManagerList(): void {
    this.caseManagerService.getCaseManagerList().subscribe(
      (response: CaseManager[]) => {
        console.log('response', response);
        this.caseManagerList = response;
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
    this.dialogRef.close(this.studentCaseManagerEditForm.value);
  }

}
