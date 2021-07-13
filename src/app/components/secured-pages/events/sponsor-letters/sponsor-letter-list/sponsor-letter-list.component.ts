import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Sponsor } from '../../../../../models/people/sponsor.model';
import { SponsorService } from '../../../../../services/people/sponsor.service';
import { EventService } from '../../../../../../@tqp/services/event.service';
import { AuthService } from '../../../../../../@tqp/services/auth.service';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SponsorLetterService } from '../../../../../services/events/sponsor-letter.service';
import { SponsorLetter } from '../../../../../models/sponsor.letter';

@Component({
  selector: 'app-sponsor-letter-list',
  templateUrl: './sponsor-letter-list.component.html',
  styleUrls: ['./sponsor-letter-list.component.scss']
})
export class SponsorLetterListComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('searchElementRef', {static: true}) searchElementRef: ElementRef;
  public windowWidth: number = window.innerWidth;
  public searchFormControl = new FormControl();

  public error = false;

  // Data Table
  public isLoading: boolean | undefined;
  public displayedColumns: any = [
    {col: 'studentName', showSmall: true},
    {col: 'sponsorName', showSmall: true},
    {col: 'sponsorLetterDate', showSmall: true}
  ];

  public dataSource: any;
  public recordCount = 0;
  public recordList: Sponsor[] = [];

  constructor(private sponsorLetterService: SponsorLetterService,
              private eventService: EventService,
              public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getSponsorLetterList();
  }

  public getDisplayedColumns(): string[] {
    const smallScreen = this.windowWidth < 1400;
    return this.displayedColumns
      .filter(cd => !smallScreen || cd.showSmall)
      .map(cd => cd.col);
  }

  public getSponsorLetterList(): void {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.sponsorLetterService.getSponsorLetterList().subscribe(
      (response: any | null) => {
        // console.log('response', response);
        if (response) {
          const sponsorLetterList: SponsorLetter[] = response;
          // console.log('sponsorLetterList', sponsorLetterList);
          if (sponsorLetterList) {
            sponsorLetterList.forEach((item: SponsorLetter) => {
              item.studentName = item.studentGivenName + ' ' + item.studentSurname;
              item.sponsorName = item.sponsorGivenName + ' ' + item.sponsorSurname;
              this.recordList.push(item);
              this.recordCount = sponsorLetterList.length;
            });

            // Default Sort
            this.recordList = this.recordList.sort((a, b) => {
              return a.sponsorGivenName.toLowerCase() + a.sponsorSurname.toLowerCase()
              < b.sponsorGivenName.toLowerCase() + b.sponsorSurname.toLowerCase() ? -1 : 1;
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
          const searchFilterAssessment_sponsorSurname = list.sponsorSurname.toLowerCase().includes(searchFilter.trim().toLowerCase());
          const searchFilterAssessment_sponsorGivenName = list.sponsorGivenName.toLowerCase().includes(searchFilter.trim().toLowerCase());
          return searchFilterAssessment_sponsorSurname || searchFilterAssessment_sponsorGivenName;
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

  public openCreateSponsorLetterPage(): void {
    this.router.navigate(['sponsor-letters/sponsor-letter-create']).then();
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
