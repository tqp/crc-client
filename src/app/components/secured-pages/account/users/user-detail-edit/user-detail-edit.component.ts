import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../../../../../models/User';
import { UserService } from '../../../../../services/account/user.service';
import { RoleService } from '../../../../../services/account/role.service';
import { Role } from '../../../../../models/Role';
import { Position } from '../../../../../models/Position';
import { forkJoin } from 'rxjs';
import { NotificationService } from '@tqp/services/notification.service';
import { ResetPasswordDialogComponent } from '../../passwords/reset-password-dialog/reset-password-dialog.component';
import { PositionService } from '../../../../../services/account/position.service';
import { RelationshipService } from '../../../../../services/relationships/relationship.service';

@Component({
  selector: 'app-user-detail-edit',
  templateUrl: './user-detail-edit.component.html',
  styleUrls: ['./user-detail-edit.component.css']
})
export class UserDetailEditComponent implements OnInit {
  @ViewChild('userSurnameInputField', {static: false}) userSurnameInputField: ElementRef;
  public pageSource: string;
  public newRecord: boolean;
  public user: User;
  public userEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public caseManagerNumberOfStudents: number;
  public startedWithCaseManagerRole: boolean;

  // POSITION RADIO BUTTONS
  public positionList: Position[];

  // ROLE CHECKBOXES
  public roleList: Role[];
  public roleListCheckboxArray: Role[];

  get roleCheckboxFormArray() {
    return this.userEditForm.controls.roleCheckboxes as FormArray;
  }

