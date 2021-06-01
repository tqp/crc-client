import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { EventService } from '@tqp/services/event.service';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CaseManager } from '../../../../../models/people/case-manager.model';
import { CaseManagerService } from '../../../../../services/people/case-manager.service';
import { AuthService } from '@tqp/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-manager-list',
  templateUrl: './case-manager-list.component.html',
  styleUrls: ['./case-manager-list.component.css']
})
export class CaseManagerListComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('searchElementRef', {static: true}) searchElementRef: ElementRef;
  public windowWidth: number = window.innerWidth;
  public searchFormControl = new FormControl();

  public error = false;

  // Data Table
  public isLoading: boolean | undefined;
  public displayedColumns: any = [
    {col: 'caseManagerName', showSmall: true},
    {col: 'caseManagerPhone', showSmall: false},
    {col: 'caseManagerEmail', showSmall: false},
    {col: 'caseManagerNumberOfStudents', showSmall: true}
  ];

  public dataSource: any;
  public recordCount = 0;
  public recordList: CaseManager[] = [];

  constructor(private caseManagerService: CaseManagerService,
              private eventService: EventService,
              public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCaseManagerList();
  }

  public getDisplayedColumns(): string[] {
    const smallScreen = this.windowWidth < 1400;
    return this.displayedColumns
      .filter(cd => !smallScreen || cd.showSmall)
      .map(cd => cd.col);
  }

  public getCaseManagerList(): void {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.caseManagerService.getCaseManagerList().subscribe(
      (response: any | null) => {
        // console.log('response', response);
        if (response) {
          const caseManagerList: CaseManager[] = response;
          // console.log('caseManagerList', caseManagerList);
          if (caseManagerList) {
            caseManagerList.forEach((item: CaseManager) => {
              item.caseManagerName = item.caseManagerGivenName + ' ' + item.caseManagerSurname;
              item.caregiverName = item.caregiverGivenName + ' ' + item.caregiverSurname;
              this.recordList.push(item);
              this.recordCount = caseManagerList.length;
            });

            // Default Sort
            this.recordList = this.recordList.sort((a, b) => {
              return a.caseManagerGivenName.toLowerCase() + a.caseManagerSurname.toLowerCase()
              < b.caseManagerGivenName.toLowerCase() + b.caseManagerSurname.toLowerCase() ? -1 : 1;
            });

            setTimeout(() => {
              this.dataSource = this.recordList;
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

    this.dataSource = this.recordList
      .filter(list => {
          const searchFilterAssessment_caseManagerSurname = list.caseManagerSurname.toLowerCase().includes(searchFilter.trim().toLowerCase());
          const searchFilterAssessment_caseManagerGivenName = list.caseManagerGivenName.toLowerCase().includes(searchFilter.trim().toLowerCase());
          return searchFilterAssessment_caseManagerSurname || searchFilterAssessment_caseManagerGivenName;
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

  public openCreateCaseManagerPage(): void {
    this.router.navigate(['case-managers/case-manager-create']).then();
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
