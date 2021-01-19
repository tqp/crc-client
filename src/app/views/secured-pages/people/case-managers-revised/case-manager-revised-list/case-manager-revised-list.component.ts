import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ServerSidePaginationRequest } from '../../../../../../@tqp/models/ServerSidePaginationRequest';
import { FormControl } from '@angular/forms';
import { EventService } from '../../../../../../@tqp/services/event.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../@tqp/services/auth.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CaseManagerRevised } from '../CaseManagerRevised';
import { CaseManagerRevisedService } from '../case-manager-revised.service';

@Component({
  selector: 'app-case-manager-revised-list',
  templateUrl: './case-manager-revised-list.component.html',
  styleUrls: ['./case-manager-revised-list.component.css']
})
export class CaseManagerRevisedListComponent implements OnInit, OnDestroy {
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
    // 'caseManagerId',
    'name',
    'caseManagerSurname',
    'caseManagerGivenName',
    'caseManagerNumberOfStudents'
  ];

  public caseManagerRevisedListNameSearchFormControl = new FormControl();

  public records: CaseManagerRevised[] = [];
  public dataSource: CaseManagerRevised[] = [];
  public totalRecords: number;
  public isLoading = false;

  public isFilterApplied = false;

  constructor(private caseManagerRevisedService: CaseManagerRevisedService,
              private eventService: EventService,
              private router: Router,
              public authService: AuthService) {
    this.initWindowResizeListener();
  }

  ngOnInit(): void {
    this.setInitialFieldValues();
    this.getCaseManagerRevisedList();
  }

  ngOnDestroy(): void {
    this.caseManagerRevisedService.setCaseManagerRevisedListNameSearchValue(this.caseManagerRevisedListNameSearchFormControl.value);
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

    if (this.caseManagerRevisedService.getCaseManagerRevisedListNameSearchValue()) {
      const nameSearchValue = this.caseManagerRevisedService.getCaseManagerRevisedListNameSearchValue();
      this.caseManagerRevisedListNameSearchFormControl.setValue(nameSearchValue);
      this.searchParams.nameFilter = nameSearchValue;
    }
  }

  private getCaseManagerRevisedList(): void {
    this.caseManagerRevisedService.getCaseManagerRevisedList().subscribe(
      (caseManagerRevisedList: CaseManagerRevised[]) => {
        console.log('caseManagerRevisedList', caseManagerRevisedList);
        caseManagerRevisedList.forEach(item => {
          this.records.push(item);
          this.totalRecords = caseManagerRevisedList.length;
        });
        this.dataSource = this.records;
        this.applyFilters();
      }, error => {
        console.error('Error: ', error);
      }, () => {
      }
    );
  }

  private applyFilters(): void {
    const nameFilter = this.caseManagerRevisedListNameSearchFormControl.value != null ? this.caseManagerRevisedListNameSearchFormControl.value : '';

    this.dataSource = this.records
      .filter(caseManagerRevisedList => {
          const nameFilterAssessment = caseManagerRevisedList.caseManagerSurname.toLowerCase().includes(nameFilter.trim().toLowerCase());
          return nameFilterAssessment;
        }
      )
      .sort((a, b) => {
          if (this.sort.direction === 'asc') {
            return (a[this.sort.active] > b[this.sort.active]) ? 1 : -1;
          } else {
            return (a[this.sort.active] < b[this.sort.active]) ? 1 : -1;
          }
        }
      );

    this.isFilterApplied = nameFilter;
    this.eventService.loadingEvent.emit(false);
  }

  public clearFilters(): void {
    this.caseManagerRevisedListNameSearchFormControl.setValue('');
  }

  public openCreateCaseManagerPage(): void {
    this.router.navigate(['case-managers/case-manager-create']).then();
  }

  public openDetailPage(row: any): void {
    this.router.navigate(['case-managers/case-manager-detail', row.caseManagerId]).then();
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      this.caseManagerRevisedListNameSearchFormControl.setValue('');
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
