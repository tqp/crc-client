import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '@tqp/services/token.service';
import { AuthService } from '@tqp/services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { TokenStorageService } from '@tqp/services/token-storage.service';
import { navItemsAdmin } from '../../_navAdmin';
import { navItemsUser } from '../../_navUser';
import { EventService } from '@tqp/services/event.service';
import { UserService } from '../../services/account/user.service';
import { User } from '../../models/User';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../../components/secured-pages/account/passwords/change-password-dialog/change-password-dialog.component';
import { NotificationService } from '@tqp/services/notification.service';
import { INavDataTqp } from '../../INavDataTqp';
import { navItemsWithRoles } from '../../_navWithRoles';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems: INavDataTqp[] = null;
  public showLoadingIndicator = false;
  public username: string;

  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private tokenStorageService: TokenStorageService,
              private notificationService: NotificationService,
              private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private eventService: EventService,
              public _matDialog: MatDialog) {
    const test = false;
    if (test) {
      this.navItems = navItemsWithRoles;
    }
  }

  ngOnInit(): void {
    // TQP20200318
    // If a token is present, get the User's info.
    // For the cases where the page may load before the token has been obtained,
    // watch for changes to the token Observable. When we have a token, load the data.
    // See token-storage.service.ts for the Observable.
    if (this.tokenService.getToken()) {
      this.setMenuByAuthorities(this.authService.getAuthoritiesFromToken());

      this.authService.getTokenInfo().subscribe(
        response => {
          // console.log('response', response);
          this.username = response.sub;
        },
        error => {
          console.error('Error: ', error);
          this.authService.errorHandler(error);
        }
      );

      this.userService.getUserDetailByUsername(this.username).subscribe(
        (response: User) => {
          // console.log('response', response);
          if (response.passwordReset === 1) {
            console.log('NEED TO RESET PASSWORD');
            this.openChangePasswordDialog(response.userId);
          }
        },
        error => {
          console.error('Error: ', error);
          this.authService.errorHandler(error);
        }
      );

    } else {
      this.tokenStorageService.tokenObs.subscribe(token => {
        this.setMenuByAuthorities(this.authService.getAuthoritiesFromToken());
      });
    }

    this.eventService.loadingEvent.subscribe((loadingStatus: boolean) => {
      this.showLoadingIndicator = loadingStatus;
    });
  }

  private setMenu(authorities: string): void {
    // console.log('authorities', authorities);
    if (authorities) {
      if (authorities.indexOf('ROLE_ADMIN') > -1) {
        this.navItems = navItemsAdmin;
      } else if (authorities.indexOf('ROLE_USER') > -1) {
        this.navItems = navItemsUser;
      } else {
        console.error('The authorities presented did not contain a matching role. ' + authorities);
        this.router.navigate(['/login-page'], {queryParams: {error: 'UsernameNotFoundException'}}).then();
      }
    } else {
      console.error('The authorities presented did not contain any roles.');
      this.router.navigate(['/login-page'], {queryParams: {error: 'UsernameNotFoundException'}}).then();
    }
  }

  private setMenuByAuthorities(authorities: string): void {
    const authoritiesArray = authorities.split(',');
    this.navItems = navItemsWithRoles;
    this.navItems = this.navItems.filter(item => {
      if (item.allow) {
        const allowArray = item.allow.split(' ').join('').split(',');
        const overlap = allowArray.filter(element => authoritiesArray.includes(element));
        return overlap.length > 0;
      } else {
        return false;
      }
    });
  }

  public openChangePasswordDialog(userId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      caseManagerUserId: userId,
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(ChangePasswordDialogComponent, dialogConfig);
    dialogRef.componentInstance.hideCancelButton = true;
    dialogRef.componentInstance.dialogMessage = 'Your password has been reset by a manager.\nPlease create a new password.';

    dialogRef.afterClosed().subscribe(dialogData => {
      if (dialogData) {
        const user: User = new User();
        user.userId = dialogData.userId;
        user.password = dialogData.newPassword;
        this.userService.updatePassword(user).subscribe(
          response => {
            console.log('response', response);
            this.notificationService.showSuccess('Your password has been changed.', 'Password Changed');
          },
          error => {
            console.error('Error: ', error);
          },
          () => {
            console.log('Password Reset.');
          }
        );
      }
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  public logout(): void {
    this.tokenService.clearToken();
    this.authService.clearTokenInfo();
    this.router.navigateByUrl('/login-page').then();
  }

  public openSwagger(): void {
    window.open(environment.apiUrl + '/swagger-ui.html', '_blank');
  }
}
