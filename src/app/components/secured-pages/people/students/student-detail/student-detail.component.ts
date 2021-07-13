import { Component, HostListener, OnInit } from '@angular/core';
import { Student } from '../../../../../models/people/student.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '@tqp/services/event.service';
import { StudentService } from '../../../../../services/people/student.service';
import { Relationship } from '../../../../../models/relationship.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentCaregiverEditDialogComponent } from '../../../relationships/student-caregiver-edit-dialog/student-caregiver-edit-dialog.component';
import { AuthService } from '@tqp/services/auth.service';
import { CaregiverService } from '../../../../../services/people/caregiver.service';
import { Caregiver } from '../../../../../models/people/caregiver.model';
import { StudentCaseManagerEditDialogComponent } from '../../../relationships/student-case-manager-edit-dialog/student-case-manager-edit-dialog.component';
import { FormattingService } from '@tqp/services/formatting.service';
import { CaseManager } from '../../../../../models/people/case-manager.model';
import { CaseManagerService } from '../../../../../services/people/case-manager.service';
import { Sponsor } from '../../../../../models/people/sponsor.model';
import { StudentSponsorEditDialogComponent } from '../../../relationships/student-sponsor-edit-dialog/student-sponsor-edit-dialog.component';
import { SponsorService } from '../../../../../services/people/sponsor.service';
import { RelationshipService } from '../../../../../services/relationships/relationship.service';
import { ProgramStatusService } from '../../../../../services/program-status.service';
import { ProgramStatus } from '../../../../../models/program.status';
import { Visit } from '../../../../../models/visit.model';
import { VisitService } from '../../../../../services/events/visit.service';
import { VisitDetailEditDialogComponent } from '../../../events/visits/visit-detail-edit-dialog/visit-detail-edit-dialog.component';
import { HistoryService } from '../../../../../services/people/history.service';
import { CsiRecord } from '../../../../../models/csi-record.model';
import { PostGradEvent } from '../../../../../models/post-grad-event.model';
import { CsiRecordService } from '../../../../../services/events/csi-record.service';
import { ChartType } from 'chart.js';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities';
import { PostGradEventService } from '../../../../../services/events/post-grad-event.service';
import { PostGradEventDetailEditDialogComponent } from '../../../events/post-grad-events/post-grad-event-detail-edit-dialog/post-grad-event-detail-edit-dialog.component';
import { SponsorLetterService } from '../../../../../services/events/sponsor-letter.service';
import { SponsorLetter } from '../../../../../models/sponsor.letter';
import { SponsorLetterDetailEditDialogComponent } from '../../../events/sponsor-letters/sponsor-letter-detail-edit-dialog/sponsor-letter-detail-edit-dialog.component';
import { tqpCustomAnimations } from '@tqp/animations/tqpCustomAnimations';
import { ProgramStatusEditDialogComponent } from '../../../events/program-status/program-status-edit-dialog/program-status-edit-dialog.component';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
  animations: [tqpCustomAnimations]
})
export class StudentDetailComponent implements OnInit {
  public pageSource: string;

  public student: Student;
  public caregiver: Caregiver;
  public caseManager: CaseManager;
  public sponsor: Sponsor;
  public programStatus: ProgramStatus;

  public caseManagerOwner: boolean;

  public genderNames = {'M': 'Male', 'F': 'Female', 'O': 'Other'};
  public yesNoFromInteger = {0: '', 1: 'Yes', 2: 'No'};
  public csiScoresChartData: Array<any> = [];

  // Loading
  public studentLoading: boolean = false;
  public programStatusLoading: boolean = false;
  public caseManagerLoading: boolean = false;
  public caregiverLoading: boolean = false;
  public sponsorLoading: boolean = false;

  // Visit List
  public visitListLoading: boolean = false;
  public visitListIsCollapsed: boolean = true;
  public visitListRecords: Visit[] = [];
  public visitListDataSource: Visit[] = [];
  public visitListDisplayedColumns: string[] = [
    'visitDate',
    'visitTypeName',
    'interactionTypeName',
    'caseManagerName'
  ];

