import { Component, HostListener, OnInit } from '@angular/core';
import { Student } from '../Student';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '@tqp/services/event.service';
import { StudentService } from '../student.service';
import {Person} from '../../../../../../@tqp/models/Person';
import {CaregiverService} from '../../caregivers/caregiver.service';

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
  public records: Person[] = [];
  public dataSource: Person[] = [];
  public displayedColumns: string[] = [
    'name',
    'relationship',
    'bloodRelative'
  ];

  constructor(private route: ActivatedRoute,
              private studentService: StudentService,
              private caregiverService: CaregiverService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const studentGuid = params['guid'];
        // console.log('studentGuid', studentGuid);
        this.getStudentDetail(studentGuid);
        this.getRelationshipByStudentGuid(studentGuid);
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
        // console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getRelationshipByStudentGuid(studentGuid: string): void {
    this.caregiverService.getCaregiverListByStudentGuid(studentGuid).subscribe(
      (relationshipList: Person[]) => {
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
    this.router.navigate(['students/student-detail-edit', this.student.studentGuid]).then();
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
