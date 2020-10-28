import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ServerSidePaginationRequest } from '../../../../../../@tqp/models/ServerSidePaginationRequest';
import { FormControl } from '@angular/forms';
import { CaregiverService } from '../caregiver.service';
import { EventService } from '../../../../../../@tqp/services/event.service';
import { Router } from '@angular/router';
import { ServerSidePaginationResponse } from '../../../../../../@tqp/models/ServerSidePaginationResponse';
import { merge, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { Caregiver } from '../Caregiver';
import { AuthService } from '../../../../../../@tqp/services/auth.service';

@Component({
  selector: 'app-caregiver-list',
  templateUrl: './caregiver-list.component.html',
  styleUrls: ['./caregiver-list.component.css']
})
export class CaregiverListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('tableContainer', {read: ElementRef, static: true}) public matTableRef: ElementRef;
  @ViewChild('dialogContent', {static: true}) public dialogRef: any;
  @ViewChild('nameSearchElementRef', {static: true}) nameSearchElementRef: ElementRef;

  public listTitle = 'Caregiver List';
  private pageIndex = 0;
  public pageSize = 10;
  private totalNumberOfPages: number;
  private searchParams: ServerSidePaginationRequest = new ServerSidePaginationRequest();

  public displayedColumns: string[] = [
    'caregiverSurname',
    'caregiverGivenName',
    'caregiverPhone',
    'caregiverEmail',
    'caregiverAddress',
    'caregiverNumberOfStudents',
    'caregiverMicrofinance',
    'caregiverFamilySupport'
  ];

  public caregiverListNameSearchFormControl = new FormControl();

  public records: Caregiver[] = [];
  public dataSource: any[] = [];
  public stateList: string[] = [];

  public totalRecords: number;
  public pageStart: number;
  public pageEnd: number;
  public loadedFirstPage = false;
  public isLoading = false;

  public isFilterApplied = false;

  constructor(private caregiverService: CaregiverService,
              private eventService: EventService,
              private router: Router,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.setInitialFieldValues();
    this.getPage(this.searchParams);
    this.listenForChanges();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.caregiverService.setCaregiverListNameSearchValue(this.caregiverListNameSearchFormControl.value);
  }

  private calculateTableSize(): number {
    const pixelsAboveTable = 295;
    const pixelsBelowTable = 80; // 62
    const rowHeight = 48;
    this.pageSize = Math.round((window.innerHeight.valueOf() - pixelsAboveTable - pixelsBelowTable) / rowHeight);
    return this.pageSize;
  }

  private setInitialFieldValues(): void {
    this.searchParams.nameFilter = null;
    this.searchParams.stateFilter = '';
    this.searchParams.pageIndex = this.pageIndex;
    this.searchParams.pageSize = this.calculateTableSize();
    this.searchParams.sortColumn = null;
    this.searchParams.sortDirection = 'asc';

    if (this.caregiverService.getCaregiverListNameSearchValue()) {
      const nameSearchValue = this.caregiverService.getCaregiverListNameSearchValue();
      this.caregiverListNameSearchFormControl.setValue(nameSearchValue);
      this.searchParams.nameFilter = nameSearchValue;
    }
  }

  private getPage(searchParams: ServerSidePaginationRequest) {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.caregiverService.getCaregiverList_SSP(searchParams).subscribe((response: ServerSidePaginationResponse<Caregiver>) => {
        // console.log('getPage response', response);
        response.data.forEach(item => {
          this.records.push(item);
        }, error => {
          console.error('Error: ', error);
          this.isLoading = false;
          this.eventService.loadingEvent.emit(false);
        });
        this.loadedFirstPage = true;
        this.pageStart = ((this.paginator.pageIndex + 1) - 1) * this.paginator.pageSize + 1;
        this.totalRecords = response.totalRecords;
        const pageEnd = this.pageStart + this.paginator.pageSize - 1;
        this.pageEnd = pageEnd >= this.totalRecords ? this.totalRecords : pageEnd;
        this.totalNumberOfPages = Math.ceil(this.totalRecords / this.pageSize);
        this.dataSource = this.records;
        this.isLoading = false;
        this.eventService.loadingEvent.emit(false);
      }, error => {
        console.error('Error: ', error);
        this.isLoading = false;
        this.eventService.loadingEvent.emit(false);
      }
    );
  }

  private listenForChanges(): void {
    merge(
      this.caregiverListNameSearchFormControl.valueChanges.pipe(debounceTime(100)),
      this.sort.sortChange,
      this.paginator.page
    )
      .pipe(
        switchMap(changesDetected => {
          // console.log('changesDetected', changesDetected);
          const paginationChange: boolean = changesDetected.pageIndex && changesDetected.pageSize;
          const sortChange: boolean = changesDetected.active && changesDetected.direction;
          if (!paginationChange && !sortChange) {
            this.paginator.pageIndex = 0; // Reset pagination when a filter change is made.
          }
          this.isLoading = true;
          this.eventService.loadingEvent.emit(true);

          const nameFilter = this.caregiverListNameSearchFormControl.value != null ? this.caregiverListNameSearchFormControl.value : '';

          // Translate table columns to database columns for sorting.
          // IMPORTANT: If this translation is incorrect, the query will break!!!
          const translateSortColumnsToDatabaseColumns = {
            seriesName: null
          };

          const serverSideSearchParams: ServerSidePaginationRequest = new ServerSidePaginationRequest();
          serverSideSearchParams.nameFilter = nameFilter;
          serverSideSearchParams.pageIndex = this.paginator.pageIndex;
          serverSideSearchParams.pageSize = this.pageSize;
          serverSideSearchParams.sortColumn = (translateSortColumnsToDatabaseColumns[this.sort.active] != null) ?
            translateSortColumnsToDatabaseColumns[this.sort.active] : null;
          serverSideSearchParams.sortDirection = this.sort.direction;
          this.searchParams = serverSideSearchParams;

          this.isFilterApplied = nameFilter;
          return this.caregiverService.getCaregiverList_SSP(serverSideSearchParams);
        }),
        map((response: ServerSidePaginationResponse<Caregiver>) => {
          return response;
        }),
        catchError((error: any) => {
          this.isLoading = false;
          this.eventService.loadingEvent.emit(false);
          console.error('Error Encountered: ', error);
          return of([]);
        })
      )
      .subscribe((response: ServerSidePaginationResponse<Caregiver>) => {
          this.records = [];
          response.data.forEach(item => {
            this.records.push(item);
          }, error => {
            console.error('Error: ', error);
            this.isLoading = false;
            this.eventService.loadingEvent.emit(false);
          });
          this.pageStart = ((this.paginator.pageIndex + 1) - 1) * this.paginator.pageSize + 1;
          this.totalRecords = response.totalRecords;
          const pageEnd = this.pageStart + this.paginator.pageSize - 1;
          this.pageEnd = pageEnd >= this.totalRecords ? this.totalRecords : pageEnd;
          this.totalNumberOfPages = Math.ceil(this.totalRecords / this.pageSize);
          this.dataSource = this.records;
          this.isLoading = false;
          this.eventService.loadingEvent.emit(false);
        },
        error => {
          this.isLoading = false;
          this.eventService.loadingEvent.emit(false);
          console.error('Error: ', error.message);
        }
      );
  }

  public clearFilters(): void {
    this.caregiverListNameSearchFormControl.setValue('');
  }

  public openCreateCaregiverPage(): void {
    this.router.navigate(['caregivers/caregiver-create']).then();
  }

  public openDetailPage(row: any): void {
    this.router.navigate(['caregivers/caregiver-detail', row.caregiverId]).then();
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      this.caregiverListNameSearchFormControl.setValue('');
      this.nameSearchElementRef.nativeElement.focus();
    }
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault();
      this.openCreateCaregiverPage();
    }
    if (event.ctrlKey && event.key === ',') {
      event.preventDefault();
      // console.log('next', this.paginator.pageIndex);
      // this.paginator.pageIndex = 0;
    }
    if (event.ctrlKey && event.key === '.') {
      event.preventDefault();
      // console.log('next', this.paginator.pageIndex);
    }
  }
}
