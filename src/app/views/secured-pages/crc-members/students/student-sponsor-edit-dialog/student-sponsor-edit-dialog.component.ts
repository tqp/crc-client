import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-sponsor-edit-dialog',
  templateUrl: './student-sponsor-edit-dialog.component.html',
  styleUrls: ['./student-sponsor-edit-dialog.component.css']
})
export class StudentSponsorEditDialogComponent implements OnInit {
  public studentSponsorEditForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<StudentSponsorEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  public reset(): void {
    console.log('reset');
  }

  public save(): void {
    this.dialogRef.close(this.studentSponsorEditForm.value);
  }

}
