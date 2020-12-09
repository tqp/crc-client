import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Role } from '../../roles/Role';
import { RoleService } from '../../roles/role.service';
import { UserValidationService } from '../user-validation.service';

@Component({
  selector: 'app-user-detail-edit-dialog',
  templateUrl: './user-detail-edit-dialog.component.html',
  styleUrls: ['./user-detail-edit-dialog.component.css']
})
export class UserDetailEditDialogComponent implements OnInit {
  @ViewChild('userSurnameInputField', {static: false}) userSurnameInputField: ElementRef;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public userEditForm: FormGroup;

  // CHECKBOXES
  public roleList: Role[];
  public roleListCheckboxArray: Role[];
  public checkboxesLoaded: boolean = false;

  public setInitialPasswordCheckboxStatus: boolean = false;

  get roleCheckboxFormArray() {
    return this.userEditForm.controls.roleCheckboxes as FormArray;
  }

  public validationMessages = {
    'surname': [
      {type: 'required', message: 'A surname is required'}
    ],
    'givenName': [
      {type: 'required', message: 'A given name is required'}
    ],
    'username': [
      {type: 'required', message: 'A username is required'},
      {type: 'maxlength', message: 'The Username cannot be more than 60 characters long'},
      {type: 'existingUsernameValidator', message: 'That username already exists'}
    ],
    'initialPassword': []
  };

  constructor(private dialogRef: MatDialogRef<UserDetailEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private roleService: RoleService,
              private formBuilder: FormBuilder,
              protected userValidationService: UserValidationService,
              public _matDialog: MatDialog) {
    this.getRoleList();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userEditForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.maxLength(60)], [
        this.userValidationService.existingUsernameValidator()
      ]),
      surname: new FormControl('', Validators.required),
      givenName: new FormControl('', Validators.required),
      setInitialPassword: new FormControl(''),
      password: new FormControl('password123'),
      roles: new FormControl(''),
      roleCheckboxes: new FormArray([], minSelectedCheckboxes(1)),
    });

    setTimeout(() => {
      this.userSurnameInputField.nativeElement.focus();
    }, 0);
  }

  private getRoleList(): void {
    this.roleService.getRoleList().subscribe(
      (response: Role[]) => {
        // console.log('studentList', studentList);
        this.roleList = response;
        this.addCheckboxes();
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // CHECKBOXES

  public setCheckboxes() {
    this.roleListCheckboxArray = [];
    this.roleCheckboxFormArray.value.forEach((value, index) => {
      const role: Role = new Role();
      role.roleId = this.roleList[index].roleId;
      role.status = value;
      this.roleListCheckboxArray.push(role);
    });
  }

  private addCheckboxes() {
    // console.log('this.roleList', this.roleList);
    this.roleList.forEach(() => {
      const formArray = this.userEditForm.controls.roleCheckboxes as FormArray;
      return formArray.push(new FormControl(false));
    });
    this.checkboxesLoaded = true;
  }

  public setInitialPasswordCheckChanged(event) {
    console.log('event', event.target.checked);
    this.setInitialPasswordCheckboxStatus = event.target.checked;
  }

  // BUTTONS

  public save(): void {
    this.dialogRef.close([this.data.action, this.userEditForm.getRawValue(), this.roleListCheckboxArray]);
  }

  public test(): void {
    console.log('form', this.userEditForm.getRawValue());
    console.log('checkboxes', this.roleListCheckboxArray);
  }

}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : {required: true};
  };
  return validator;
}
