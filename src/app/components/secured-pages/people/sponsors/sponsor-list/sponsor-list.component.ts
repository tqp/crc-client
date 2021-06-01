import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { EventService } from '@tqp/services/event.service';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SponsorService } from '../../../../../services/people/sponsor.service';
import { Sponsor } from '../../../../../models/people/sponsor.model';
import { AuthService } from '../../../../../../@tqp/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.css']
})
export class SponsorListComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('searchElementRef', {static: true}) searchElementRef: ElementRef;
  public windowWidth: number = window.innerWidth;
  public searchFormControl = new FormControl();

  public error = false;

  // Data Table
  public isLoading: boolean | undefined;
  public displayedColumns: any = [
    {col: 'sponsorName', showSmall: true},
    {col: 'sponsorAffiliatedChurch', showSmall: true},
    {col: 'sponsorNumberOfStudents', showSmall: true}
  ];

  public dataSource: any;
  public recordCount = 0;
  public recordList: Sponsor[] = [];

  constructor(private sponsorService: SponsorService,
              private eventService: EventService,
              public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getSponsorList();
  }

  public getDisplayedColumns(): string[] {
    const smallScreen = this.windowWidth < 1400;
    return this.displayedColumns
      .filter(cd => !smallScreen || cd.showSmall)
      .map(cd => cd.col);
  }

  public getSponsorList(): void {
    this.isLoading = true;
    this.eventService.loadingEvent.emit(true);
    this.sponsorService.getSponsorList().subscribe(
      (response: any | null) => {
        // console.log('response', response);
        if (response) {
          const sponsorList: Sponsor[] = response;
          // console.log('sponsorList', sponsorList);
          if (sponsorList) {
            sponsorList.forEach((item: Sponsor) => {
              item.sponsorName = item.sponsorGivenName + ' ' + item.sponsorSurname;
              this.recordList.push(item);
              this.recordCount = sponsorList.length;
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

  public openCreateSponsorPage(): void {
    this.router.navigate(['sponsors/sponsor-create']).then();
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
