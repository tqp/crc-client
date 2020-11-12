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
import { Visit } from '../../../events/visits/Visit';
import { VisitService } from '../../../events/visits/visit.service';
import { VisitDetailEditDialogComponent } from '../../../events/visits/visit-detail-edit-dialog/visit-detail-edit-dialog.component';
import { HistoryService } from '../../../events/history/history.service';

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
  public yesNoFromInteger = {0: 'Unknown', 1: 'Yes', 2: 'No'};

  // Loading
  public studentLoading: boolean = false;
  public caregiverLoading: boolean = false;
  public caseManagerLoading: boolean = false;
  public sponsorLoading: boolean = false;
  public programStatusLoading: boolean = false;

  public genderNames = {'M': 'Male', 'F': 'Female', 'O': 'Other'};

  // Visit List
  public visitListLoading: boolean = false;
  public visitListRecords: Visit[] = [];
  public visitListDataSource: Visit[] = [];
  public visitListDisplayedColumns: string[] = [
    'visitId',
    'visitTypeName',
    'interactionTypeName',
    'caseManagerName',
    'visitDate'
  ];

  // History List
  public historyListLoading: boolean = false;
  public historyListRecords: History[] = [];
  public historyListDataSource: History[] = [];
  public historyListDisplayedColumns: string[] = [
    'relationshipId',
    'historyAction',
    'entityType',
    'entityDescription',
    'startDate'
  ];

  constructor(private route: ActivatedRoute,
              private studentService: StudentService,
              private caregiverService: CaregiverService,
              private caseManagerService: CaseManagerService,
              private sponsorService: SponsorService,
              private programStatusService: ProgramStatusService,
              private relationshipService: RelationshipService,
              private historyService: HistoryService,
              private visitService: VisitService,
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
        this.getVisitListByStudentId(studentId);
        this.getHistoryListByStudentId(studentId);
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

  private getVisitListByStudentId(studentId: number): void {
    this.visitService.getVisitListByStudentId(studentId).subscribe(
      (visitList: Visit[]) => {
        // console.log('visitList', visitList);
        this.visitListRecords = [];
        visitList.forEach(item => {
          this.visitListRecords.push(item);
        });
        this.visitListDataSource = this.visitListRecords;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getHistoryListByStudentId(studentId: number): void {
    this.historyService.getHistoryListByStudentId(studentId).subscribe(
      (historyList: History[]) => {
        // console.log('historyList', historyList);
        this.historyListRecords = [];
        historyList.forEach(item => {
          this.historyListRecords.push(item);
        });
        this.historyListDataSource = this.historyListRecords;
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
        // console.log('response', response);
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

  public openVisitEditDialog(studentId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'create',
      studentId: studentId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(VisitDetailEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      console.log('dialogData', dialogData);
      if (dialogData) {
        const visit: Visit = {};
        visit.studentId = dialogData.studentId;
        visit.visitDate = this.formattingService.formatStandardDateAsMySql(dialogData.visitDate);
        visit.caseManagerId = dialogData.caseManagerId;
        visit.interactionTypeId = dialogData.interactionTypeId;
        visit.visitTypeId = dialogData.visitTypeId;
        visit.caregiverComments = dialogData.caregiverComments;
        visit.caseManagerComments = dialogData.caseManagerComments;
        console.log('visit', visit);
        this.visitService.createVisit(visit).subscribe(
          response => {
            console.log('response', response);
            this.getVisitListByStudentId(this.student.studentId);
          },
          error => {
            console.error('Error: ', error);
          }
        );
      }
    });
  }

  public openEntityEditDialog(entityTypeId: number, entityId: number): void {
    // console.log(entityTypeId, entityId);
    switch (entityTypeId) {
      case 1:
        this.openStudentProgramStatusEditDialog(entityId);
        break;
      case 2:
        this.openStudentCaregiverEditDialog(entityId);
        break;
      case 3:
        this.openStudentCaseManagerEditDialog(entityId);
        break;
      case 4:
        this.openStudentSponsorEditDialog(entityId);
        break;
      default:
        console.log('Unknown Entity Type', entityTypeId);
    }
  }

  public openStudentProgramStatusEditDialog(studentCaregiverId: number): void {
    // console.log('studentCaregiverId', studentCaregiverId);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.minHeight = '400px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: studentCaregiverId === null ? 'create' : 'update',
      studentId: this.student.studentId,
      studentCaregiverId: studentCaregiverId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(StudentProgramStatusEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      console.log('dialogData', dialogData);
      if (dialogData) {
        const programStatus: ProgramStatus = {};
        const formData = dialogData[1];
        programStatus.studentId = this.student.studentId;
        programStatus.programStatusId = formData.programStatusId;
        programStatus.programStatusLevelOneId = formData.programStatusLevelOneId;
        programStatus.programStatusLevelTwoId = formData.programStatusLevelTwoId;
        programStatus.programStatusStartDate = this.formattingService.formatStandardDateAsMySql(formData.relationshipStartDate);
        console.log('programStatus', programStatus);

        switch (dialogData[0]) {
          case 'create':
            this.relationshipService.createProgramStatusRelationship(programStatus).subscribe(
              () => {
                // console.log('response', response);
                this.getProgramStatusDetailByStudentId(this.student.studentId);
                this.getHistoryListByStudentId(this.student.studentId);
              },
              error => {
                console.error('Error: ', error);
              }
            );
            break;
          case 'update':
            this.relationshipService.updateProgramStatusRelationship(programStatus).subscribe(
              response => {
                console.log('response', response);
                this.getProgramStatusDetailByStudentId(this.student.studentId);
                this.getHistoryListByStudentId(this.student.studentId);
              },
              error => {
                console.error('Error: ', error);
              }
            );
            break;
          case 'delete':
            this.relationshipService.deleteProgramStatusRelationship(programStatus).subscribe(
              response => {
                console.log('response', response);
                this.getProgramStatusDetailByStudentId(this.student.studentId);
                this.getHistoryListByStudentId(this.student.studentId);
              },
              error => {
                console.error('Error: ', error);
              }
            );
            break;
          default:
            console.error('Unknown Action Type', dialogData[0]);
        }
      }
    });
  }

  public openStudentCaregiverEditDialog(studentCaregiverId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: studentCaregiverId === null ? 'create' : 'update',
      studentId: this.student.studentId,
      studentCaregiverId: studentCaregiverId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(StudentCaregiverEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      // console.log('dialogData', dialogData);
      if (dialogData) {
        const relationship: Relationship = {};
        const formData = dialogData[1];
        relationship.studentId = this.student.studentId;
        relationship.relationshipType = 'Student-Caregiver';
        relationship.relationshipId = formData.relationshipId;
        relationship.relationshipEntityId = formData.caregiverId;
        relationship.relationshipStartDate = this.formattingService.formatStandardDateAsMySql(formData.relationshipStartDate);
        relationship.relationshipTierTypeId = formData.tierTypeId;
        relationship.relationshipTypeId = formData.relationshipTypeId;
        relationship.relationshipFamilyOfOriginTypeId = formData.relationshipFamilyOfOriginTypeId;
        // console.log('relationship', relationship);

        switch (dialogData[0]) {
          case 'create':
            this.relationshipService.createCaregiverRelationship(relationship).subscribe(
              () => {
                // console.log('response', response);
                this.getCaregiverDetailByStudentId(this.student.studentId);
                this.getHistoryListByStudentId(this.student.studentId);
              },
              error => {
                console.error('Error: ', error);
              }
            );
            break;
          case 'update':
            this.relationshipService.updateCaregiverRelationship(relationship).subscribe(
              response => {
                console.log('response', response);
                this.getCaregiverDetailByStudentId(this.student.studentId);
                this.getHistoryListByStudentId(this.student.studentId);
              },
              error => {
                console.error('Error: ', error);
              }
            );
            break;
          case 'delete':
            this.relationshipService.deleteCaregiverRelationship(relationship).subscribe(
              response => {
                console.log('response', response);
                this.getCaregiverDetailByStudentId(this.student.studentId);
                this.getHistoryListByStudentId(this.student.studentId);
              },
              error => {
                console.error('Error: ', error);
              }
            );
            break;
          default:
            console.error('Unknown Action Type', dialogData[0]);
        }
      }
    });
  }

  public openStudentCaseManagerEditDialog(studentCaregiverId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: studentCaregiverId === null ? 'create' : 'update',
      studentId: this.student.studentId,
      studentCaregiverId: studentCaregiverId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(StudentCaseManagerEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      // console.log('dialogData', dialogData);
      if (dialogData) {
        const relationship: Relationship = {};
        const formData = dialogData[1];
        relationship.studentId = this.student.studentId;
        relationship.relationshipType = 'Student-Caregiver';
        relationship.relationshipId = formData.relationshipId;
        relationship.relationshipEntityId = formData.caseManagerId;
        relationship.relationshipStartDate = this.formattingService.formatStandardDateAsMySql(formData.relationshipStartDate);
        // console.log('relationship', relationship);

        switch (dialogData[0]) {
          case 'create':
            this.relationshipService.createCaseManagerRelationship(relationship).subscribe(
              () => {
                // console.log('response', response);
                this.getCaseManagerDetailByStudentId(this.student.studentId);
                this.getHistoryListByStudentId(this.student.studentId);
              },
              error => {
                console.error('Error: ', error);
              }
            );
            break;
          case 'update':
            this.relationshipService.updateCaseManagerRelationship(relationship).subscribe(
              response => {
                console.log('response', response);
                this.getCaseManagerDetailByStudentId(this.student.studentId);
                this.getHistoryListByStudentId(this.student.studentId);
              },
              error => {
                console.error('Error: ', error);
              }
            );
            break;
          case 'delete':
            console.log('relationship', relationship);
            this.relationshipService.deleteCaseManagerRelationship(relationship).subscribe(
              response => {
                console.log('response', response);
                this.getCaseManagerDetailByStudentId(this.student.studentId);
                this.getHistoryListByStudentId(this.student.studentId);
              },
              error => {
                console.error('Error: ', error);
              }
            );
            break;
          default:
            console.error('Unknown Action Type', dialogData[0]);
        }
      }
    });
  }

  public openStudentSponsorEditDialog(studentSponsorId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: studentSponsorId === null ? 'create' : 'update',
      studentId: this.student.studentId,
      studentSponsorId: studentSponsorId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(StudentSponsorEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      console.log('dialogData', dialogData);
      if (dialogData) {
        const relationship: Relationship = {};
        const formData = dialogData[1];
        relationship.studentId = this.student.studentId;
        relationship.relationshipType = 'Student-Sponsor';
        relationship.relationshipId = formData.relationshipId;
        relationship.relationshipEntityId = formData.sponsorId;
        relationship.relationshipStartDate = this.formattingService.formatStandardDateAsMySql(formData.relationshipStartDate);
        // console.log('relationship', relationship);

        switch (dialogData[0]) {
          case 'create':
            this.relationshipService.createSponsorRelationship(relationship).subscribe(
              () => {
                // console.log('response', response);
                this.getSponsorDetailByStudentId(this.student.studentId);
                this.getHistoryListByStudentId(this.student.studentId);
              },
              error => {
                console.error('Error: ', error);
              }
            );
            break;
          case 'update':
            this.relationshipService.updateSponsorRelationship(relationship).subscribe(
              response => {
                console.log('response', response);
                this.getSponsorDetailByStudentId(this.student.studentId);
                this.getHistoryListByStudentId(this.student.studentId);
              },
              error => {
                console.error('Error: ', error);
              }
            );
            break;
          case 'delete':
            console.log('relationship', relationship);
            this.relationshipService.deleteSponsorRelationship(relationship).subscribe(
              response => {
                console.log('response', response);
                this.getSponsorDetailByStudentId(this.student.studentId);
                this.getHistoryListByStudentId(this.student.studentId);
              },
              error => {
                console.error('Error: ', error);
              }
            );
            break;
          default:
            console.error('Unknown Action Type', dialogData[0]);
        }
      }
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
