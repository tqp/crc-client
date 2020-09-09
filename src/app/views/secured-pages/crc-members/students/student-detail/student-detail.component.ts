import {Component, HostListener, OnInit} from '@angular/core';
import {Student} from '../Student';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EventService} from '@tqp/services/event.service';
import {StudentService} from '../student.service';
import {Person} from '../../../../../../@tqp/models/Person';
import {RelationshipService} from '../../relations/relationship.service';
import { Relationship } from '../Relationship';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  public pageSource: string;
  public student: Student;
  public genderNames = {'M': 'Male', 'F': 'Female', 'O': 'Other'};

  // Relationships List
  public records: Relationship[] = [];
  public dataSource: Relationship[] = [];
  public displayedColumns: string[] = [
    'name',
    'relationship',
    'bloodRelative'
  ];

  constructor(private route: ActivatedRoute,
              private studentService: StudentService,
              private relationshipService: RelationshipService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const studentId = params['guid'];
        // console.log('studentId', studentId);
        this.getStudentDetail(studentId);
        this.getRelationshipListByStudentId(studentId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getStudentDetail(guid: string): void {
    this.eventService.loadingEvent.emit(true);
    this.studentService.getStudentDetail(guid).subscribe(
      response => {
        this.student = response;
        console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getRelationshipListByStudentId(studentId: number): void {
    this.relationshipService.getRelationshipListByStudentId(studentId).subscribe(
      (relationshipList: Relationship[]) => {
        console.log('relationshipList', relationshipList);
        relationshipList.forEach(item => {
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
    this.router.navigate(['students/student-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['students/student-detail-edit', this.student.studentId]).then();
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
