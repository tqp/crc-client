import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '@tqp/services/event.service';
import { Caregiver } from '../Caregiver';
import { CaregiverService } from '../caregiver.service';
import { Student } from '../../students/Student';
import { AuthService } from '@tqp/services/auth.service';
import { RelationshipService } from '../../../relationships/relationship.service';
import { Loan } from '../../../finance/loans/Loan';
import { LoanService } from '../../../finance/loans/loan.service';
import { WorkshopService } from '../../../events/workshop/workshop.service';
import { Workshop } from '../../../events/workshop/Workshop';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CaregiverWorkshopEditDialogComponent } from '../../../events/workshop/caregiver-workshop-edit-dialog/caregiver-workshop-edit-dialog.component';
import { FormattingService } from '../../../../../../@tqp/services/formatting.service';

@Component({
  selector: 'app-caregiver-detail',
  templateUrl: './caregiver-detail.component.html',
  styleUrls: ['./caregiver-detail.component.css'],
})
export class CaregiverDetailComponent implements OnInit {
  public pageSource: string;
  public caregiver: Caregiver;
  public genderNames = {'M': 'Male', 'F': 'Female', 'O': 'Other'};

  public caregiverLoading: boolean = false;

  // Associated Students List
  public studentListRecords: Student[] = [];
  public studentListDataSource: Student[] = [];
  public studentListDisplayedColumns: string[] = [
    'name',
    'relationshipTierTypeName',
    'relationshipStartDate'
  ];

  // Associated Loans List
  public loanListRecords: Student[] = [];
  public loanListDataSource: Student[] = [];
  public loanListDisplayedColumns: string[] = [
    'loanId',
    'loanAmount',
    'amountPaid',
    'percentPaid'
  ];

  // Workshops Attended List
  public workshopListRecords: Workshop[] = [];
  public workshopListDataSource: Workshop[] = [];
  public workshopListDisplayedColumns: string[] = [
    'workshopName',
    'workshopDate'
  ];

  constructor(private route: ActivatedRoute,
              private caregiverService: CaregiverService,
              private relationshipService: RelationshipService,
              private loanService: LoanService,
              private eventService: EventService,
              private workshopService: WorkshopService,
              private formattingService: FormattingService,
              private router: Router,
              public authService: AuthService,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const caregiverId = params['id'];
        // console.log('caregiverId', caregiverId);
        this.getCaregiverDetail(caregiverId);
        this.getStudentListByCaregiverId(caregiverId);
        this.getLoanListByCaregiverId(caregiverId);
        this.getWorkshopListByCaregiverId(caregiverId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getCaregiverDetail(caregiverId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.caregiverLoading = true;
    this.caregiverService.getCaregiverDetail(caregiverId).subscribe(
      response => {
        this.caregiver = response;
        // console.log('response', response);
        this.eventService.loadingEvent.emit(false);
        this.caregiverLoading = false;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getStudentListByCaregiverId(caregiverId: number): void {
    this.relationshipService.getStudentListByCaregiverId(caregiverId).subscribe(
      (studentList: Student[]) => {
        this.studentListRecords = [];
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

  private getLoanListByCaregiverId(caregiverId: number): void {
    this.loanService.getLoanListByCaregiverId(caregiverId).subscribe(
      (loanList: Loan[]) => {
        this.loanListRecords = [];
        loanList.forEach(item => {
          this.loanListRecords.push(item);
        });
        this.loanListDataSource = this.loanListRecords;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getWorkshopListByCaregiverId(caregiverId: number): void {
    this.workshopService.getWorkshopListByCaregiverId(caregiverId).subscribe(
      (workshopList: Workshop[]) => {
        this.workshopListRecords = [];
        workshopList.forEach(item => {
          this.workshopListRecords.push(item);
        });
        this.workshopListDataSource = this.workshopListRecords;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // DIALOGS

  public openCaregiverWorkshopCreateDialog(caregiverId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'create',
      caregiverId: caregiverId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(CaregiverWorkshopEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      if (dialogData) {
        const workshop: Workshop = dialogData[1];
        workshop.workshopDate = this.formattingService.formatStandardDateAsMySql(dialogData[1].workshopDate);
        this.workshopService.createCaregiverWorkshopEvent(workshop).subscribe(
          response => {
            console.log('response', response);
            console.log('caregiverId', caregiverId);
            this.getWorkshopListByCaregiverId(caregiverId);
          },
          error => {
            console.error('Error: ', error);
          }
        );
      }
    });
  }

  // BUTTONS

  public returnToList(): void {
    this.router.navigate(['caregivers/caregiver-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['caregivers/caregiver-detail-edit', this.caregiver.caregiverId]).then();
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
