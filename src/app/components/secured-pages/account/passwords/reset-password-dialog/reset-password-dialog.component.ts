import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserValidationService } from '../../../../../services/account/user-validation.service';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.css']
})
export class ResetPasswordDialogComponent implements OnInit {
  @ViewChild('newPasswordField', {static: false}) public newPasswordField: ElementRef;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public resetPasswordForm: FormGroup;

  public validationMessages = {
    'caseManagerUserId': [],
    'newPassword': [
      {type: 'required', message: 'Please enter a new password.'}
    ],
    'newPasswordConfirm': [
      {type: 'required', message: 'Confirm your new password.'},
      {type: 'confirmNewPasswordValidator', message: 'The passwords do not match.'}
    ]
  };

  static passwordMatchValidator(control: AbstractControl) {
    const newPassword: string = control.get('newPassword').value;
    const newPasswordConfirm: string = control.get('newPasswordConfirm').value;
    if (newPassword !== newPasswordConfirm) {
      control.get('newPasswordConfirm').setErrors({confirmNewPasswordValidator: true});
    }
  }

  constructor(private dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog,
              private userValidationService: UserValidationService) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.resetPasswordForm = this.formBuilder.group({
      caseManagerUserId: new FormControl(this.data.userId, [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      newPasswordConfirm: new FormControl('', [Validators.required])
    }, {
      validator: ResetPasswordDialogComponent.passwordMatchValidator
    });

    setTimeout(() => {
      this.newPasswordField.nativeElement.focus();
    }, 0);
  }

  // LOAD DATA


  // BUTTONS

  public save(): void {
    this.dialogRef.close(this.resetPasswordForm.getRawValue());
  }

}
