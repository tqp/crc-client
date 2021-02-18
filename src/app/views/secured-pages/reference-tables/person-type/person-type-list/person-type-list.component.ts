import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {EventService} from '../../../../../../@tqp/services/event.service';
import {Router} from '@angular/router';
import {PersonTypeService} from '../person-type.service';
import {merge} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {PersonType} from '../PersonType';

@Component({
  selector: 'app-person-type-list',
  templateUrl: './person-type-list.component.html',
  styleUrls: ['./person-type-list.component.css']
})
export class PersonTypeListComponent implements OnInit, OnDestroy {
  @ViewChild('tableContainer', {read: ElementRef, static: true}) public matTableRef: ElementRef;
  public displayedColumns: string[] = [
    'personTypeName'
  ];

  public personTypeNameSearchFormControl = new FormControl();

  public records: PersonType[] = [];
  public dataSource: PersonType[] = [];
  public totalRecords: number;
  public isLoading;
  public isFilterApplied = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('dialogContent', {static: true}) public dialogRef: any;
  @ViewChild('personTypeNameSearchElementRef', {static: true}) personTypeNameSearchElementRef: ElementRef;

  constructor(private personTypeService: PersonTypeService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.setInitialFieldValues();
    this.getPersonTypeList();
    this.listenForFilterChanges();
  }

  ngOnDestroy(): void {
    this.personTypeService.setPersonTypeNameSearchValue(this.personTypeNameSearchFormControl.value);
  }

  private setInitialFieldValues() {
    if (this.personTypeService.getPersonTypeNameSearchValue()) {
      // console.log('nameVal', this.crudService.getNameSearchValue());
      this.personTypeNameSearchFormControl.setValue(this.personTypeService.getPersonTypeNameSearchValue());
    }
  }

  private getPersonTypeList(): void {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.personTypeService.getPersonTypeList().subscribe(
      (personTypeList: PersonType[]) => {
        // console.log('personTypeList', personTypeList);
        personTypeList.forEach(item => {
          this.records.push(item);
          this.totalRecords = personTypeList.length;
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
      this.personTypeNameSearchFormControl.valueChanges.pipe(debounceTime(100)),
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
    console.log('applyFilters');
    console.log('sort: ' + this.sort.active + ': ' + this.sort.direction);
    const nameFilter = this.personTypeNameSearchFormControl.value != null ? this.personTypeNameSearchFormControl.value : '';

    console.log('this.dataSource1', this.dataSource);
    this.dataSource = this.records
      .filter(personTypeList => {
          const nameFilterAssessment = personTypeList.personTypeName.toLowerCase().includes(nameFilter.trim().toLowerCase());
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

    console.log('this.dataSource2', this.dataSource);
    this.isFilterApplied = nameFilter;
    this.isLoading = false;
    this.eventService.loadingEvent.emit(false);
  }

  public clearFilters(): void {
    this.personTypeNameSearchFormControl.setValue('');
  }

  public openPersonTypeCreatePage(): void {
    this.router.navigate(['secured-pages/crud-detail-create-page'], {queryParams: {src: 'crud-master-client-scroll'}}).then();
  }

  public openPersonTypeDetailPage(row: any): void {
    this.router.navigate(['secured-pages/crud-detail', row.id], {queryParams: {src: 'crud-master-client-scroll'}}).then();
  }

  public openPersonTypeEditDialog(row: any): void {
    console.log('openPersonEditDialog', row);
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    // console.log(event + ' (' + event.key + ')');

    // CTRL + F
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      this.personTypeNameSearchElementRef.nativeElement.focus();
    }
  }
}
