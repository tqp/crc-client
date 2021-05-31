import { Component, HostListener, OnInit } from '@angular/core';
import { Student } from '../../../../../models/people/student.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RelationshipService } from '../../../../../services/relationships/relationship.service';
import { EventService } from '@tqp/services/event.service';
import { AuthService } from '@tqp/services/auth.service';
import { Visit } from '../../../../../models/visit.model';
import { VisitService } from '../../../../../services/events/visit.service';

@Component({
  selector: 'app-visit-detail',
  templateUrl: './visit-detail.component.html',
  styleUrls: ['./visit-detail.component.css']
})
export class VisitDetailComponent implements OnInit {
  public pageSource: string;
  public visit: Visit;
  public genderNames = {'M': 'Male', 'F': 'Female', 'O': 'Other'};
  public visitLoading: boolean = false;

  // Associated Students List
  public records: Student[] = [];
  public dataSource: Student[] = [];
  public displayedColumns: string[] = [
    'name',
    'relationshipStartDate'
  ];

  constructor(private route: ActivatedRoute,
              private visitService: VisitService,
              private relationshipService: RelationshipService,
              private eventService: EventService,
              private router: Router,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const visitId = params['id'];
        // console.log('visitId', visitId);
        this.getVisitDetail(visitId);
        // this.getStudentListByVisitId(visitId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getVisitDetail(visitId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.visitService.getVisitDetail(visitId).subscribe(
      response => {
        this.visit = response;
        console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // private getStudentListByVisitId(caseManagerId: number): void {
  //   this.relationshipService.getStudentListByVisitId(caseManagerId).subscribe(
  //     (studentList: Student[]) => {
  //       console.log('studentList', studentList);
  //       studentList.forEach(item => {
  //         this.records.push(item);
  //       });
  //       this.dataSource = this.records;
  //     },
  //     error => {
  //       console.error('Error: ', error);
  //     }
  //   );
  // }

  // Buttons

  public returnToList(): void {
    this.router.navigate(['visits/visit-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['visits/visit-detail-edit', this.visit.visitId]).then();
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
