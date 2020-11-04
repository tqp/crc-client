import { Component, HostListener, OnInit } from '@angular/core';
import { Student } from '../../../people/students/Student';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RelationshipService } from '../../../relationships/relationship.service';
import { EventService } from '../../../../../../@tqp/services/event.service';
import { AuthService } from '../../../../../../@tqp/services/auth.service';
import { Loan } from '../Loan';
import { LoanService } from '../loan.service';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {
  public pageSource: string;
  public loan: Loan;
  public genderNames = {'M': 'Male', 'F': 'Female', 'O': 'Other'};
  public loanLoading: boolean = false;

  // Associated Students List
  public records: Student[] = [];
  public dataSource: Student[] = [];
  public displayedColumns: string[] = [
    'name',
    'relationshipStartDate'
  ];

  constructor(private route: ActivatedRoute,
              private loanService: LoanService,
              private relationshipService: RelationshipService,
              private eventService: EventService,
              private router: Router,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const loanId = params['id'];
        // console.log('loanId', loanId);
        this.getLoanDetail(loanId);
        // this.getStudentListByLoanId(loanId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getLoanDetail(loanId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.loanService.getLoanDetail(loanId).subscribe(
      response => {
        this.loan = response;
        console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // private getStudentListByLoanId(caseManagerId: number): void {
  //   this.relationshipService.getStudentListByLoanId(caseManagerId).subscribe(
  //     (studentList: Student[]) => {
  //       console.log('studentList', studentList);
  //       studentList.forEach(item => {
  //         this.records.push(item);
  //       });
  //       this.dataSource = this.records;
  //     },
  //     error => {
  //       console.error('Error: ', error);
  //     }
  //   );
  // }

  // Buttons

  public returnToList(): void {
    this.router.navigate(['loans/loan-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['loans/loan-detail-edit', this.loan.loanId]).then();
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