  // My Visit List
  public myVisitListLoading: boolean = false;
  public myVisitListIsCollapsed: boolean = true;
  public myVisitListRecords: Visit[] = [];
  public myVisitListDataSource: Visit[] = [];
  public myVisitListDisplayedColumns: string[] = [
    'visitDate',
    'visitTypeName',
    'interactionTypeName',
    'caseManagerName'
  ];

  // CSI List
  public csiListLoading: boolean = false;
  public csiListIsCollapsed: boolean = true;
  public csiListRecords: CsiRecord[] = [];
  public csiListDataSource: CsiRecord[] = [];
  public csiListDisplayedColumns: string[] = [
    'csiRecordDate',
    'caseManagerName'
  ];

  // Post Grad Event List
  public postGradEventListLoading: boolean = false;
  public postGradEventListIsCollapsed: boolean = true;
  public postGradEventListRecords: PostGradEvent[] = [];
  public postGradEventListDataSource: PostGradEvent[] = [];
  public postGradEventListDisplayedColumns: string[] = [
    'postGradEventDate',
    'postGradEventTypeName',
  ];

  // Student-Sponsor Letters
  public sponsorLetterListLoading: boolean = false;
  public sponsorLetterListIsCollapsed: boolean = true;
  public sponsorLetterListRecords: Visit[] = [];
  public sponsorLetterListDataSource: Visit[] = [];
  public sponsorLetterListDisplayedColumns: string[] = [
    'sponsorLetterDate',
    'sponsorName'
  ];

  // History List
  public historyListLoading: boolean = false;
  public historyListIsCollapsed: boolean = true;
  public historyListRecords: History[] = [];
  public historyListDataSource: History[] = [];
  public historyListDisplayedColumns: string[] = [
    'startDate',
    'entityType',
    'entityDescription'
  ];

