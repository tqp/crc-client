import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Visit } from '../../../../../models/visit.model';
import { VisitService } from '../../../../../services/events/visit.service';
import { EventService } from '../../../../../../@tqp/services/event.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../@tqp/services/auth.service';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Student } from '../../../../../models/people/student.model';

@Component({
  selector: 'app-visit-list-by-case-manager',
  templateUrl: './visit-list-by-case-manager.component.html',
  styleUrls: ['./visit-list-by-case-manager.component.css']
})
export class VisitListByCaseManagerComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('searchElementRef', {static: true}) searchElementRef: ElementRef;
  public windowWidth: number = window.innerWidth;
  public searchFormControl = new FormControl();

  public error = false;

  // Data Table
  public isLoading: boolean | undefined;
  public displayedColumns: any = [
    {col: 'visitDate', showSmall: true},
    {col: 'studentName', showSmall: false},
    {col: 'caseManagerName', showSmall: false},
    {col: 'visitType', showSmall: false},
    {col: 'interactionType', showSmall: true}
  ];

  public dataSource: any;
  public recordCount = 0;
  public recordList: Student[] = [];

  constructor(private visitService: VisitService,
              private eventService: EventService,
              public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getVisitListByCaseManager();
  }

  public getDisplayedColumns(): string[] {
    const smallScreen = this.windowWidth < 1400;
    return this.displayedColumns
      .filter(cd => !smallScreen || cd.showSmall)
      .map(cd => cd.col);
  }

  public getVisitListByCaseManager(): void {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.visitService.getVisitListByCaseManager().subscribe(
      (response: any | null) => {
        // console.log('response', response);
        if (response) {
          const visitList: Visit[] = response;
          console.log('visitList', visitList);
          if (visitList) {
            visitList.forEach((item: Visit) => {
              // item.studentVisitName = item.studentVisitGivenName + ' ' + item.studentVisitSurname;
              // item.studentCountString = item.studentCount.toString();
              this.recordList.push(item);
              this.recordCount = visitList.length;
            });

            // Default Sort
            // this.recordList = this.recordList.sort((a, b) => {
            //   return a.studentVisitGivenName.toLowerCase() + a.studentVisitSurname.toLowerCase()
            //   < b.studentVisitGivenName.toLowerCase() + b.studentVisitSurname.toLowerCase() ? -1 : 1;
            // });

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
          // const searchFilterAssessment_studentVisitSurname = list.studentVisitSurname.toLowerCase().includes(searchFilter.trim().toLowerCase());
          // const searchFilterAssessment_studentVisitGivenName = list.studentVisitGivenName.toLowerCase().includes(searchFilter.trim().toLowerCase());
          // return searchFilterAssessment_studentVisitSurname || searchFilterAssessment_studentVisitGivenName;
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

  public openCreateStudentVisitPage(): void {
    this.router.navigate(['studentVisits/studentVisit-create']).then();
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
