import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '../../../../../../@tqp/services/event.service';
import { Caregiver } from '../Caregiver';
import { CaregiverService } from '../caregiver.service';
import { Student } from '../../students/Student';
import { AuthService } from '../../../../../../@tqp/services/auth.service';
import { RelationshipService } from '../../../relationships/relationship.service';
import { Loan } from '../../../finance/loans/Loan';
import { LoanService } from '../../../finance/loans/loan.service';

@Component({
  selector: 'app-caregiver-detail',
  templateUrl: './caregiver-detail.component.html',
  styleUrls: ['./caregiver-detail.component.css']
})
export class CaregiverDetailComponent implements OnInit {
  public pageSource: string;
  public caregiver: Caregiver;
  public genderNames = {'M': 'Male', 'F': 'Female', 'O': 'Other'};

  public caregiverLoading: boolean = false;

  // Associated Students List
  public studentsRecords: Student[] = [];
  public studentsDataSource: Student[] = [];
  public studentsDisplayedColumns: string[] = [
    'name',
    'relationshipTierTypeName',
    'relationshipStartDate'
  ];

  // Associated Loans List
  public loansRecords: Student[] = [];
  public loansDataSource: Student[] = [];
  public loansDisplayedColumns: string[] = [
    'loanId',
    'loanAmount',
    'amountPaid',
    'percentPaid'
  ];

  constructor(private route: ActivatedRoute,
              private caregiverService: CaregiverService,
              private relationshipService: RelationshipService,
              private loanService: LoanService,
              private eventService: EventService,
              private router: Router,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const caregiverId = params['id'];
        // console.log('caregiverId', caregiverId);
        this.getCaregiverDetail(caregiverId);
        this.getStudentListByCaregiverId(caregiverId);
        this.getLoanListByCaregiverId(caregiverId);
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
        console.log('response', response);
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
        // console.log('studentList', studentList);
        studentList.forEach(item => {
          this.studentsRecords.push(item);
        });
        this.studentsDataSource = this.studentsRecords;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getLoanListByCaregiverId(caregiverId: number): void {
    this.loanService.getLoanListByCaregiverId(caregiverId).subscribe(
      (loanList: Loan[]) => {
        console.log('loanList', loanList);
        loanList.forEach(item => {
          this.loansRecords.push(item);
        });
        this.loansDataSource = this.loansRecords;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // Buttons

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
