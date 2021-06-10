import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { EventService } from '@tqp/services/event.service';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Student } from '../../../../../models/people/student.model';
import { CaregiverService } from '../../../../../services/people/caregiver.service';
import { Caregiver } from '../../../../../models/people/caregiver.model';
import { AuthService } from '@tqp/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caregiver-list',
  templateUrl: './caregiver-list.component.html',
  styleUrls: ['./caregiver-list.component.css']
})
export class CaregiverListComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('searchElementRef', {static: true}) searchElementRef: ElementRef;
  public windowWidth: number = window.innerWidth;
  public searchFormControl = new FormControl();

  public error = false;

  // Data Table
  public isLoading: boolean | undefined;
  public displayedColumns: any = [
    {col: 'caregiverName', showSmall: true},
    {col: 'caregiverPhone', showSmall: false},
    {col: 'caregiverEmail', showSmall: false},
    {col: 'caregiverAddress', showSmall: false},
    {col: 'studentCountString', showSmall: true},
    {col: 'caregiverMicrofinance', showSmall: false},
    {col: 'caregiverFamilySupport', showSmall: false},
  ];

  public dataSource: any;
  public recordCount = 0;
  public recordList: Student[] = [];

  constructor(private caregiverService: CaregiverService,
              private eventService: EventService,
              public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCaregiverList();
  }

  public getDisplayedColumns(): string[] {
    const smallScreen = this.windowWidth < 1400;
    return this.displayedColumns
      .filter(cd => !smallScreen || cd.showSmall)
      .map(cd => cd.col);
  }

  public getCaregiverList(): void {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.caregiverService.getCaregiverList().subscribe(
      (response: any | null) => {
        // console.log('response', response);
        if (response) {
          const caregiverList: Caregiver[] = response;
          // console.log('caregiverList', caregiverList);
          if (caregiverList) {
            caregiverList.forEach((item: Caregiver) => {
              item.caregiverName = item.caregiverGivenName + ' ' + item.caregiverSurname;
              item.studentCountString = item.studentCount.toString();
              this.recordList.push(item);
              this.recordCount = caregiverList.length;
            });

            // Default Sort
            this.recordList = this.recordList.sort((a, b) => {
              return a.caregiverGivenName.toLowerCase() + a.caregiverSurname.toLowerCase()
              < b.caregiverGivenName.toLowerCase() + b.caregiverSurname.toLowerCase() ? -1 : 1;
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
          const searchFilterAssessment_caregiverSurname = list.caregiverSurname.toLowerCase().includes(searchFilter.trim().toLowerCase());
          const searchFilterAssessment_caregiverGivenName = list.caregiverGivenName.toLowerCase().includes(searchFilter.trim().toLowerCase());
          return searchFilterAssessment_caregiverSurname || searchFilterAssessment_caregiverGivenName;
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

  public openCreateCaregiverPage(): void {
    this.router.navigate(['caregivers/caregiver-create']).then();
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
