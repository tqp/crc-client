import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {RelationshipType} from '../RelationshipType';
import {MatSort} from '@angular/material/sort';
import {RelationshipTypeService} from '../relationship-type.service';
import {EventService} from '@tqp/services/event.service';
import {Router} from '@angular/router';
import {merge} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-relationship-type-list',
  templateUrl: './relationship-type-list.component.html',
  styleUrls: ['./relationship-type-list.component.css']
})
export class RelationshipTypeListComponent implements OnInit, OnDestroy {
  @ViewChild('tableContainer', {read: ElementRef, static: true}) public matTableRef: ElementRef;
  public displayedColumns: string[] = [
    'relationshipTypeName'
  ];

  public relationshipTypeNameSearchFormControl = new FormControl();

  public records: RelationshipType[] = [];
  public dataSource: RelationshipType[] = [];
  public stateList: string[] = [];
  public totalRecords: number;
  public isLoading;
  public isFilterApplied = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('dialogContent', {static: true}) public dialogRef: any;
  @ViewChild('relationshipTypeNameSearchElementRef', {static: true}) relationshipTypeNameSearchElementRef: ElementRef;

  constructor(private relationshipTypeService: RelationshipTypeService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.setInitialFieldValues();
    this.getRelationshipTypeList();
    this.listenForFilterChanges();
  }

  ngOnDestroy(): void {
    this.relationshipTypeService.setRelationshipTypeNameSearchValue(this.relationshipTypeNameSearchFormControl.value);
  }

  private setInitialFieldValues() {
    if (this.relationshipTypeService.getRelationshipTypeNameSearchValue()) {
      // console.log('nameVal', this.crudService.getNameSearchValue());
      this.relationshipTypeNameSearchFormControl.setValue(this.relationshipTypeService.getRelationshipTypeNameSearchValue());
    }
  }

  private getRelationshipTypeList(): void {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.relationshipTypeService.getRelationshipTypeList().subscribe(
      (relationshipTypeList: RelationshipType[]) => {
        // console.log('relationshipTypeList', relationshipTypeList);
        relationshipTypeList.forEach(item => {
          this.records.push(item);
          this.totalRecords = relationshipTypeList.length;
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
      this.relationshipTypeNameSearchFormControl.valueChanges.pipe(debounceTime(100)),
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
    const nameFilter = this.relationshipTypeNameSearchFormControl.value != null ? this.relationshipTypeNameSearchFormControl.value : '';

    this.dataSource = this.records
      .filter(relationshipTypeList => {
          const nameFilterAssessment = relationshipTypeList.relationshipTypeName.toLowerCase().includes(nameFilter.trim().toLowerCase());
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
    this.relationshipTypeNameSearchFormControl.setValue('');
  }

  public openRelationshipTypeCreatePage(): void {
    this.router.navigate(['secured-pages/crud-detail-create-page'], {queryParams: {src: 'crud-master-client-scroll'}}).then();
  }

  public openRelationshipTypeDetailPage(row: any): void {
    this.router.navigate(['secured-pages/crud-detail', row.guid], {queryParams: {src: 'crud-master-client-scroll'}}).then();
  }

  public openRelationshipTypeEditDialog(row: any): void {
    console.log('openRelationshipEditDialog', row);
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    // console.log(event + ' (' + event.key + ')');

    // CTRL + F
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      this.relationshipTypeNameSearchElementRef.nativeElement.focus();
    }
  }
}
