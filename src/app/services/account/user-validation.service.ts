import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { MyProfileService } from './my-profile.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserValidationService {

  constructor(private myProfileService: MyProfileService,
              private userService: UserService) { }

  public currentPasswordValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const user = new UserModel();
      user.password = control.value;
      return timer(500).pipe(
        switchMap(() => {
          return this.myProfileService.confirmPassword(user).pipe(
            first(),
            map(
              result => {
                if (!result) {
                  return {currentPasswordValidator: true};
                } else {
                  return null;
                }
              }
            )
          );
        })
      );
    };
  }

  public existingUsernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return timer(500).pipe(
        switchMap(() => {
          return this.userService.getUserDetailByUsername(control.value).pipe(
            first(),
            map(
              result => {
                if (result) {
                  return {existingUsernameValidator: true};
                } else {
                  return null;
                }
              }, error => {
                console.error('Error: ', error);
              }
            )
          );
        })
      );
    };
  }
}
