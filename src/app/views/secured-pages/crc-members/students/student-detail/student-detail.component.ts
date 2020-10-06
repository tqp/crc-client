import { Component, HostListener, OnInit } from '@angular/core';
import { Student } from '../Student';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '@tqp/services/event.service';
import { StudentService } from '../student.service';
import { RelationshipService } from '../../relations/relationship.service';
import { Relationship } from '../Relationship';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentCaregiverEditDialogComponent } from '../student-caregiver-edit-dialog/student-caregiver-edit-dialog.component';
import { AuthService } from '../../../../../../@tqp/services/auth.service';
import { CaregiverService } from '../../caregivers/caregiver.service';
import { Caregiver } from '../../caregivers/Caregiver';
import { StudentCaseManagerEditDialogComponent } from '../student-case-manager-edit-dialog/student-case-manager-edit-dialog.component';
import { FormattingService } from '../../../../../../@tqp/services/formatting.service';
import { CaseManager } from '../../case-managers/CaseManager';
import { CaseManagerService } from '../../case-managers/case-manager.service';
import { Sponsor } from '../../sponsors/Sponsor';
import { StudentSponsorEditDialogComponent } from '../student-sponsor-edit-dialog/student-sponsor-edit-dialog.component';
import { SponsorService } from '../../sponsors/sponsor.service';

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
              private relationshipService: RelationshipService,
              private caregiverService: CaregiverService,
              private caseManagerService: CaseManagerService,
              private sponsorService: SponsorService,
              private eventService: EventService,
              public authService: AuthService,
              private formattingService: FormattingService,
              private router: Router,
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
        // this.getRelationshipListByStudentId(studentId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getStudentDetail(id: number): void {
    this.eventService.loadingEvent.emit(true);
    this.studentService.getStudentDetail(id).subscribe(
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

  private getCaregiverDetailByStudentId(id: number): void {
    this.eventService.loadingEvent.emit(true);
    this.caregiverLoading = true;
    this.caregiverService.getCaregiverDetailByStudentId(id).subscribe(
      response => {
        // console.log('response', response);
        this.caregiver = response;
        this.eventService.loadingEvent.emit(false);
        this.caregiverLoading = false;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getCaseManagerDetailByStudentId(id: number): void {
    this.eventService.loadingEvent.emit(true);
    this.caseManagerLoading = true;
    this.caseManagerService.getCaseManagerDetailByStudentId(id).subscribe(
      response => {
        // console.log('response', response);
        this.caseManager = response;
        this.eventService.loadingEvent.emit(false);
        this.caseManagerLoading = false;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getSponsorDetailByStudentId(id: number): void {
    this.eventService.loadingEvent.emit(true);
    this.sponsorLoading = true;
    this.sponsorService.getSponsorDetailByStudentId(id).subscribe(
      response => {
        console.log('response', response);
        this.sponsor = response;
        this.eventService.loadingEvent.emit(false);
        this.sponsorLoading = false;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // private getRelationshipListByStudentId(studentId: number): void {
  //   this.relationshipService.getRelationshipListByStudentId(studentId).subscribe(
  //     (relationshipList: Relationship[]) => {
  //       console.log('relationshipList', relationshipList);
  //       relationshipList.forEach(item => {
  //         this.records.push(item);
  //       });
  //       this.dataSource = this.records;
  //     },
  //     error => {
  //       console.error('Error: ', error);
  //     }
  //   );
  // }

  // Dialogs

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
      // console.log('dialogData', dialogData);
      const relationship: Relationship = {};
      relationship.studentId = this.student.studentId;
      relationship.personId = dialogData.caregiverId;
      relationship.relationshipTypeId = 13; // Caregiver
      relationship.relationshipComments = 'Meow';
      relationship.relationshipBloodRelative = 0;
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
      const relationship: Relationship = {};
      relationship.studentId = this.student.studentId;
      relationship.personId = dialogData.caseManagerId;
      relationship.relationshipTypeId = 15; // Case Manager
      relationship.relationshipEffectiveDate = this.formattingService.formatStandardDateAsMySql(dialogData.effectiveDate);

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
      // console.log('dialogData', dialogData);
      const relationship: Relationship = {};
      relationship.studentId = this.student.studentId;
      relationship.personId = dialogData.sponsorId;
      relationship.relationshipTypeId = 14; // Sponsor
      relationship.relationshipEffectiveDate = this.formattingService.formatStandardDateAsMySql(dialogData.effectiveDate);
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
