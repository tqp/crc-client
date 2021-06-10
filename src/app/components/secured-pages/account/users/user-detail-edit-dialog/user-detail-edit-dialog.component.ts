import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Role } from '../../../../../models/Role';
import { RoleService } from '../../../../../services/account/role.service';
import { UserValidationService } from '../../../../../services/account/user-validation.service';
import { Position } from '../../../../../models/Position';
import { PositionService } from '../../../../../services/account/position.service';

@Component({
  selector: 'app-user-detail-edit-dialog',
  templateUrl: './user-detail-edit-dialog.component.html',
  styleUrls: ['./user-detail-edit-dialog.component.css']
})
export class UserDetailEditDialogComponent implements OnInit {
  @ViewChild('userGivenNameInputField', {static: false}) userGivenNameInputField: ElementRef;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public userEditForm: FormGroup;
  public setInitialPasswordCheckboxStatus: boolean = false;

  // POSITION RADIO BUTTONS
  public positionList: Position[];

  // ROLE CHECKBOXES
  public roleList: Role[];
  public roleListCheckboxArray: Role[];
  public checkboxesLoaded: boolean = false;

  get roleCheckboxFormArray() {
    return this.userEditForm.controls.roleCheckboxes as FormArray;
  }

  public validationMessages = {
    'surname': [
      {type: 'required', message: 'A surname is required.'}
    ],
    'givenName': [
      {type: 'required', message: 'A given name is required.'}
    ],
    'username': [
      {type: 'required', message: 'A username is required.'},
      {type: 'maxlength', message: 'The Username cannot be more than 60 characters long.'},
      {type: 'existingUsernameValidator', message: 'That username already exists.'}
    ],
    'initialPassword': []
  };

  constructor(private dialogRef: MatDialogRef<UserDetailEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private positionService: PositionService,
              private roleService: RoleService,
              private formBuilder: FormBuilder,
              protected userValidationService: UserValidationService,
              public _matDialog: MatDialog) {
    this.getPositionList();
    this.getRoleList();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userEditForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.maxLength(100)], [
        this.userValidationService.existingUsernameValidator()
      ]),
      surname: new FormControl('', Validators.required),
      givenName: new FormControl('', Validators.required),
      setInitialPassword: new FormControl(''),
      password: new FormControl(),
      position: new FormControl('', Validators.required),
      roles: new FormControl(''),
      roleCheckboxes: new FormArray([], minSelectedCheckboxes(1)),
    });

    setTimeout(() => {
      this.userGivenNameInputField.nativeElement.focus();
    }, 500);
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

  // POSITION RADIO BUTTONS

  private getPositionList(): void {
    this.positionService.getPositionList().subscribe(
      response => {
        // console.log('response', response);
        this.positionList = response;
      },
      error => {
        console.error('Error: ', error);
        // this.authService.errorHandler(error);
      }
    );
  }

  public radioButtonChanged(e: Event, position: Position) {
    let roleCheckboxArray = null;
    if (position.roleIds) {
      roleCheckboxArray = position.roleIds.split(' ').join('').split(',').map(x => +x);
      // console.log('roleCheckboxArray', roleCheckboxArray);
      this.roleList.forEach((role, index) => {
        if (roleCheckboxArray.findIndex(x => x === role.roleId) > -1) {
          this.roleCheckboxFormArray.controls[index].setValue(true);
        } else {
          this.roleCheckboxFormArray.controls[index].setValue(false);
        }
      });
    } else {
      this.roleList.forEach((role, index) => {
        this.roleCheckboxFormArray.controls[index].setValue(false);
      });
    }
    this.setCheckboxFormValue();
  }

  // ROLE CHECKBOXES

  public checkboxChanged() {
    this.userEditForm.controls['position'].patchValue(5); // Custom
    this.setCheckboxFormValue();
  }

  private setCheckboxFormValue() {
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
    // console.log('event', event.target.checked);
    this.setInitialPasswordCheckboxStatus = event.target.checked;
  }

  // BUTTONS

  public save(): void {
    this.dialogRef.close([this.data.action, this.userEditForm.getRawValue(), this.roleListCheckboxArray]);
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
