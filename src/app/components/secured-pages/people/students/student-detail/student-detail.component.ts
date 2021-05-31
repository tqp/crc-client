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
import { StudentProgramStatusEditDialogComponent } from '../../../relationships/student-program-status-edit-dialog/student-program-status-edit-dialog.component';
import { ProgramStatusService } from '../../../relationships/student-program-status-edit-dialog/program-status.service';
import { ProgramStatus } from '../../../relationships/student-program-status-edit-dialog/ProgramStatus';
import { Visit } from '../../../../../models/visit.model';
import { VisitService } from '../../../../../services/events/visit.service';
import { VisitDetailEditDialogComponent } from '../../../events/visits/visit-detail-edit-dialog/visit-detail-edit-dialog.component';
import { HistoryService } from '../../../../../services/people/history.service';
import { Csi } from '../../../../../models/csi.model';
import { PostGradEvent } from '../../../../../models/post-grad-event.model';
import { CsiService } from '../../../../../services/events/csi.service';
import { ChartType } from 'chart.js';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities';
import { PostGradEventService } from '../../../../../services/events/post-grad-event.service';
import { PostGradEventDetailEditDialogComponent } from '../../../events/post-grad-events/post-grad-event-detail-edit-dialog/post-grad-event-detail-edit-dialog.component';
import { StudentSponsorLetterService } from '../../../../../services/events/student-sponsor-letter.service';
import { StudentSponsorLetterModel } from '../../../../../models/student-sponsor-letter.model';
import { StudentSponsorLetterDetailEditDialogComponent } from '../../../events/student-sponsor-letter/student-sponsor-letter-detail-edit-dialog/student-sponsor-letter-detail-edit-dialog.component';

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
  public csiScoresChartData: Array<any> = [];

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
    // 'visitId',
    'visitDate',
    'visitTypeName',
    'interactionTypeName',
    'caseManagerName'
  ];

  // History List
  public historyListLoading: boolean = false;
  public historyListRecords: History[] = [];
  public historyListDataSource: History[] = [];
  public historyListDisplayedColumns: string[] = [
    'relationshipId',
    'startDate',
    // 'historyAction',
    'entityType',
    'entityDescription'
  ];

  // CSI List
  public csiListLoading: boolean = false;
  public csiListRecords: Csi[] = [];
  public csiListDataSource: Csi[] = [];
  public csiListDisplayedColumns: string[] = [
    // 'csiId',
    'csiDate',
    'caseManager'
  ];

  // Post Grad Event List
  public postGradEventListLoading: boolean = false;
  public postGradEventListRecords: PostGradEvent[] = [];
  public postGradEventListDataSource: PostGradEvent[] = [];
  public postGradEventListDisplayedColumns: string[] = [
    // 'postGradEventId',
    'postGradEventDate',
    'postGradEventTypeName',
  ];

  // Student-Sponsor Letters
  public studentSponsorLetterListLoading: boolean = false;
  public studentSponsorLetterListRecords: Visit[] = [];
  public studentSponsorLetterListDataSource: Visit[] = [];
  public studentSponsorLetterListDisplayedColumns: string[] = [
    // 'studentSponsorLetterId',
    'studentSponsorLetterDate',
    'sponsorName'
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
              private studentSponsorLetterService: StudentSponsorLetterService,
              private historyService: HistoryService,
              private visitService: VisitService,
              private csiService: CsiService,
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
        this.getCsiListByStudentId(studentId);
        this.getVisitListByStudentId(studentId);
        this.getPostGradEventListByStudentId(studentId);
        this.getStudentSponsorLetterListByStudentId(studentId);
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

  private drawCsiScoresChart(studentId: number): void {
    this.csiService.getMostRecentCsiScoresByStudentId(studentId).subscribe(
      (csi: Csi) => {
        if (csi) {
          this.csiScoresChartData = [
            {
              data: [
                csi.csiScoreAbuseAndExploitation,
                csi.csiScoreLegalProtection,
                csi.csiScorePerformance,
                csi.csiScoreEducationAndWork,
                csi.csiScoreFoodSecurity,
                csi.csiScoreNutritionAndGrowth,
                csi.csiScoreHealthCareServices,
                csi.csiScoreWellness,
                csi.csiScoreEmotionalHealth,
                csi.csiScoreSocialBehavior,
                csi.csiScoreCare,
                csi.csiScoreShelter
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

  private getCsiListByStudentId(studentId: number): void {
    this.csiService.getCsiListByStudentId(studentId).subscribe(
      (csiList: Csi[]) => {
        // console.log('csiList', csiList);
        this.csiListRecords = [];
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

  private getPostGradEventListByStudentId(studentId: number): void {
    this.postGradEventService.getPostGradEventListByStudentId(studentId).subscribe(
      (postGradEventList: PostGradEvent[]) => {
        // console.log('postGradEventList', postGradEventList);
        this.postGradEventListRecords = [];
        postGradEventList.forEach(item => {
          this.postGradEventListRecords.push(item);
        });
        this.postGradEventListDataSource = this.postGradEventListRecords;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getStudentSponsorLetterListByStudentId(studentId: number): void {
    this.studentSponsorLetterService.getStudentSponsorLetterListByStudentId(studentId).subscribe(
      (studentSponsorLetterList: StudentSponsorLetterModel[]) => {
        // console.log('studentSponsorLetterList', studentSponsorLetterList);
        this.studentSponsorLetterListRecords = [];
        studentSponsorLetterList.forEach(item => {
          this.studentSponsorLetterListRecords.push(item);
        });
        this.studentSponsorLetterListDataSource = this.studentSponsorLetterListRecords;
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
        console.log('response', response);
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
        console.log('sponsor', this.sponsor);
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
      console.log('dialogData', dialogData);
      if (dialogData) {
        const postGradEvent: PostGradEvent = {};
        const formData = dialogData[1];
        postGradEvent.studentId = this.student.studentId;
        postGradEvent.postGradEventTypeId = formData.postGradEventTypeId;
        postGradEvent.postGradEventDate = this.formattingService.formatStandardDateAsMySql(formData.postGradEventDate);
        postGradEvent.postGradEventComments = formData.postGradEventComments;
        console.log('postGradEvent', postGradEvent);

        switch (dialogData[0]) {
          case 'create':
            this.postGradEventService.createPostGradEvent(postGradEvent).subscribe(
              (response) => {
                console.log('response', response);
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
        relationship.relationshipEntityId = formData.userId;
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
      console.log('dialogData', dialogData);
      if (dialogData) {
        const relationship: Relationship = {};
        const formData = dialogData[1];
        relationship.studentId = this.student.studentId;
        relationship.relationshipType = 'Student-Sponsor';
        relationship.relationshipId = formData.relationshipId;
        relationship.relationshipEntityId = formData.sponsorId;
        relationship.relationshipStartDate = this.formattingService.formatStandardDateAsMySql(formData.relationshipStartDate);
        console.log('relationship', relationship);

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

  public openStudentSponsorLetterEditDialog(studentSponsorLetterId: number, sponsorId: number, studentId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: studentSponsorLetterId === null ? 'create' : 'update',
      studentId: studentId,
      sponsorId: sponsorId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(StudentSponsorLetterDetailEditDialogComponent, dialogConfig);

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
        console.log('relationship', relationship);

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

  // Buttons

  public returnToList(): void {
    this.router.navigate(['students/student-list']).then();
  }

  public openStudentEditPage(): void {
    this.router.navigate(['students/student-detail-edit', this.student.studentId]).then();
  }

  public openCsiCreatePage(): void {
    this.router.navigate(['csi/csi-create'], {state: {studentId: this.student.studentId}}).then();
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
