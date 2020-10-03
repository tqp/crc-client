import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CaseManager } from '../../case-managers/CaseManager';
import { CaseManagerService } from '../../case-managers/case-manager.service';

@Component({
  selector: 'app-student-case-manager-edit-dialog',
  templateUrl: './student-case-manager-edit-dialog.component.html',
  styleUrls: ['./student-case-manager-edit-dialog.component.css']
})
export class StudentCaseManagerEditDialogComponent implements OnInit {
  public studentCaseManagerEditForm: FormGroup;
  public caseManagerList: CaseManager[];

  public validationMessages = {
    'caseManagerId': [
      {type: 'required', message: 'A Case Manager is required'}
    ]
  };

  constructor(private dialogRef: MatDialogRef<StudentCaseManagerEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private caseManagerService: CaseManagerService) {
    this.getCaseManagerList();
  }

  ngOnInit(): void {
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
