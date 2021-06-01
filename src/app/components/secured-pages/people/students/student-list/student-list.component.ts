import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { merge } from 'rxjs';
import { Student } from '../../../../../models/people/student.model';
import { StudentService } from '../../../../../services/people/student.service';
import { EventService } from '@tqp/services/event.service';
import { AuthService } from '../../../../../../@tqp/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('searchElementRef', {static: true}) searchElementRef: ElementRef;
  public windowWidth: number = window.innerWidth;
  public searchFormControl = new FormControl();

  public error = false;

  // Data Table
  public isLoading: boolean | undefined;
  public displayedColumns: any = [
    {col: 'studentName', showSmall: true},
    {col: 'caregiverName', showSmall: true},
    {col: 'caregiverAddress', showSmall: false},
    {col: 'caregiverPhone', showSmall: false},
    {col: 'relationshipTierTypeName', showSmall: true},
  ];

  public dataSource: any;
  public recordCount = 0;
  public recordList: Student[] = [];

  constructor(private studentService: StudentService,
              private eventService: EventService,
              public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getStudentList();
  }

  public getDisplayedColumns(): string[] {
    const smallScreen = this.windowWidth < 1400;
    return this.displayedColumns
      .filter(cd => !smallScreen || cd.showSmall)
      .map(cd => cd.col);
  }

  public getStudentList(): void {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.studentService.getStudentList().subscribe(
      (response: any | null) => {
        // console.log('response', response);
        if (response) {
          const studentList: Student[] = response;
          // console.log('studentList', studentList);
          if (studentList) {
            studentList.forEach((item: Student) => {
              item.studentName = item.studentGivenName + ' ' + item.studentSurname;
              item.caregiverName = item.caregiverGivenName + ' ' + item.caregiverSurname;
              this.recordList.push(item);
              this.recordCount = studentList.length;
            });

            // Default Sort
            this.recordList = this.recordList.sort((a, b) => {
              return a.studentGivenName.toLowerCase() + a.studentSurname.toLowerCase()
              < b.studentGivenName.toLowerCase() + b.studentSurname.toLowerCase() ? -1 : 1;
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
        this.isLoading = false;
        this.eventService.loadingEvent.emit(false);
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
          const searchFilterAssessment_studentSurname = list.studentSurname.toLowerCase().includes(searchFilter.trim().toLowerCase());
          const searchFilterAssessment_studentGivenName = list.studentGivenName.toLowerCase().includes(searchFilter.trim().toLowerCase());
          return searchFilterAssessment_studentSurname || searchFilterAssessment_studentGivenName;
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

  public openCreateStudentPage(): void {
    this.router.navigate(['students/student-create']).then();
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
