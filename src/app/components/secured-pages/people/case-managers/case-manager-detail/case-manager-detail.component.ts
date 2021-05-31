import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '@tqp/services/event.service';
import { CaseManager } from '../../../../../models/people/case-manager.model';
import { CaseManagerService } from '../../../../../services/people/case-manager.service';
import { Student } from '../../../../../models/people/student.model';
import { AuthService } from '@tqp/services/auth.service';
import { RelationshipService } from '../../../../../services/relationships/relationship.service';
import { CsiService } from '../../../../../services/events/csi.service';
import { Csi } from '../../../../../models/csi.model';
import { CaseManagerQualification } from '../../../../../models/case-manager-qualification.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CaseManagerQualificationService } from '../../../../../services/events/case-manager-qualification.service';
import { FormattingService } from '@tqp/services/formatting.service';
import { CaseManagerQualificationEditDialogComponent } from '../../../events/case-manager-qualifications/case-manager-qualification-edit-dialog/case-manager-qualification-edit-dialog.component';

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
  public studentListLoading: boolean = false;
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

  // Qualifications List
  public qualificationListRecords: CaseManagerQualification[] = [];
  public qualificationListDataSource: CaseManagerQualification[] = [];
  public qualificationListDisplayedColumns: string[] = [
    'qualificationInstitution',
    'qualificationName',
    'actions'
  ];

  constructor(private route: ActivatedRoute,
              private caseManagerService: CaseManagerService,
              private relationshipService: RelationshipService,
              private caseManagerQualificationService: CaseManagerQualificationService,
              private formattingService: FormattingService,
              private csiService: CsiService,
              private eventService: EventService,
              private router: Router,
              public authService: AuthService,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const caseManagerId = params['id'];
        this.getCaseManagerDetail(caseManagerId);
        this.getStudentListByCaseManagerId(caseManagerId);
        this.getCsiListByCaseManagerId(caseManagerId);
        this.getQualificationListByCaseManagerId(caseManagerId);
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
    this.studentListLoading = true;
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
      },
      () => {
        this.studentListLoading = false;
      }
    );
  }

  private getCsiListByCaseManagerId(caseManagerId: number): void {
    this.csiService.getCsiListByCaseManagerId(caseManagerId).subscribe(
      (csiList: Csi[]) => {
        // console.log('csiList', csiList);
        if (csiList) {
          csiList.forEach(item => {
            this.csiListRecords.push(item);
          });
          this.csiListDataSource = this.csiListRecords;
        }
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getQualificationListByCaseManagerId(caseManagerId: number): void {
    this.caseManagerQualificationService.getQualificationListByCaseManagerId(caseManagerId).subscribe(
      (qualificationList: CaseManagerQualification[]) => {
        // console.log('qualificationList', qualificationList);
        this.qualificationListRecords = [];
        qualificationList.forEach(item => {
          this.qualificationListRecords.push(item);
        });
        this.qualificationListDataSource = this.qualificationListRecords;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // DIALOGS

  public openCaseManagerQualificationCreateDialog(caseManagerId: number, caseManagerQualificationId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: caseManagerQualificationId == null ? 'create' : 'update',
      caseManagerQualificationId: caseManagerQualificationId,
      caseManagerId: caseManagerId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(CaseManagerQualificationEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      // console.log('dialogData', dialogData);
      if (dialogData) {
        const caseManagerQualification: CaseManagerQualification = {};
        const formData = dialogData[1];
        caseManagerQualification.caseManagerQualificationId = formData.caseManagerQualificationId;
        caseManagerQualification.caseManagerId = formData.caseManagerId;
        caseManagerQualification.qualificationInstitution = formData.qualificationInstitution;
        caseManagerQualification.qualificationName = formData.qualificationName;

        switch (dialogData[0]) {
          case 'create':
            this.caseManagerQualificationService.createCaseManagerQualification(caseManagerQualification).subscribe(
              () => {
                // console.log('response', response);
                this.getQualificationListByCaseManagerId(this.caseManager.userId);
              },
              error => {
                console.error('Error: ', error);
              }
            );
            break;
          case 'update':
            this.caseManagerQualificationService.updateCaseManagerQualification(caseManagerQualification).subscribe(
              response => {
                // console.log('response', response);
                this.getQualificationListByCaseManagerId(this.caseManager.userId);
              },
              error => {
                console.error('Error: ', error);
              }
            );
            break;
          case 'delete':
            this.caseManagerQualificationService.deleteCaseManagerQualification(caseManagerQualification).subscribe(
              response => {
                // console.log('response', response);
                this.getQualificationListByCaseManagerId(this.caseManager.userId);
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

  // BUTTONS

  public returnToList(): void {
    this.router.navigate(['case-managers/case-manager-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['case-managers/case-manager-detail-edit', this.caseManager.userId]).then();
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
