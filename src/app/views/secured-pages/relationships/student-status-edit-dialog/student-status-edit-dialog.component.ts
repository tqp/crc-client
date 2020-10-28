import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Status } from '../../people/Status';

@Component({
  selector: 'app-student-status-edit-dialog',
  templateUrl: './student-status-edit-dialog.component.html',
  styleUrls: ['./student-status-edit-dialog.component.css']
})
export class StudentStatusEditDialogComponent implements OnInit {
  public studentStatusEditForm: FormGroup;
  public statusList: Status[];

  public validationMessages = {
    'statusId': [
      {type: 'required', message: 'A Status ID is required'}
    ],
    'statusName': [
      {type: 'required', message: 'A Status Name is required'}
    ]
  };

  constructor(private dialogRef: MatDialogRef<StudentStatusEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder) {
    this.getStatusList();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.studentStatusEditForm = this.formBuilder.group({
      statusId: new FormControl(0, Validators.required),
      relationshipStartDate: new FormControl('', Validators.required)
    });

    // setTimeout(() => {
    //   this.relationSurnameField.nativeElement.focus();
    // }, 0);
  }

  // Load Option Value Lists

  private getStatusList(): void {
    // this.statusService.getStatusList().subscribe(
    //   (response: Status[]) => {
    //     console.log('response', response);
    //     this.statusList = response;
    //   },
    //   error => {
    //     console.error('Error: ', error);
    //   }
    // );
  }

  // Buttons

  public reset(): void {
    console.log('reset');
  }

  public save(): void {
    this.dialogRef.close(this.studentStatusEditForm.value);
  }

}
