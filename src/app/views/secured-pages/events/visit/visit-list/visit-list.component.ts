import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ServerSidePaginationRequest } from '../../../../../../@tqp/models/ServerSidePaginationRequest';
import { FormControl } from '@angular/forms';
import { FinanceService } from '../../../finance/finance.service';
import { EventService } from '../../../../../../@tqp/services/event.service';
import { FormattingService } from '../../../../../../@tqp/services/formatting.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../@tqp/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ServerSidePaginationResponse } from '../../../../../../@tqp/models/ServerSidePaginationResponse';
import { merge, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { VisitService } from '../visit.service';
import { Visit } from '../Visit';
import { VisitDetailEditDialogComponent } from '../visit-detail-edit-dialog/visit-detail-edit-dialog.component';


@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('tableContainer', {read: ElementRef, static: true}) public matTableRef: ElementRef;
  @ViewChild('dialogContent', {static: true}) public dialogRef: any;
  @ViewChild('nameSearchElementRef', {static: true}) nameSearchElementRef: ElementRef;

  private pageIndex = 0;
  public pageSize = 10;
  private totalNumberOfPages: number;
  private searchParams: ServerSidePaginationRequest = new ServerSidePaginationRequest();

  public displayedColumns: string[] = [
    // 'visitId',
    'visitDate',
    'studentName',
    'visitType',
    'interactionType'
  ];

  public caregiverListNameSearchFormControl = new FormControl();

  public records: Visit[] = [];
  public dataSource: Visit[] = [];
  public stateList: string[] = [];

  public totalRecords: number;
  public pageStart: number;
  public pageEnd: number;
  public loadedFirstPage = false;
  public isLoading = false;

  public isFilterApplied = false;

  constructor(private financeService: FinanceService,
              private visitService: VisitService,
              private eventService: EventService,
              private formattingService: FormattingService,
              private router: Router,
              public authService: AuthService,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.setInitialFieldValues();
    this.getPage(this.searchParams);
    this.listenForChanges();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    // this.financeService.setCaregiverListNameSearchValue(this.caregiverListNameSearchFormControl.value);
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

    // if (this.caregiverService.getCaregiverListNameSearchValue()) {
    //   const nameSearchValue = this.caregiverService.getCaregiverListNameSearchValue();
    //   this.caregiverListNameSearchFormControl.setValue(nameSearchValue);
    //   this.searchParams.nameFilter = nameSearchValue;
    // }
  }

  private getPage(searchParams: ServerSidePaginationRequest) {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.visitService.getVisitList_SSP(searchParams).subscribe((response: ServerSidePaginationResponse<Visit>) => {
        // console.log('getPage response', response);
        this.records = [];
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
          return this.visitService.getVisitList_SSP(serverSideSearchParams);
        }),
        map((response: ServerSidePaginationResponse<Visit>) => {
          return response;
        }),
        catchError((error: any) => {
          this.isLoading = false;
          this.eventService.loadingEvent.emit(false);
          console.error('Error Encountered: ', error);
          return of([]);
        })
      )
      .subscribe((response: ServerSidePaginationResponse<Visit>) => {
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

  public openVisitEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'create',
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(VisitDetailEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      // console.log('dialogData', dialogData);
      if (dialogData) {
        const visit: Visit = {};
        visit.studentId = dialogData.studentId;
        visit.visitDate = this.formattingService.formatStandardDateAsMySql(dialogData.visitDate);
        visit.caseManagerId = dialogData.caseManagerId;
        visit.interactionTypeId = dialogData.interactionTypeId;
        visit.visitTypeId = dialogData.visitTypeId;
        visit.caregiverComments = dialogData.caregiverComments;
        visit.caseManagerComments = dialogData.caseManagerComments;
        console.log('visit', visit);
        this.visitService.createVisit(visit).subscribe(
          response => {
            console.log('response', response);
            this.getPage(this.searchParams);
          },
          error => {
            console.error('Error: ', error);
          }
        );
      }
    });
  }

  public openDetailPage(row: any): void {
    this.router.navigate(['visits/visit-detail', row.visitId]).then();
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      this.caregiverListNameSearchFormControl.setValue('');
      this.nameSearchElementRef.nativeElement.focus();
    }
  }
}
