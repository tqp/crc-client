import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-program-status-edit-dialog',
  templateUrl: './student-program-status-edit-dialog.component.html',
  styleUrls: ['./student-program-status-edit-dialog.component.css']
})
export class StudentProgramStatusEditDialogComponent implements OnInit {
  public studentProgramStatusEditForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<StudentProgramStatusEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  public reset(): void {
    console.log('reset');
  }

  public save(): void {
    this.dialogRef.close(this.studentProgramStatusEditForm.value);
  }

}
