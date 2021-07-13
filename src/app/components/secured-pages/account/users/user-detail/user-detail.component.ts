import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../services/account/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '@tqp/services/auth.service';
import { User } from '../../../../../models/user.model';
import { Token } from '@tqp/models/Token';
import { MatDialog } from '@angular/material/dialog';
import { tqpCustomAnimations } from '@tqp/animations/tqpCustomAnimations';
import { RoleService } from '../../../../../services/account/role.service';
import { Role } from '../../../../../models/role.model';
import * as moment from 'moment';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  animations: [tqpCustomAnimations]
})
export class UserDetailComponent implements OnInit {
  public user: User;
  public userLoading: boolean = false;
  public decodedToken: Token;

  public statusTranslate = {0: 'Active', 1: 'Deleted'};

  // User-Roles List
  public roleListLoading: boolean = false;
  public roleListIsCollapsed: boolean = false;
  public roleListRecords: Role[] = [];
  public roleListDataSource: Role[] = [];
  public roleListDisplayedColumns: string[] = [
    'roleName'
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private roleService: RoleService,
              public authService: AuthService,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const userId = params['id'];
        // console.log('userId', userId);
        this.getUserDetail(userId);
        this.getRoleListByUserId(userId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getUserDetail(userId: number): any {
    this.userService.getUserDetail(userId).subscribe(
      response => {
        // console.log('response', response);
        this.user = response;
        this.user.createdOn = moment(this.user.createdOn).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
        this.user.updatedOn = moment(this.user.updatedOn).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
        this.user.passwordSet = this.user.passwordSet = null ? null : moment(this.user.passwordSet).format('DD-MMM-YYYY h:mm:ss a').toUpperCase();
      },
      error => {
        console.error('Error: ', error);
        // this.authService.errorHandler(error);
      }
    );
  }

  private getRoleListByUserId(userId: number): void {
    this.roleListLoading = true;
    this.roleService.getRoleListByUserId(userId).subscribe(
      (roleList: Role[]) => {
        // console.log('roleList', roleList);
        this.roleListRecords = [];
        if (roleList) {
          roleList.forEach(item => {
            this.roleListRecords.push(item);
          });
          this.roleListDataSource = this.roleListRecords;
          this.roleListLoading = false;
        }
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public toggleVisitListIsCollapsed(event) {
    if (event.target.nodeName === 'SMALL') {
      return;
    }
    this.roleListIsCollapsed = !this.roleListIsCollapsed;
  }

  public returnToList(): void {
    this.router.navigate(['users/user-list']).then();
  }

  public openUserEditPage(): void {
    this.router.navigate(['users/user-detail-edit', this.user.userId]).then();
  }

}
