import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Student } from '../../../../models/people/student.model';
import { MatSort } from '@angular/material/sort';
import { CaseManagerCoverageService } from '../../../../services/reports/case-manager-coverage.service';
import { EventService } from '@tqp/services/event.service';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CaregiverCoverageService } from '../../../../services/reports/caregiver-coverage.service';

@Component({
  selector: 'app-caregiver-coverage',
  templateUrl: './caregiver-coverage.component.html',
  styleUrls: ['./caregiver-coverage.component.css']
})
export class CaregiverCoverageComponent implements OnInit, OnDestroy {
  @ViewChild('tableContainer', {read: ElementRef, static: true}) public matTableRef: ElementRef;
  public displayedColumns: string[] = [
    'studentName',
    'studentDateOfBirth'
  ];

  public studentNameSearchFormControl = new FormControl();

  public records: Student[] = [];
  public dataSource: Student[] = [];
  public totalRecords: number;
  public isLoading;
  public isFilterApplied = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('dialogContent', {static: true}) public dialogRef: any;
  @ViewChild('studentNameSearchElementRef', {static: true}) studentNameSearchElementRef: ElementRef;

  constructor(private caregiverCoverageService: CaregiverCoverageService,
              private eventService: EventService) {
  }

  ngOnInit(): void {
    this.setInitialFieldValues();
    this.getCaregiverCoverageList();
    this.listenForFilterChanges();
  }

  ngOnDestroy(): void {
    this.caregiverCoverageService.setStudentNameSearchValue(this.studentNameSearchFormControl.value);
  }

  private setInitialFieldValues() {
    if (this.caregiverCoverageService.getCaregiverCoverageList()) {
      this.studentNameSearchFormControl.setValue(this.caregiverCoverageService.getStudentNameSearchValue());
    }
  }

  private getCaregiverCoverageList(): void {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.caregiverCoverageService.getCaregiverCoverageList().subscribe(
      (studentList: Student[]) => {
        // console.log('studentList', studentList);
        studentList.forEach(item => {
          item.studentName = item.studentSurname + item.studentGivenName;
          this.records.push(item);
          this.totalRecords = studentList.length;
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
      this.studentNameSearchFormControl.valueChanges.pipe(debounceTime(100)),
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
    const nameFilter = this.studentNameSearchFormControl.value != null ? this.studentNameSearchFormControl.value : '';
    this.dataSource = this.records
      .filter(studentList => {
          const key = studentList.studentGivenName + '|' + studentList.studentSurname;
          return key.toLowerCase().includes(nameFilter.trim().toLowerCase());
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
    this.studentNameSearchFormControl.setValue('');
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    // console.log(event + ' (' + event.key + ')');

    // CTRL + F
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      this.studentNameSearchElementRef.nativeElement.focus();
    }
  }
}
