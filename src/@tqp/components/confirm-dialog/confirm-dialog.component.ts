import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  public dialogTitle: string = 'Please Confirm';
  public dialogMessage: string = 'Click OK to continue.';
  public mainButtonText: string = 'Confirm';
  public hideCancelButton: boolean = false;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit(): void {
  }

  public formatDialogMessage(dialogMessage: string): string {
    return dialogMessage.replace('\n', '<br />');
  }

}
