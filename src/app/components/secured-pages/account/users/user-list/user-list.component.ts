import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { EventService } from '@tqp/services/event.service';
import { AuthService } from '@tqp/services/auth.service';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from '../../../../../models/User';
import { UserService } from '../../../../../services/account/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('searchElementRef', {static: true}) searchElementRef: ElementRef;
  public windowWidth: number = window.innerWidth;
  public searchFormControl = new FormControl();

  public error = false;

  // Data Table
  public isLoading: boolean | undefined;
  public displayedColumns: any = [
    {col: 'userName', showSmall: false},
    {col: 'userUsername', showSmall: true},
    {col: 'lastLogin', showSmall: false},
    {col: 'loginCount', showSmall: false},
    {col: 'director', showSmall: true},
    {col: 'm&e', showSmall: true},
    {col: 'leadCaseManager', showSmall: true},
    {col: 'caseManager', showSmall: true},
    {col: 'hcwCrcStaff', showSmall: true},
    {col: 'custom', showSmall: true}
  ];

  public userListDataSource: any;
  public userListRecordCount = 0;
  public userListRecords: User[] = [];

  constructor(private userService: UserService,
              private eventService: EventService,
              public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getUserList();
  }

  public getDisplayedColumns(): string[] {
    const smallScreen = this.windowWidth < 1400;
    return this.displayedColumns
      .filter(cd => !smallScreen || cd.showSmall)
      .map(cd => cd.col);
  }

  public getUserList(): void {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.userService.getUserList().subscribe(
      (response: any | null) => {
        // console.log('response', response);
        if (response) {
          const userList: User[] = response;
          // console.log('userList', userList);
          if (userList) {
            userList.forEach((item: User) => {
              item.userName = item.userGivenName + ' ' + item.userSurname;
              this.userListRecords.push(item);
              this.userListRecordCount = userList.length;
            });

            // Default Sort
            this.userListRecords = this.userListRecords.sort((a, b) => {
              return a.userName.toLowerCase() < b.userName.toLowerCase() ? -1 : 1;
            });

            setTimeout(() => {
              this.userListDataSource = this.userListRecords;
              this.isLoading = false;
              this.eventService.loadingEvent.emit(false);
              this.listenForFilterChanges();
            }, 0);
          }
        }
      }, (error: any) => {
        this.error = error.message;
        console.error('Error: ', error.message);
        this.isLoading = false;
        this.eventService.loadingEvent.emit(false);
      }, () => {
      }
    );
  }

  private listenForFilterChanges(): void {
    merge(
      this.searchFormControl.valueChanges.pipe(debounceTime(100)),
      this.sort.sortChange
    ).subscribe(() => {
        this.applyFilters();
      },
      error => {
        this.isLoading = false;
        this.eventService.loadingEvent.emit(false);
        console.error('Error: ', error.message);
      },
      () => {
      }
    );
  }

  private applyFilters(): void {
    const searchFilter = this.searchFormControl.value != null ? this.searchFormControl.value : '';

    this.userListDataSource = this.userListRecords
      .filter(list => {
          const searchFilterAssessment_userName = list.userName.toLowerCase().includes(searchFilter.trim().toLowerCase());
          const searchFilterAssessment_userUsername = list.userUsername.toLowerCase().includes(searchFilter.trim().toLowerCase());
          return searchFilterAssessment_userName || searchFilterAssessment_userUsername;
        }
      )
      .sort((a, b) => {
          // console.log('sort', this.sort.active, this.sort.direction);
          if (this.sort.direction === 'asc') {
            return (a[this.sort.active].toLowerCase() > b[this.sort.active].toLowerCase()) ? 1 : -1;
          } else {
            return (a[this.sort.active].toLowerCase() < b[this.sort.active].toLowerCase()) ? 1 : -1;
          }
        }
      );

    // this.isFilterApplied = nameFilter;
    this.isLoading = false;
    this.eventService.loadingEvent.emit(false);
  }

  // BUTTONS

  public clearFilters(): void {
    this.searchFormControl.setValue('');
  }

  public openUserCreateDialog(): void {
    this.router.navigate(['users/user-create']).then();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth;
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    // console.log(event + ' (' + event.key + ')');

    // CTRL + F
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      this.searchElementRef.nativeElement.focus();
    }
  }

}
