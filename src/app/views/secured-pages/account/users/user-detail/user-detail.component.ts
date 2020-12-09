import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../../../../@tqp/services/auth.service';
import { User } from '../User';
import { Token } from '../../../../../../@tqp/models/Token';
import { TokenService } from '../../../../../../@tqp/services/token.service';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentCaregiverEditDialogComponent } from '../../../relationships/student-caregiver-edit-dialog/student-caregiver-edit-dialog.component';
import { Relationship } from '../../../relationships/Relationship';
import { UserDetailEditDialogComponent } from '../user-detail-edit-dialog/user-detail-edit-dialog.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public user: User;
  public userLoading: boolean = false;
  public decodedToken: Token;

  public statusTranslate = {0: 'Active', 1: 'Deleted'};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              public authService: AuthService,
              private tokenService: TokenService,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const userId = params['id'];
        // console.log('userId', userId);
        this.getUserDetail(userId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getUserDetail(userId: number): any {
    this.userService.getUserDetail(userId).subscribe(
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

  // BUTTONS

  public returnToList(): void {
    this.router.navigate(['users/user-list']).then();
  }

  public openUserEditPage(): void {
    this.router.navigate(['users/user-detail-edit', this.user.userId]).then();
  }

}
