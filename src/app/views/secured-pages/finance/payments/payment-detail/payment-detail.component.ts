import { Component, HostListener, OnInit } from '@angular/core';
import { Payment } from '../../../../../models/payment.model';
import { Student } from '../../../../../models/people/student.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PaymentService } from '../../../../../services/payment.service';
import { RelationshipService } from '../../../relationships/relationship.service';
import { EventService } from '@tqp/services/event.service';
import { AuthService } from '@tqp/services/auth.service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  public pageSource: string;
  public payment: Payment;
  public genderNames = {'M': 'Male', 'F': 'Female', 'O': 'Other'};
  public paymentLoading: boolean = false;

  // Associated Students List
  public records: Student[] = [];
  public dataSource: Student[] = [];
  public displayedColumns: string[] = [
    'name',
    'relationshipStartDate'
  ];

  constructor(private route: ActivatedRoute,
              private paymentService: PaymentService,
              private relationshipService: RelationshipService,
              private eventService: EventService,
              private router: Router,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const paymentId = params['id'];
        // console.log('paymentId', paymentId);
        this.getPaymentDetail(paymentId);
        // this.getStudentListByPaymentId(paymentId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getPaymentDetail(paymentId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.paymentService.getPaymentDetail(paymentId).subscribe(
      response => {
        this.payment = response;
        console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // private getStudentListByPaymentId(caseManagerId: number): void {
  //   this.relationshipService.getStudentListByPaymentId(caseManagerId).subscribe(
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
    this.router.navigate(['payments/payment-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['payments/payment-detail-edit', this.payment.paymentId]).then();
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