  // lineChart
  public lineChartLabels: Array<any> = [
    'Abuse & Exploitation', // Child Protection
    'Legal Protection',
    'Performance', // Education and Skills Training
    'Education & Work',
    'Food Security', // Food & Nutrition
    'Nutrition & Growth',
    'Healthcare Services', // Health
    'Wellness',
    'Emotional Health', // Psychosocial
    'Social Behavior',
    'Care', // Care & Shelter
    'Shelter'
  ];
  public lineChartOptions: any = {
    animation: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          id: 'dataAxis',
          ticks: {
            maxRotation: 90,
            minRotation: 90
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 4,
            stepSize: 1
          }
        }
      ]
    },
    legend: {
      display: false
    }
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  constructor(private route: ActivatedRoute,
              private studentService: StudentService,
              private caregiverService: CaregiverService,
              private caseManagerService: CaseManagerService,
              private sponsorService: SponsorService,
              private programStatusService: ProgramStatusService,
              private relationshipService: RelationshipService,
              private postGradEventService: PostGradEventService,
              private sponsorLetterService: SponsorLetterService,
              private historyService: HistoryService,
              private visitService: VisitService,
              private csiService: CsiRecordService,
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
        this.isTheLoggedInUserTheStudentsCaseManager(studentId);
        this.getStudentDetail(studentId);
        this.getCsiListByStudentId(studentId);
        this.getPostGradEventListByStudentId(studentId);
        this.getSponsorLetterListByStudentId(studentId);
        this.getHistoryListByStudentId(studentId);
        this.getCurrentCaregiverDetailByStudentId(studentId);
        this.getCurrentCaseManagerDetailByStudentId(studentId);
        this.getCurrentSponsorDetailByStudentId(studentId);
        this.getProgramStatusDetailByStudentId(studentId);
        this.drawCsiScoresChart(studentId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private isTheLoggedInUserTheStudentsCaseManager(studentId: number): void {
    this.caseManagerService.isTheLoggedInUserTheStudentsCaseManager(studentId).subscribe(
      (response: boolean) => {
        // console.log('caseManagerOwner', response);
        this.caseManagerOwner = response != null ? response : false
        if(this.caseManagerOwner) {
          this.getMyVisitListByStudentId(studentId);
        } else {
          this.getVisitListByStudentId(studentId);
        }
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private drawCsiScoresChart(studentId: number): void {
    this.csiService.getMostRecentCsiRecordScoresByStudentId(studentId).subscribe(
      (csi: CsiRecord) => {
        if (csi) {
          this.csiScoresChartData = [
            {
              data: [
                csi.csiRecordScoreAbuseAndExploitation,
                csi.csiRecordScoreLegalProtection,
                csi.csiRecordScorePerformance,
                csi.csiRecordScoreEducationAndWork,
                csi.csiRecordScoreFoodSecurity,
                csi.csiRecordScoreNutritionAndGrowth,
                csi.csiRecordScoreHealthCareServices,
                csi.csiRecordScoreWellness,
                csi.csiRecordScoreEmotionalHealth,
                csi.csiRecordScoreSocialBehavior,
                csi.csiRecordScoreCare,
                csi.csiRecordScoreShelter
              ],
              lineTension: 0,
              fill: false,
              steppedLine: false
            }
          ];
        }
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getStudentDetail(studentId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.studentService.getStudentDetail(studentId).subscribe(
      (student: Student) => {
        this.student = student;
        // console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getCsiListByStudentId(studentId: number): void {
    this.csiListLoading = true;
    this.csiService.getCsiRecordListByStudentId(studentId).subscribe(
      (csiList: CsiRecord[]) => {
        // console.log('csiList', csiList);
        this.csiListRecords = [];
        if (csiList) {
          csiList.forEach(item => {
            this.csiListRecords.push(item);
          });
          this.csiListDataSource = this.csiListRecords;
          this.csiListLoading = false;
        }
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getVisitListByStudentId(studentId: number): void {
    this.visitListLoading = true;
    this.visitService.getVisitListByStudentId(studentId).subscribe(
      (visitList: Visit[]) => {
        // console.log('visitList', visitList);
        this.visitListRecords = [];
        if (visitList) {
          visitList.forEach(item => {
            this.visitListRecords.push(item);
          });
          this.visitListDataSource = this.visitListRecords;
          this.visitListLoading = false;
        }
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getMyVisitListByStudentId(studentId: number): void {
    this.visitListLoading = true;
    this.visitService.getMyVisitListByStudentId(studentId).subscribe(
      (visitList: Visit[]) => {
        console.log('visitList', visitList);
        this.myVisitListRecords = [];
        if (visitList) {
          visitList.forEach(item => {
            this.myVisitListRecords.push(item);
          });
          this.myVisitListDataSource = this.myVisitListRecords;
          this.myVisitListLoading = false;
        }
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getPostGradEventListByStudentId(studentId: number): void {
    this.postGradEventListLoading = true;
    this.postGradEventService.getPostGradEventListByStudentId(studentId).subscribe(
      (postGradEventList: PostGradEvent[]) => {
        // console.log('postGradEventList', postGradEventList);
        this.postGradEventListRecords = [];
        if (postGradEventList) {
          postGradEventList.forEach(item => {
            this.postGradEventListRecords.push(item);
          });
          this.postGradEventListDataSource = this.postGradEventListRecords;
          this.postGradEventListLoading = false;
        }
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getSponsorLetterListByStudentId(studentId: number): void {
    this.sponsorLetterListLoading = true;
    this.sponsorLetterService.getSponsorLetterListByStudentId(studentId).subscribe(
      (sponsorLetterList: SponsorLetter[]) => {
        // console.log('sponsorLetterList', sponsorLetterList);
        this.sponsorLetterListRecords = [];
        if (sponsorLetterList) {
          sponsorLetterList.forEach(item => {
            this.sponsorLetterListRecords.push(item);
          });
          this.sponsorLetterListDataSource = this.sponsorLetterListRecords;
          this.sponsorLetterListLoading = false;
        }
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
        if (historyList) {
          historyList.forEach(item => {
            this.historyListRecords.push(item);
          });
          this.historyListDataSource = this.historyListRecords;
        }
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getCurrentCaregiverDetailByStudentId(studentId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.caregiverLoading = true;
    this.caregiverService.getCurrentCaregiverDetailByStudentId(studentId).subscribe(
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

  private getCurrentCaseManagerDetailByStudentId(studentId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.caseManagerLoading = true;
    this.caseManagerService.getCurrentCaseManagerDetailByStudentId(studentId).subscribe(
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

  private getCurrentSponsorDetailByStudentId(studentId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.sponsorLoading = true;
    this.sponsorService.getCurrentSponsorDetailByStudentId(studentId).subscribe(
      response => {
        // console.log('response', response);
        this.sponsor = response;
        // this.sponsor.relationshipStartDate = this.formattingService.formatMySqlDateAsStandard(this.sponsor.relationshipStartDate);
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

  public openPostGradEventCreateDialog(studentId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'create',
      studentId: studentId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(PostGradEventDetailEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      // console.log('dialogData', dialogData);
      if (dialogData) {
        const postGradEvent: PostGradEvent = {};
        const formData = dialogData[1];
        postGradEvent.studentId = this.student.studentId;
        postGradEvent.postGradEventTypeId = formData.postGradEventTypeId;
        postGradEvent.postGradEventDate = this.formattingService.formatStandardDateAsMySql(formData.postGradEventDate);
        postGradEvent.postGradEventComments = formData.postGradEventComments;
        // console.log('postGradEvent', postGradEvent);

        switch (dialogData[0]) {
          case 'create':
            this.postGradEventService.createPostGradEvent(postGradEvent).subscribe(
              (response) => {
                // console.log('response', response);
                this.getPostGradEventListByStudentId(this.student.studentId);
                // this.getHistoryListByStudentId(this.student.studentId);
              },
              error => {
                console.error('Error: ', error);
              }
            );
            break;
          case 'update':
            this.postGradEventService.updatePostGradEvent(postGradEvent).subscribe(
              response => {
                console.log('response', response);
                this.getPostGradEventListByStudentId(this.student.studentId);
                // this.getHistoryListByStudentId(this.student.studentId);
              },
              error => {
                console.error('Error: ', error);
              }
            );
            break;
          case 'delete':
            this.postGradEventService.deletePostGradEvent(postGradEvent.postGradEventId).subscribe(
              response => {
                console.log('response', response);
                this.getPostGradEventListByStudentId(this.student.studentId);
                // this.getHistoryListByStudentId(this.student.studentId);
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

  public openVisitCreateDialog(studentId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'create',
      studentId: studentId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(VisitDetailEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      // console.log('dialogData', dialogData);
      if (dialogData) {
        const visit: Visit = {};
        visit.studentId = dialogData.studentId;
        visit.visitDate = this.formattingService.formatStandardDateAsMySql(dialogData.visitDate);
        visit.caseManagerUserId = dialogData.caseManagerUserId;
        visit.interactionTypeId = dialogData.interactionTypeId;
        visit.visitTypeId = dialogData.visitTypeId;
        visit.caregiverComments = dialogData.caregiverComments;
        visit.caseManagerComments = dialogData.caseManagerComments;
        // console.log('visit', visit);
        this.visitService.createVisit(visit).subscribe(
          response => {
            // console.log('response', response);
            this.getVisitListByStudentId(this.student.studentId);
          },
          error => {
            console.error('Error: ', error);
          }
        );
      }
    });
  }

  public openEntityEditDialog(entityTypeId: number, relationshipId: number, currentEntityId: number): void {
    console.log(entityTypeId, relationshipId, currentEntityId);
    switch (entityTypeId) {
      case 1:
        this.openStudentProgramStatusCreateDialog(relationshipId);
        break;
      case 2:
        this.openStudentCaregiverCreateDialog(relationshipId, currentEntityId);
        break;
      case 3:
        this.openStudentCaseManagerCreateDialog(relationshipId, currentEntityId);
        break;
      case 4:
        this.openStudentSponsorCreateDialog(relationshipId, currentEntityId);
        break;
      default:
        console.log('Unknown Entity Type', entityTypeId);
    }
  }

  public openStudentProgramStatusCreateDialog(studentCaregiverId: number): void {
    // console.log('studentCaregiverId', studentCaregiverId);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.minHeight = '200px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: studentCaregiverId === null ? 'create' : 'update',
      studentId: this.student.studentId,
      studentCaregiverId: studentCaregiverId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(ProgramStatusEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      // console.log('dialogData', dialogData);
      if (dialogData) {
        const programStatus: ProgramStatus = {};
        const formData = dialogData[1];
        programStatus.studentId = this.student.studentId;
        programStatus.programStatusId = formData.programStatusId;
        programStatus.programStatusLevelOneId = formData.programStatusLevelOneId;
        programStatus.programStatusLevelTwoId = formData.programStatusLevelTwoId;
        programStatus.programStatusStartDate = this.formattingService.formatStandardDateAsMySql(formData.relationshipStartDate);

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

  public openStudentCaregiverCreateDialog(studentCaregiverId: number, relationshipId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: studentCaregiverId === null ? 'create' : 'update',
      studentId: this.student.studentId,
      studentCaregiverId: studentCaregiverId,
      relationshipId: relationshipId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(StudentCaregiverEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      console.log('dialogData', dialogData);
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
                this.getCurrentCaregiverDetailByStudentId(this.student.studentId);
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
                this.getCurrentCaregiverDetailByStudentId(this.student.studentId);
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
                this.getCurrentCaregiverDetailByStudentId(this.student.studentId);
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

  public openStudentCaseManagerCreateDialog(relationshipId: number, currentCaseManager: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: relationshipId === null ? 'create' : 'update',
      studentId: this.student.studentId,
      relationshipId: relationshipId,
      currentCaseManager: currentCaseManager
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
        relationship.relationshipEntityId = formData.caseManagerUserId;
        relationship.relationshipStartDate = this.formattingService.formatStandardDateAsMySql(formData.relationshipStartDate);
        console.log('relationship', relationship);

        switch (dialogData[0]) {
          case 'create':
            this.relationshipService.createCaseManagerRelationship(relationship).subscribe(
              () => {
                // console.log('response', response);
                this.getCurrentCaseManagerDetailByStudentId(this.student.studentId);
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
                this.getCurrentCaseManagerDetailByStudentId(this.student.studentId);
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
                this.getCurrentCaseManagerDetailByStudentId(this.student.studentId);
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

  public openStudentSponsorCreateDialog(studentSponsorId: number, relationshipId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: studentSponsorId === null ? 'create' : 'update',
      studentId: this.student.studentId,
      studentSponsorId: studentSponsorId,
      relationshipId: relationshipId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(StudentSponsorEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      // console.log('dialogData', dialogData);
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
                this.getCurrentSponsorDetailByStudentId(this.student.studentId);
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
                this.getCurrentSponsorDetailByStudentId(this.student.studentId);
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
                this.getCurrentSponsorDetailByStudentId(this.student.studentId);
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

  public openSponsorLetterEditDialog(sponsorLetterId: number, sponsorId: number, studentId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: sponsorLetterId === null ? 'create' : 'update',
      studentId: studentId,
      sponsorId: sponsorId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(SponsorLetterDetailEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      console.log('dialogData', dialogData);
      // if (dialogData) {
      //   const relationship: Relationship = {};
      //   const formData = dialogData[1];
      //   relationship.studentId = this.student.studentId;
      //   relationship.relationshipType = 'Student-Sponsor';
      //   relationship.relationshipId = formData.relationshipId;
      //   relationship.relationshipEntityId = formData.sponsorId;
      //   relationship.relationshipStartDate = this.formattingService.formatStandardDateAsMySql(formData.relationshipStartDate);
      //   console.log('relationship', relationship);
      //
      //   switch (dialogData[0]) {
      //     case 'create':
      //       this.relationshipService.createSponsorRelationship(relationship).subscribe(
      //         () => {
      //           // console.log('response', response);
      //           this.getCurrentSponsorDetailByStudentId(this.student.studentId);
      //           this.getHistoryListByStudentId(this.student.studentId);
      //         },
      //         error => {
      //           console.error('Error: ', error);
      //         }
      //       );
      //       break;
      //     case 'update':
      //       this.relationshipService.updateSponsorRelationship(relationship).subscribe(
      //         response => {
      //           console.log('response', response);
      //           this.getCurrentSponsorDetailByStudentId(this.student.studentId);
      //           this.getHistoryListByStudentId(this.student.studentId);
      //         },
      //         error => {
      //           console.error('Error: ', error);
      //         }
      //       );
      //       break;
      //     case 'delete':
      //       console.log('relationship', relationship);
      //       this.relationshipService.deleteSponsorRelationship(relationship).subscribe(
      //         response => {
      //           console.log('response', response);
      //           this.getCurrentSponsorDetailByStudentId(this.student.studentId);
      //           this.getHistoryListByStudentId(this.student.studentId);
      //         },
      //         error => {
      //           console.error('Error: ', error);
      //         }
      //       );
      //       break;
      //     default:
      //       console.error('Unknown Action Type', dialogData[0]);
      //   }
      // }
    });
  }

  // BUTTONS

  public toggleVisitListIsCollapsed(event) {
    if (event.target.nodeName === 'SMALL') {
      return;
    }
    this.visitListIsCollapsed = !this.visitListIsCollapsed;
  }

  public toggleMyVisitListIsCollapsed(event) {
    if (event.target.nodeName === 'SMALL') {
      return;
    }
    this.myVisitListIsCollapsed = !this.myVisitListIsCollapsed;
  }

  public toggleCsiListIsCollapsed(event) {
    if (event.target.nodeName === 'SMALL') {
      return;
    }
    this.csiListIsCollapsed = !this.csiListIsCollapsed;
  }

  public toggleSponsorLetterListIsCollapsed(event) {
    if (event.target.nodeName === 'SMALL') {
      return;
    }
    this.sponsorLetterListIsCollapsed = !this.sponsorLetterListIsCollapsed;
  }

  public togglePostGradEventListIsCollapsed(event) {
    if (event.target.nodeName === 'SMALL') {
      return;
    }
    this.postGradEventListIsCollapsed = !this.postGradEventListIsCollapsed;
  }

  public toggleHistoryListIsCollapsed(event) {
    if (event.target.nodeName === 'SMALL') {
      return;
    }
    this.historyListIsCollapsed = !this.historyListIsCollapsed;
  }

  public collapseAllLists(): void {
    this.visitListIsCollapsed = true;
    this.csiListIsCollapsed = true;
    this.postGradEventListIsCollapsed = true;
    this.sponsorLetterListIsCollapsed = true;
    this.historyListIsCollapsed = true;
  }

  public returnToList(): void {
    this.router.navigate(['students/student-list']).then();
  }

  public openStudentEditPage(): void {
    this.router.navigate(['students/student-detail-edit', this.student.studentId]).then();
  }

  public openCsiCreatePage(): void {
    this.router.navigate(['csi-records/csi-record-create'], {state: {studentId: this.student.studentId}}).then();
  }

  public openTwitter(twitterHandle: string): void {
    console.log('openTwitter', twitterHandle);
    window.open('https://twitter.com/' + twitterHandle, '_blank');
  }

  // Chart Events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'e') {
      event.preventDefault();
      this.openStudentEditPage();
    }
    if (event.ctrlKey && event.key === 'l') {
      event.preventDefault();
      this.returnToList();
    }
  }

}
