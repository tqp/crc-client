import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '@tqp/services/event.service';
import { Sponsor } from '../../../../../models/people/sponsor.model';
import { SponsorService } from '../../../../../services/people/sponsor.service';
import { AuthService } from '@tqp/services/auth.service';
import { RelationshipService } from '../../../../../services/relationships/relationship.service';
import { Student } from '../../../../../models/people/student.model';
import { Visit } from '../../../../../models/visit.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentSponsorLetterService } from '../../../../../services/events/student-sponsor-letter.service';
import { StudentSponsorLetterModel } from '../../../../../models/student-sponsor-letter.model';
import { StudentSponsorLetterDetailEditDialogComponent } from '../../../events/student-sponsor-letter/student-sponsor-letter-detail-edit-dialog/student-sponsor-letter-detail-edit-dialog.component';
import { StudentService } from '../../../../../services/people/student.service';

@Component({
  selector: 'app-sponsor-detail',
  templateUrl: './sponsor-detail.component.html',
  styleUrls: ['./sponsor-detail.component.css']
})
export class SponsorDetailComponent implements OnInit {
  public pageSource: string;
  public sponsor: Sponsor;
  public genderNames = {'M': 'Male', 'F': 'Female', 'O': 'Other'};
  public sponsorLoading: boolean = false;

  // Associated Students List
  public studentListRecords: Student[] = [];
  public studentListDataSource: Student[] = [];
  public studentListDisplayedColumns: string[] = [
    'name',
    'relationshipStartDate'
  ];

  // Student-Sponsor Letters
  public sponsorLetterListLoading: boolean = false;
  public sponsorLetterListRecords: Visit[] = [];
  public sponsorLetterListDataSource: Visit[] = [];
  public sponsorLetterListDisplayedColumns: string[] = [
    // 'studentSponsorLetterId',
    'studentSponsorLetterDate',
    'sponsorName'
  ];

  constructor(private route: ActivatedRoute,
              private sponsorService: SponsorService,
              private relationshipService: RelationshipService,
              private studentService: StudentService,
              private sponsorLetterService: StudentSponsorLetterService,
              private eventService: EventService,
              private router: Router,
              public authService: AuthService,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const sponsorId = params['id'];
        // console.log('sponsorId', sponsorId);
        this.getSponsorDetail(sponsorId);
        this.getStudentListBySponsorId(sponsorId);
        this.getSponsorLetterListBySponsorId(sponsorId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getSponsorDetail(sponsorId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.sponsorService.getSponsorDetail(sponsorId).subscribe(
      response => {
        this.sponsor = response;
        // console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getStudentListBySponsorId(sponsorId: number): void {
    this.studentService.getStudentListBySponsorId(sponsorId).subscribe(
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

  private getSponsorLetterListBySponsorId(sponsorId: number): void {
    this.sponsorLetterService.getStudentSponsorLetterListBySponsorId(sponsorId).subscribe(
      (sponsorLetterList: StudentSponsorLetterModel[]) => {
        // console.log('sponsorLetterList', sponsorLetterList);
        this.sponsorLetterListRecords = [];
        sponsorLetterList.forEach(item => {
          this.sponsorLetterListRecords.push(item);
        });
        this.sponsorLetterListDataSource = this.sponsorLetterListRecords;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public openStudentSponsorLetterEditDialog(studentSponsorLetterId, sponsorId, studentId): void {
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
        // const relationship: Relationship = {};
        // const formData = dialogData[1];
        // relationship.studentId = this.student.studentId;
        // relationship.relationshipType = 'Student-Sponsor';
        // relationship.relationshipId = formData.relationshipId;
        // relationship.relationshipEntityId = formData.sponsorId;
        // relationship.relationshipStartDate = this.formattingService.formatStandardDateAsMySql(formData.relationshipStartDate);
        // console.log('relationship', relationship);

        // switch (dialogData[0]) {
        //   case 'create':
        //     this.relationshipService.createSponsorRelationship(relationship).subscribe(
        //       () => {
        //         // console.log('response', response);
        //         this.getSponsorDetailByStudentId(this.student.studentId);
        //         this.getHistoryListByStudentId(this.student.studentId);
        //       },
        //       error => {
        //         console.error('Error: ', error);
        //       }
        //     );
        //     break;
        //   case 'update':
        //     this.relationshipService.updateSponsorRelationship(relationship).subscribe(
        //       response => {
        //         console.log('response', response);
        //         this.getSponsorDetailByStudentId(this.student.studentId);
        //         this.getHistoryListByStudentId(this.student.studentId);
        //       },
        //       error => {
        //         console.error('Error: ', error);
        //       }
        //     );
        //     break;
        //   case 'delete':
        //     console.log('relationship', relationship);
        //     this.relationshipService.deleteSponsorRelationship(relationship).subscribe(
        //       response => {
        //         console.log('response', response);
        //         this.getSponsorDetailByStudentId(this.student.studentId);
        //         this.getHistoryListByStudentId(this.student.studentId);
        //       },
        //       error => {
        //         console.error('Error: ', error);
        //       }
        //     );
        //     break;
        //   default:
        //     console.error('Unknown Action Type', dialogData[0]);
        // }
      }
    });
  }

  // BUTTONS

  public returnToList(): void {
    this.router.navigate(['sponsors/sponsor-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['sponsors/sponsor-detail-edit', this.sponsor.sponsorId]).then();
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
