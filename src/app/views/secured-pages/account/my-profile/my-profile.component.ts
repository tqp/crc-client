import { Component, OnInit } from '@angular/core';
import { MyProfileService } from './my-profile.service';
import { User } from '@tqp/models/User';
import { Token } from '@tqp/models/Token';
import { AuthService } from '@tqp/services/auth.service';
import { TokenService } from '@tqp/services/token.service';
import * as moment from 'moment';
import { DiagnosticsService } from '@tqp/services/diagnostics.service';

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

  constructor(private myProfileService: MyProfileService,
              private authService: AuthService,
              private diagnosticsService: DiagnosticsService,
              protected tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.getMyUserInfo();
    this.getTokenInformation();
    this.getEndpointTestsResults();
  }

  private getMyUserInfo(): any {
    this.myProfileService.getMyUserInfo().subscribe(
      response => {
        this.user = response;
        // console.log('user', this.user);
        this.user.createdOn = moment(this.user.createdOn).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
        this.user.updatedOn = moment(this.user.updatedOn).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
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

}