  public validationMessages = {
    'userId': [
      {type: 'required', message: 'An ID is required.'}
    ],
    'username': [
      {type: 'required', message: 'A Username is required.'}
    ],
    'surname': [
      {type: 'required', message: 'A Surname is required.'}
    ],
    'givenName': [
      {type: 'required', message: 'A Given Name is required.'}
    ],
    'roleCheckboxes': [
      {type: 'minSelectedCheckboxes', message: 'At least one Role must be selected.'},
      {type: 'viewOrCaseManager', message: 'Users must have either the \'View Records\' or \'Case Manager\' Role.'},
      {type: 'viewAndCaseManager', message: 'Users cannot have both \'View Records\' and \'Case Manager\' Roles.'}
    ],
    'caseManagerNumberOfStudents': []
  };

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private roleService: RoleService,
              private positionService: PositionService,
              private relationshipService: RelationshipService,
              private notificationService: NotificationService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {

    this.getPositionList();

    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const userId = params['id'];
        // console.log('userId', userId);
        this.getUserDetail(userId);
      } else {
        // Create new Person
        this.newRecord = true;
        this.user = new User();
        this.user.userId = null;
        setTimeout(() => {
          this.userSurnameInputField.nativeElement.focus();
        }, 0);
      }
    }).then();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userEditForm = this.formBuilder.group({
      userId: new FormControl(''),
      username: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      givenName: new FormControl('', Validators.required),
      positionId: new FormControl('', Validators.required),
      caseManagerNumberOfStudents: new FormControl({value: '', disabled: false}),
      roles: new FormControl(''),
      roleCheckboxes: new FormArray([],
        [minSelectedCheckboxes(1)]),
    });
  }

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

  private getUserDetail(userId: number): void {
    const roles = this.roleService.getRoleList();
    const userDetail = this.userService.getUserDetail(userId);
    const caseManagerNumberOfStudents = this.relationshipService.getStudentListByCaseManagerId(userId);

    // We need to ensure that both the roles list and the userDetail come back before
    // trying to populate the checkboxes... so, we use forkJoin.
    forkJoin([roles, userDetail, caseManagerNumberOfStudents]).subscribe(response => {
      // console.log('response', response);

      // Use the roleList response
      this.roleList = response[0];
      this.addCheckboxes();

      this.user = response[1];
      // console.log('response', response);
      this.caseManagerNumberOfStudents = response[2].length;
      this.userEditForm.controls['userId'].patchValue(this.user.userId);
      this.userEditForm.controls['username'].patchValue(this.user.userUsername);
      this.userEditForm.controls['surname'].patchValue(this.user.userSurname);
      this.userEditForm.controls['givenName'].patchValue(this.user.userGivenName);
      this.userEditForm.controls['positionId'].patchValue(this.user.positionId);
      this.userEditForm.controls['caseManagerNumberOfStudents'].patchValue(this.caseManagerNumberOfStudents);

      // Populate Checkboxes
      const roleCheckboxArray = this.user.roles;
      this.roleList.forEach((role, index) => {
        if (roleCheckboxArray.findIndex(x => x.roleId === role.roleId) > -1) {
          this.roleCheckboxFormArray.controls[index].setValue(true);
        }
      });
      this.setInitialCheckboxFormValue();
    });
  }

  private prepareCreatePage(): void {
    const servicesProvided = this.roleService.getRoleList();
    servicesProvided.subscribe(response => {
      this.roleList = response;
      this.addCheckboxes();
    });
  }

  private addCheckboxes() {
    // console.log('this.roleList', this.roleList);
    this.roleList.forEach(() => {
      const formArray = this.userEditForm.controls.roleCheckboxes as FormArray;
      return formArray.push(new FormControl(false));
    });
  }

  public setInitialCheckboxFormValue(): void {
    this.setCheckboxFormValue();
    // console.log('this.roleListCheckboxArray', this.roleListCheckboxArray);
    this.startedWithCaseManagerRole = this.roleListCheckboxArray.find(role => role.roleId === 15).status;
    // console.log('this.startedWithCaseManagerRole', this.startedWithCaseManagerRole);
  }

  public updateCheckboxFormValue(): void {
    this.userEditForm.controls['positionId'].patchValue(5); // Custom
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

  // BUTTONS

  public delete(user: User): void {
    // Prevent Case Manager Role change if Students are currently assigned.
    const hasCaseManagerRoleNow = this.roleListCheckboxArray.find(role => role.roleId === 5).status;
    if ((this.startedWithCaseManagerRole === true && hasCaseManagerRoleNow === false) && this.caseManagerNumberOfStudents > 0) {
      this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
        disableClose: false,
        minWidth: '30%'
      });
      this.confirmDialogRef.componentInstance.mainButtonText = 'Okay';
      this.confirmDialogRef.componentInstance.hideCancelButton = true;
      this.confirmDialogRef.componentInstance.dialogTitle = 'Case Manager Has Active Students';
      this.confirmDialogRef.componentInstance.dialogMessage = 'You must re-assign students before changing Roles for this User.';
      this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.confirmDialogRef.close();
        }
      });
    } else {
      this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
        disableClose: false
      });
      this.confirmDialogRef.componentInstance.dialogTitle = 'Delete User';
      this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete this user?';
      this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.userService.deleteUser(user).subscribe(
            () => {
              this.router.navigate(['users/user-list']).then();
            },
            error => {
              console.error('Error: ' + error.message);
            }
          );
        }
        this.confirmDialogRef = null;
      });
    }
  }

  // public validateViewAndCaseManager(): boolean {
  //   const roleUser = this.roleListCheckboxArray.find(role => role.roleId === 1).status;
  //   const roleCaseManager = this.roleListCheckboxArray.find(role => role.roleId === 5).status;
  //   return roleUser && roleCaseManager;
  // }
  //
  // public validateViewOrCaseManager(): boolean {
  //   const roleUser = this.roleListCheckboxArray.find(role => role.roleId === 1).status;
  //   const roleCaseManager = this.roleListCheckboxArray.find(role => role.roleId === 5).status;
  //   return !roleUser && !roleCaseManager;
  // }

  public save(): void {
    // Prevent Case Manager Role change if Students are currently assigned.
    // console.log('roleListCheckboxArray', this.roleListCheckboxArray);
    const hasCaseManagerRoleNow = this.roleListCheckboxArray.find(role => role.roleId === 15);
    if ((this.startedWithCaseManagerRole === true && hasCaseManagerRoleNow.status === false) && this.caseManagerNumberOfStudents > 0) {
      this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
        disableClose: false,
        minWidth: '30%'
      });
      this.confirmDialogRef.componentInstance.mainButtonText = 'Okay';
      this.confirmDialogRef.componentInstance.hideCancelButton = true;
      this.confirmDialogRef.componentInstance.dialogTitle = 'Case Manager Has Active Students';
      this.confirmDialogRef.componentInstance.dialogMessage = 'You must re-assign students before changing Roles for this User.';
      this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.confirmDialogRef.close();
        }
      });
    } else {
      this.performSave();
    }
  }

  private performSave(): void {
    const user = new User();
    user.userId = this.userEditForm.value.userId;
    user.userUsername = this.userEditForm.value.username;
    user.userSurname = this.userEditForm.value.surname;
    user.userGivenName = this.userEditForm.value.givenName;
    user.rolesString = this.userEditForm.value.roles;
    user.positionId = this.userEditForm.value.positionId;
    user.roles = this.roleListCheckboxArray;

    if (this.newRecord) {
      this.userService.createUser(user).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['users/user-detail', response.userId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.userService.updateUser(user).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['users/user-detail', response.userId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );

    }
  }

  public cancel(): void {
    if (this.user.userId) {
      this.router.navigate(['users/user-detail', this.user.userId]).then();
    } else {
      this.router.navigate(['users/user-list']).then();
    }
  }

  public openResetPasswordDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      userId: this.user.userId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(ResetPasswordDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      if (dialogData) {
        const user: User = new User();
        user.userId = dialogData.userId;
        user.password = dialogData.newPassword;
        this.userService.resetPassword(user).subscribe(
          response => {
            console.log('response', response);
            this.notificationService.showSuccess('The password has been changed.', 'Password Changed');
          },
          error => {
            console.error('Error: ', error);
          },
          () => {
            console.log('done');
          }
        );
      }
    });
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.save();
    }
    if (event.key === 'Escape') {
      this.cancel();
    }
  }

}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : {minSelectedCheckboxes: true};
  };
  return validator;
}
