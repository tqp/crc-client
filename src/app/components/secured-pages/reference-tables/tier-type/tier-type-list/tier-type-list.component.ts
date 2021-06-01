import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TierTypeModel } from '../../../../../models/types/type-tier.model';
import { MatSort } from '@angular/material/sort';
import { TierTypeService } from '../../../../../services/reference-tables/tier-type.service';
import { EventService } from '@tqp/services/event.service';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-tier-type-list',
  templateUrl: './tier-type-list.component.html',
  styleUrls: ['./tier-type-list.component.css']
})
export class TierTypeListComponent implements OnInit, OnDestroy {
  @ViewChild('tableContainer', {read: ElementRef, static: true}) public matTableRef: ElementRef;
  public displayedColumns: string[] = [
    'tierTypeName'
  ];

  public tierTypeNameSearchFormControl = new FormControl();

  public records: TierTypeModel[] = [];
  public dataSource: TierTypeModel[] = [];
  public totalRecords: number;
  public isLoading;
  public isFilterApplied = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('dialogContent', {static: true}) public dialogRef: any;
  @ViewChild('tierTypeNameSearchElementRef', {static: true}) tierTypeNameSearchElementRef: ElementRef;

  constructor(private tierTypeService: TierTypeService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.setInitialFieldValues();
    this.getTierTypeList();
    this.listenForFilterChanges();
  }

  ngOnDestroy(): void {
    this.tierTypeService.setTierTypeNameSearchValue(this.tierTypeNameSearchFormControl.value);
  }

  private setInitialFieldValues() {
    if (this.tierTypeService.getTierTypeNameSearchValue()) {
      // console.log('nameVal', this.crudService.getNameSearchValue());
      this.tierTypeNameSearchFormControl.setValue(this.tierTypeService.getTierTypeNameSearchValue());
    }
  }

  private getTierTypeList(): void {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.tierTypeService.getTierTypeList().subscribe(
      (tierTypeList: TierTypeModel[]) => {
        // console.log('tierTypeList', tierTypeList);
        tierTypeList.forEach(item => {
          this.records.push(item);
          this.totalRecords = tierTypeList.length;
          this.isLoading = false;
          this.eventService.loadingEvent.emit(false);
        });
        this.dataSource = this.records;
        this.applyFilters();
      }, error => {
        console.error('Error: ', error);
      }, () => {
      }
    );
  }

  private listenForFilterChanges(): void {
    merge(
      this.tierTypeNameSearchFormControl.valueChanges.pipe(debounceTime(100)),
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
        console.log('complete');
      }
    );
  }

  private applyFilters(): void {
    const nameFilter = this.tierTypeNameSearchFormControl.value != null ? this.tierTypeNameSearchFormControl.value : '';

    this.dataSource = this.records
      .filter(tierTypeList => {
          const nameFilterAssessment = tierTypeList.tierTypeName.toLowerCase().includes(nameFilter.trim().toLowerCase());
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
    this.isLoading = false;
    this.eventService.loadingEvent.emit(false);
  }

  public clearFilters(): void {
    this.tierTypeNameSearchFormControl.setValue('');
  }

  public openTierTypeCreatePage(): void {
    this.router.navigate(['secured-pages/crud-detail-create-page'], {queryParams: {src: 'crud-master-client-scroll'}}).then();
  }

  public openTierTypeDetailPage(row: any): void {
    this.router.navigate(['secured-pages/crud-detail', row.guid], {queryParams: {src: 'crud-master-client-scroll'}}).then();
  }

  public openTierTypeEditDialog(row: any): void {
    console.log('openTierEditDialog', row);
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    // console.log(event + ' (' + event.key + ')');

    // CTRL + F
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      this.tierTypeNameSearchElementRef.nativeElement.focus();
    }
  }
}
