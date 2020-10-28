import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '../../../../../../@tqp/services/event.service';
import { Sponsor } from '../Sponsor';
import { SponsorService } from '../sponsor.service';
import { AuthService } from '../../../../../../@tqp/services/auth.service';
import { RelationshipService } from '../../../relationships/relationship.service';
import { Student } from '../../students/Student';

@Component({
  selector: 'app-sponsor-detail',
  templateUrl: './sponsor-detail.component.html',
  styleUrls: ['./sponsor-detail.component.css']
})
export class SponsorDetailComponent implements OnInit {
  public pageSource: string;
  public sponsor: Sponsor;
  public genderNames = {'M': 'Male', 'F': 'Female', 'O': 'Other'};
  public sponsorLoading: boolean = false;

  // Associated Students List
  public records: Student[] = [];
  public dataSource: Student[] = [];
  public displayedColumns: string[] = [
    'name',
    'relationshipStartDate'
  ];

  constructor(private route: ActivatedRoute,
              private sponsorService: SponsorService,
              private relationshipService: RelationshipService,
              private eventService: EventService,
              private router: Router,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const sponsorId = params['id'];
        // console.log('sponsorId', sponsorId);
        this.getSponsorDetail(sponsorId);
        this.getStudentListBySponsorId(sponsorId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getSponsorDetail(sponsorId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.sponsorService.getSponsorDetail(sponsorId).subscribe(
      response => {
        this.sponsor = response;
        // console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getStudentListBySponsorId(caseManagerId: number): void {
    this.relationshipService.getStudentListBySponsorId(caseManagerId).subscribe(
      (studentList: Student[]) => {
        console.log('studentList', studentList);
        studentList.forEach(item => {
          this.records.push(item);
        });
        this.dataSource = this.records;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // Buttons

  public returnToList(): void {
    this.router.navigate(['sponsors/sponsor-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['sponsors/sponsor-detail-edit', this.sponsor.sponsorId]).then();
  }

  public openTwitter(twitterHandle: string): void {
    console.log('openTwitter', twitterHandle);
    window.open('https://twitter.com/' + twitterHandle, '_blank');
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'e') {
      event.preventDefault();
      this.openEditPage();
    }
    if (event.ctrlKey && event.key === 'l') {
      event.preventDefault();
      this.returnToList();
    }
  }

}
