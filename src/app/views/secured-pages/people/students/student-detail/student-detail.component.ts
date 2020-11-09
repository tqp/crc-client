import { Component, HostListener, OnInit } from '@angular/core';
import { Student } from '../Student';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '@tqp/services/event.service';
import { StudentService } from '../student.service';
import { Relationship } from '../../../relationships/Relationship';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentCaregiverEditDialogComponent } from '../../../relationships/student-caregiver-edit-dialog/student-caregiver-edit-dialog.component';
import { AuthService } from '../../../../../../@tqp/services/auth.service';
import { CaregiverService } from '../../caregivers/caregiver.service';
import { Caregiver } from '../../caregivers/Caregiver';
import { StudentCaseManagerEditDialogComponent } from '../../../relationships/student-case-manager-edit-dialog/student-case-manager-edit-dialog.component';
import { FormattingService } from '../../../../../../@tqp/services/formatting.service';
import { CaseManager } from '../../case-managers/CaseManager';
import { CaseManagerService } from '../../case-managers/case-manager.service';
import { Sponsor } from '../../sponsors/Sponsor';
import { StudentSponsorEditDialogComponent } from '../../../relationships/student-sponsor-edit-dialog/student-sponsor-edit-dialog.component';
import { SponsorService } from '../../sponsors/sponsor.service';
import { RelationshipService } from '../../../relationships/relationship.service';
import { StudentProgramStatusEditDialogComponent } from '../../../relationships/student-program-status-edit-dialog/student-program-status-edit-dialog.component';
import { ProgramStatusService } from '../../../relationships/program-status.service';
import { ProgramStatus } from '../../../relationships/ProgramStatus';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  public pageSource: string;
  public student: Student;
  public caregiver: Caregiver;
  public caseManager: CaseManager;
  public sponsor: Sponsor;
  public programStatus: ProgramStatus;

  // Loading
  public studentLoading: boolean = false;
  public caregiverLoading: boolean = false;
  public caseManagerLoading: boolean = false;
  public sponsorLoading: boolean = false;

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
              private caregiverService: CaregiverService,
              private caseManagerService: CaseManagerService,
              private sponsorService: SponsorService,
              private programStatusService: ProgramStatusService,
              private relationshipService: RelationshipService,
              private eventService: EventService,
              private formattingService: FormattingService,
              private router: Router,
              public authService: AuthService,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const studentId = params['id'];
        // console.log('studentId', studentId);
        this.getStudentDetail(studentId);
        this.getCaregiverDetailByStudentId(studentId);
        this.getCaseManagerDetailByStudentId(studentId);
        this.getSponsorDetailByStudentId(studentId);
        this.getProgramStatusDetailByStudentId(studentId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getStudentDetail(studentId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.studentService.getStudentDetail(studentId).subscribe(
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

  private getCaregiverDetailByStudentId(studentId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.caregiverLoading = true;
    this.caregiverService.getCaregiverDetailByStudentId(studentId).subscribe(
      response => {
        // console.log('response', response);
        this.caregiver = response;
        this.caregiver.relationshipStartDate = this.formattingService.formatMySqlDateAsStandard(this.caregiver.relationshipStartDate);
        this.eventService.loadingEvent.emit(false);
        this.caregiverLoading = false;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getCaseManagerDetailByStudentId(studentId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.caseManagerLoading = true;
    this.caseManagerService.getCaseManagerDetailByStudentId(studentId).subscribe(
      response => {
        // console.log('response', response);
        this.caseManager = response;
        this.caseManager.relationshipStartDate = this.formattingService.formatMySqlDateAsStandard(this.caseManager.relationshipStartDate);
        this.eventService.loadingEvent.emit(false);
        this.caseManagerLoading = false;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getSponsorDetailByStudentId(studentId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.sponsorLoading = true;
    this.sponsorService.getSponsorDetailByStudentId(studentId).subscribe(
      response => {
        // console.log('response', response);
        this.sponsor = response;
        this.sponsor.relationshipStartDate = this.formattingService.formatMySqlDateAsStandard(this.sponsor.relationshipStartDate);
        this.eventService.loadingEvent.emit(false);
        this.sponsorLoading = false;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getProgramStatusDetailByStudentId(studentId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.sponsorLoading = true;
    this.programStatusService.getProgramStatusDetailByStudentId(studentId).subscribe(
      (response: ProgramStatus) => {
        console.log('response', response);
        this.programStatus = response;
        this.programStatus.programStatusStartDate = this.formattingService.formatMySqlDateAsStandard(this.programStatus.programStatusStartDate);
        // this.eventService.loadingEvent.emit(false);
        // this.sponsorLoading = false;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // DIALOGS

  public openStudentCaregiverEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'create',
      studentId: this.student.studentId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(StudentCaregiverEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      console.log('dialogData', dialogData);
      if (dialogData) {
        const relationship: Relationship = {};
        relationship.relationshipType = 'Student-Caregiver';
        relationship.studentId = this.student.studentId;
        relationship.relationshipPersonId = dialogData.caregiverId;
        relationship.relationshipStartDate = this.formattingService.formatStandardDateAsMySql(dialogData.relationshipStartDate);
        relationship.relationshipTierTypeId = dialogData.tierTypeId;
        console.log('relationship', relationship);
        this.relationshipService.createCaregiverRelationship(relationship).subscribe(
          response => {
            console.log('response', response);
            this.getCaregiverDetailByStudentId(this.student.studentId);
            this.eventService.loadingEvent.emit(false);
          },
          error => {
            console.error('Error: ', error);
          }
        );
      }
    });
  }

  public openStudentCaseManagerEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'create',
      studentId: this.student.studentId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(StudentCaseManagerEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      console.log('dialogData', dialogData);
      if (dialogData) {
        const relationship: Relationship = {};
        relationship.relationshipType = 'Student-Caregiver';
        relationship.studentId = this.student.studentId;
        relationship.relationshipPersonId = dialogData.caseManagerId;
        relationship.relationshipStartDate = this.formattingService.formatStandardDateAsMySql(dialogData.relationshipStartDate);
        this.relationshipService.createCaseManagerRelationship(relationship).subscribe(
          response => {
            console.log('response', response);
            this.getCaseManagerDetailByStudentId(this.student.studentId);
            this.eventService.loadingEvent.emit(false);
          },
          error => {
            console.error('Error: ', error);
          }
        );
      }
    });
  }

  public openStudentSponsorEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'create',
      studentId: this.student.studentId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(StudentSponsorEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      console.log('dialogData', dialogData);
      if (dialogData) {
        const relationship: Relationship = {};
        relationship.studentId = this.student.studentId;
        relationship.relationshipPersonId = dialogData.sponsorId;
        relationship.relationshipStartDate = this.formattingService.formatStandardDateAsMySql(dialogData.relationshipStartDate);
        this.relationshipService.createSponsorRelationship(relationship).subscribe(
          response => {
            console.log('response', response);
            this.getSponsorDetailByStudentId(this.student.studentId);
            this.eventService.loadingEvent.emit(false);
          },
          error => {
            console.error('Error: ', error);
          }
        );
      }
    });
  }

  public openStudentStatusEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.minHeight = '400px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'create',
      studentId: this.student.studentId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(StudentProgramStatusEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      console.log('dialogData', dialogData);
      const programStatus: ProgramStatus = {};
      programStatus.studentId = this.student.studentId;
      programStatus.programStatusLevelOneId = dialogData.programStatusLevelOneId;
      programStatus.programStatusLevelTwoId = dialogData.programStatusLevelTwoId;
      programStatus.programStatusLevelThreeId = dialogData.programStatusLevelThreeId;
      programStatus.programStatusStartDate = this.formattingService.formatStandardDateAsMySql(dialogData.programStatusStartDate);
      this.relationshipService.createProgramStatusRelationship(programStatus).subscribe(
        response => {
          console.log('response', response);
          this.getProgramStatusDetailByStudentId(this.student.studentId);
          this.eventService.loadingEvent.emit(false);
        },
        error => {
          console.error('Error: ', error);
        }
      );
    });
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
