import { Component, HostListener, OnInit } from '@angular/core';
import { MyProfileService } from './my-profile.service';
import { User } from 'app/views/secured-pages/account/users/User';
import { Token } from '@tqp/models/Token';
import { AuthService } from '@tqp/services/auth.service';
import { TokenService } from '@tqp/services/token.service';
import { DiagnosticsService } from '@tqp/services/diagnostics.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../passwords/change-password-dialog/change-password-dialog.component';
import { NotificationService } from '@tqp/services/notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  public user: User;
  public decodedToken: Token;

  public openTestResult = 'Blocked';
  public userTestResult = 'Blocked';
  public managerTestResult = 'Blocked';
  public adminTestResult = 'Blocked';
  public developerTestResult = 'Blocked';

  public screenWidth: number;
  public screenHeight: number;

  public statusTranslate = {0: 'Active', 1: 'Deleted'};

  constructor(private myProfileService: MyProfileService,
              private authService: AuthService,
              private diagnosticsService: DiagnosticsService,
              private notificationService: NotificationService,
              protected tokenService: TokenService,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getScreenDimensions();
    this.getMyUserInfo();
    this.getTokenInformation();
    this.getEndpointTestsResults();
  }

  private getScreenDimensions(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  private getMyUserInfo(): any {
    this.myProfileService.getMyUserInfo().subscribe(
      response => {
        this.user = response;
        // console.log('user', this.user);
        this.user.lastLogin = this.user.lastLogin === null ? null : moment(moment.utc(this.user.lastLogin)).local().format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
        this.user.passwordSet = this.user.passwordSet === null ? null : moment(moment.utc(this.user.passwordSet)).local().format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
        this.user.createdOn = this.user.createdOn === null ? null : moment(moment.utc(this.user.createdOn)).local().format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
        this.user.updatedOn = this.user.updatedOn === null ? null : moment(moment.utc(this.user.updatedOn)).local().format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
      },
      error => {
        console.error('Error: ', error);
        // this.authService.errorHandler(error);
      }
    );
  }

  private getTokenInformation(): any {
    this.authService.getTokenInfo().subscribe(
      response => {
        this.decodedToken = response;
        // console.log('decodedToken', this.decodedToken);
        this.decodedToken.authorities = this.decodedToken.authorities.replace(/,/g, ', ');
        this.decodedToken.iatText = moment(this.decodedToken.iat * 1000).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
        this.decodedToken.expText = moment(this.decodedToken.exp * 1000).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
      },
      error => {
        console.error('Error: ', error);
        this.authService.errorHandler(error);
      }
    );
  }

  public openChangePasswordDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      userId: this.user.userId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(ChangePasswordDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      if (dialogData) {
        const user: User = new User();
        user.userId = dialogData.userId;
        user.password = dialogData.newPassword;
        this.myProfileService.updatePassword(user).subscribe(
          response => {
            console.log('response', response);
            this.notificationService.showSuccess('Your password has been changed.', 'Password Changed');
          },
          error => {
            console.error('Error: ', error);
          },
          () => {
            this.getMyUserInfo();
          }
        );
      }
    });
  }

  private getEndpointTestsResults(): void {
    // console.log('MyProfileComponent -> getEndpointTestsResults');
    this.diagnosticsService.getOpenEndpoint().subscribe(
      data => {
        this.openTestResult = data.value;
      },
      error => {
        console.error('Error: ', error);
        // this.authService.errorHandler(error);
      }
    );

    this.diagnosticsService.getUserEndpoint().subscribe(
      data => {
        this.userTestResult = data.value;
      },
      error => {
        console.error('Error: ', error);
        // this.authService.errorHandler(error);
      }
    );

    this.diagnosticsService.getManagerEndpoint().subscribe(
      data => {
        this.managerTestResult = data.value;
      },
      error => {
        console.error('Error: ', error);
        // this.authService.errorHandler(error);
      }
    );

    this.diagnosticsService.getAdminEndpoint().subscribe(
      data => {
        this.adminTestResult = data.value;
      },
      error => {
        console.error('Error: ', error);
        // this.authService.errorHandler(error);
      }
    );

    this.diagnosticsService.getDeveloperEndpoint().subscribe(
      data => {
        this.developerTestResult = data.value;
      },
      error => {
        console.error('Error: ', error);
        // this.authService.errorHandler(error);
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

}
