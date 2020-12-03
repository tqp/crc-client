import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '../../../../../../@tqp/services/event.service';
import { CaseManager } from '../CaseManager';
import { CaseManagerService } from '../case-manager.service';
import { Student } from '../../students/Student';
import { AuthService } from '../../../../../../@tqp/services/auth.service';
import { RelationshipService } from '../../../relationships/relationship.service';
import { CsiService } from '../../../events/csi/csi.service';
import { Csi } from '../../../events/csi/Csi';

@Component({
  selector: 'app-case-manager-detail',
  templateUrl: './case-manager-detail.component.html',
  styleUrls: ['./case-manager-detail.component.css']
})
export class CaseManagerDetailComponent implements OnInit {
  public pageSource: string;
  public caseManager: CaseManager;
  public genderNames = {'M': 'Male', 'F': 'Female', 'O': 'Other'};
  public caseManagerLoading: boolean = false;

  // Associated Students List
  public studentListRecords: Student[] = [];
  public studentListDataSource: Student[] = [];
  public studentListDisplayedColumns: string[] = [
    'name',
    'relationshipStartDate'
  ];

  // CSI Records List
  public csiListRecords: Student[] = [];
  public csiListDataSource: Student[] = [];
  public csiListDisplayedColumns: string[] = [
    'name',
    'csiDate'
  ];

  constructor(private route: ActivatedRoute,
              private caseManagerService: CaseManagerService,
              private relationshipService: RelationshipService,
              private csiService: CsiService,
              private eventService: EventService,
              private router: Router,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const caseManagerId = params['id'];
        // console.log('caseManagerId', caseManagerId);
        this.getCaseManagerDetail(caseManagerId);
        this.getStudentListByCaseManagerId(caseManagerId);
        this.getCsiListByCaseManagerId(caseManagerId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getCaseManagerDetail(caseManagerId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.caseManagerLoading = true;
    this.caseManagerService.getCaseManagerDetail(caseManagerId).subscribe(
      response => {
        this.caseManager = response;
        // console.log('response', response);
        this.eventService.loadingEvent.emit(false);
        this.caseManagerLoading = false;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getStudentListByCaseManagerId(caseManagerId: number): void {
    this.relationshipService.getStudentListByCaseManagerId(caseManagerId).subscribe(
      (studentList: Student[]) => {
        // console.log('studentList', studentList);
        studentList.forEach(item => {
          this.studentListRecords.push(item);
        });
        this.studentListDataSource = this.studentListRecords;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getCsiListByCaseManagerId(caseManagerId: number): void {
    this.csiService.getCsiListByCaseManagerId(caseManagerId).subscribe(
      (csiList: Csi[]) => {
        // console.log('csiList', csiList);
        csiList.forEach(item => {
          this.csiListRecords.push(item);
        });
        this.csiListDataSource = this.csiListRecords;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // Buttons

  public returnToList(): void {
    this.router.navigate(['case-managers/case-manager-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['case-managers/case-manager-detail-edit', this.caseManager.caseManagerId]).then();
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
