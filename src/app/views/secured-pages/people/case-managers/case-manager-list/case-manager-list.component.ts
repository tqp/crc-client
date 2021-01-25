import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ServerSidePaginationRequest } from '../../../../../../@tqp/models/ServerSidePaginationRequest';
import { FormControl } from '@angular/forms';
import { EventService } from '../../../../../../@tqp/services/event.service';
import { Router } from '@angular/router';
import { ServerSidePaginationResponse } from '../../../../../../@tqp/models/ServerSidePaginationResponse';
import { fromEvent, merge, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { CaseManager } from '../CaseManager';
import { CaseManagerService } from '../case-manager.service';
import { AuthService } from '../../../../../../@tqp/services/auth.service';

@Component({
  selector: 'app-case-manager-list',
  templateUrl: './case-manager-list.component.html',
  styleUrls: ['./case-manager-list.component.css']
})
export class CaseManagerListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('tableContainer', {read: ElementRef, static: true}) public matTableRef: ElementRef;
  @ViewChild('dialogContent', {static: true}) public dialogRef: any;
  @ViewChild('nameSearchElementRef', {static: true}) nameSearchElementRef: ElementRef;
  public windowWidth: number = window.innerWidth;
  public listTitle = 'Case Manager List';
  private pageIndex = 0;
  public pageSize = 10;
  private totalNumberOfPages: number;
  private searchParams: ServerSidePaginationRequest = new ServerSidePaginationRequest();

  public displayedColumns: any = [
    {col: 'caseManagerName', showSmall: true},
    {col: 'caseManagerPhone', showSmall: false},
    {col: 'caseManagerEmail', showSmall: false},
    {col: 'caseManagerNumberOfStudents', showSmall: true}
  ];

  public caseManagerListNameSearchFormControl = new FormControl();

  public records: CaseManager[] = [];
  public dataSource: any[] = [];
  public stateList: string[] = [];

  public totalRecords: number;
  public pageStart: number;
  public pageEnd: number;
  public loadedFirstPage = false;
  public isLoading = false;

  public isFilterApplied = false;

  constructor(private caseManagerService: CaseManagerService,
              private eventService: EventService,
              private router: Router,
              public authService: AuthService) {
    this.initWindowResizeListener();
  }

  ngOnInit(): void {
    this.setInitialFieldValues();
    this.getPage(this.searchParams);
    this.listenForChanges();
  }

  ngOnDestroy(): void {
    this.caseManagerService.setCaseManagerListNameSearchValue(this.caseManagerListNameSearchFormControl.value);
  }

  public getDisplayedColumns(): string[] {
    const smallScreen = this.windowWidth < 1400;
    return this.displayedColumns
      .filter(cd => !smallScreen || cd.showSmall)
      .map(cd => cd.col);
  }

  public initWindowResizeListener(): void {
    fromEvent(window, 'resize').pipe(
      debounceTime(300),
      distinctUntilChanged()).subscribe(
      () => {
        this.ngOnInit();
      }
    );
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

    if (this.caseManagerService.getCaseManagerListNameSearchValue()) {
      const nameSearchValue = this.caseManagerService.getCaseManagerListNameSearchValue();
      this.caseManagerListNameSearchFormControl.setValue(nameSearchValue);
      this.searchParams.nameFilter = nameSearchValue;
    }
  }

  private getPage(searchParams: ServerSidePaginationRequest) {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.caseManagerService.getCaseManagerList_SSP(searchParams).subscribe((response: ServerSidePaginationResponse<CaseManager>) => {
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
      this.caseManagerListNameSearchFormControl.valueChanges.pipe(debounceTime(100)),
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

          const nameFilter = this.caseManagerListNameSearchFormControl.value != null ? this.caseManagerListNameSearchFormControl.value : '';

          // Translate table columns to database columns for sorting.
          // IMPORTANT: If this translation is incorrect, the query will break!!!
          const translateSortColumnsToDatabaseColumns = {
            caseManagerNumberOfStudents: 'student_count',
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
          return this.caseManagerService.getCaseManagerList_SSP(serverSideSearchParams);
        }),
        map((response: ServerSidePaginationResponse<CaseManager>) => {
          return response;
        }),
        catchError((error: any) => {
          this.isLoading = false;
          this.eventService.loadingEvent.emit(false);
          console.error('Error Encountered: ', error);
          return of([]);
        })
      )
      .subscribe((response: ServerSidePaginationResponse<CaseManager>) => {
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
    this.caseManagerListNameSearchFormControl.setValue('');
  }

  public openCreateCaseManagerPage(): void {
    this.router.navigate(['case-managers/case-manager-create']).then();
  }

  public openDetailPage(row: any): void {
    this.router.navigate(['case-managers/case-manager-detail', row.caseManagerId]).then();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth;
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      this.caseManagerListNameSearchFormControl.setValue('');
      this.nameSearchElementRef.nativeElement.focus();
    }
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault();
      this.openCreateCaseManagerPage();
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
