import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-student-caregiver-edit-dialog',
  templateUrl: './student-caregiver-edit-dialog.component.html',
  styleUrls: ['./student-caregiver-edit-dialog.component.css']
})
export class StudentCaregiverEditDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<StudentCaregiverEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  public reset(): void {
    // this.listAddRemoveItemsBasicComponent.reset();
  }

  public save(): void {
    this.dialogRef.close();
  }

}
