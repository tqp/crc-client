import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ServerSidePaginationRequest } from '../../../../../../@tqp/models/ServerSidePaginationRequest';
import { FormControl } from '@angular/forms';
import { EventService } from '../../../../../../@tqp/services/event.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../@tqp/services/auth.service';
import { ServerSidePaginationResponse } from '../../../../../../@tqp/models/ServerSidePaginationResponse';
import { fromEvent, merge, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { FinanceService } from '../../finance.service';
import { Loan } from '../../loans/Loan';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PaymentDetailEditDialogComponent } from '../payment-detail-edit-dialog/payment-detail-edit-dialog.component';
import { Payment } from '../Payment';
import { FormattingService } from '../../../../../../@tqp/services/formatting.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit, OnDestroy {
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
    'participant',
    'loanId',
    'loanDescription',
    'paymentDate',
    'paymentAmount'
  ];

  public caregiverListNameSearchFormControl = new FormControl();

  public records: Loan[] = [];
  public dataSource: Loan[] = [];
  public stateList: string[] = [];

  public totalRecords: number;
  public pageStart: number;
  public pageEnd: number;
  public loadedFirstPage = false;
  public isLoading = false;

  public isFilterApplied = false;

  constructor(private financeService: FinanceService,
              private paymentService: PaymentService,
              private eventService: EventService,
              private formattingService: FormattingService,
              private router: Router,
              public authService: AuthService,
              public _matDialog: MatDialog) {
    this.initWindowResizeListener();
  }

  ngOnInit(): void {
    this.setInitialFieldValues();
    this.getPage(this.searchParams);
    this.listenForChanges();
  }

  ngOnDestroy(): void {
    // this.financeService.setCaregiverListNameSearchValue(this.caregiverListNameSearchFormControl.value);
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

    // if (this.caregiverService.getCaregiverListNameSearchValue()) {
    //   const nameSearchValue = this.caregiverService.getCaregiverListNameSearchValue();
    //   this.caregiverListNameSearchFormControl.setValue(nameSearchValue);
    //   this.searchParams.nameFilter = nameSearchValue;
    // }
  }

  private getPage(searchParams: ServerSidePaginationRequest) {
    // console.log('getPage', searchParams);
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.paymentService.getPaymentList_SSP(searchParams).subscribe((response: ServerSidePaginationResponse<Loan>) => {
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
          return this.paymentService.getPaymentList_SSP(serverSideSearchParams);
        }),
        map((response: ServerSidePaginationResponse<Loan>) => {
          return response;
        }),
        catchError((error: any) => {
          this.isLoading = false;
          this.eventService.loadingEvent.emit(false);
          console.error('Error Encountered: ', error);
          return of([]);
        })
      )
      .subscribe((response: ServerSidePaginationResponse<Loan>) => {
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

  public openPaymentEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'create',
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(PaymentDetailEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      // console.log('dialogData', dialogData);
      if (dialogData) {
        const payment: Payment = {};
        payment.caregiverId = dialogData.caregiverId;
        payment.loanId = dialogData.loanId;
        payment.paymentDate = this.formattingService.formatStandardDateAsMySql(dialogData.paymentDate);
        payment.paymentAmount = dialogData.paymentAmount;
        // console.log('payment', payment);
        this.paymentService.createPayment(payment).subscribe(
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
    this.router.navigate(['payments/payment-detail', row.paymentId]).then();
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
