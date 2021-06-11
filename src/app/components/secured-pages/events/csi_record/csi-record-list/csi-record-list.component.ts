import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { EventService } from '@tqp/services/event.service';
import { AuthService } from '@tqp/services/auth.service';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CsiRecord } from '../../../../../models/csi-record.model';
import { CsiRecordService } from '../../../../../services/events/csi-record.service';

@Component({
  selector: 'app-csi-record-list',
  templateUrl: './csi-record-list.component.html',
  styleUrls: ['./csi-record-list.component.css']
})
export class CsiRecordListComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('searchElementRef', {static: true}) searchElementRef: ElementRef;
  public windowWidth: number = window.innerWidth;
  public searchFormControl = new FormControl();

  public error = false;

  // Data Table
  public isLoading: boolean | undefined;
  public displayedColumns: any = [
    {col: 'csiRecordDate', showSmall: true},
    {col: 'studentName', showSmall: true},
    {col: 'caseManagerName', showSmall: true},
  ];

  public dataSource: any;
  public recordCount = 0;
  public recordList: CsiRecord[] = [];

  constructor(private csiRecordService: CsiRecordService,
              private eventService: EventService,
              public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCsiRecordList();
  }

  public getDisplayedColumns(): string[] {
    const smallScreen = this.windowWidth < 1400;
    return this.displayedColumns
      .filter(cd => !smallScreen || cd.showSmall)
      .map(cd => cd.col);
  }

  public getCsiRecordList(): void {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.csiRecordService.getCsiRecordList().subscribe(
      (response: any | null) => {
        // console.log('response', response);
        if (response) {
          const csiRecordList: CsiRecord[] = response;
          // console.log('csiRecordList', csiRecordList);
          if (csiRecordList) {
            csiRecordList.forEach((item: CsiRecord) => {
              item.studentName = item.studentGivenName + ' ' + item.studentSurname;
              item.caseManagerName = item.caseManagerGivenName + ' ' + item.caseManagerSurname;
              this.recordList.push(item);
              this.recordCount = csiRecordList.length;
            });

            // Default Sort
            this.recordList = this.recordList.sort((a, b) => {
              return a.csiRecordDate.toLowerCase() > b.csiRecordDate.toLowerCase() ? -1 : 1;
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
          const searchFilterAssessment_csiRecordStudentName = list.studentName.toLowerCase().includes(searchFilter.trim().toLowerCase());
          const searchFilterAssessment_csiRecordCaseManagerName = list.caseManagerName.toLowerCase().includes(searchFilter.trim().toLowerCase());
          return searchFilterAssessment_csiRecordStudentName || searchFilterAssessment_csiRecordCaseManagerName;
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

  public openCreateCsiRecordPage(): void {
    this.router.navigate(['csiRecords/csiRecord-create']).then();
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
