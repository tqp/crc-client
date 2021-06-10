import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Loan } from '../../../../../models/loan.model';
import { LoanService } from '../../../../../services/finance/loan.service';

@Component({
  selector: 'app-loan-detail-edit',
  templateUrl: './loan-detail-edit.component.html',
  styleUrls: ['./loan-detail-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoanDetailEditComponent implements OnInit {
  @ViewChild('defaultInputField', {static: false}) defaultInputField: ElementRef;
  public pageSource: string;
  public newRecord: boolean;
  public loan: Loan;
  public loanEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  public validationMessages = {
    'loanId': [
      {type: 'required', message: 'An ID is required.'}
    ],
    'loanAmount': [
      {type: 'required', message: 'An Amount is required.'}
    ],
    'loanDescription': []
  };

  constructor(private route: ActivatedRoute,
              private loanService: LoanService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const loanId = params['id'];
        // console.log('loanId', loanId);
        this.getLoanDetail(loanId);
      } else {
        // Create new Person
        this.newRecord = true;
        this.loan = new Loan();
        this.loan.loanId = null;
        setTimeout(() => {
          this.defaultInputField.nativeElement.focus();
        }, 0);
      }
    }).then();
  }

  private initializeForm(): void {
    this.loanEditForm = this.formBuilder.group({
      loanId: new FormControl(''),
      loanAmount: new FormControl(''),
      loanDescription: new FormControl('')
    });
  }

  private getLoanDetail(loanId: number): void {
    this.loanService.getLoanDetail(loanId).subscribe(
      response => {
        this.loan = response;
        console.log('response', response);
        this.loanEditForm.controls['loanId'].patchValue(this.loan.loanId);
        this.loanEditForm.controls['loanAmount'].patchValue(this.loan.loanAmount);
        this.loanEditForm.controls['loanDescription'].patchValue(this.loan.loanDescription);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public delete(loanId: number): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loanService.deleteLoan(loanId).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['loans/loan-list']).then();
          },
          error => {
            console.error('Error: ' + error.message);
          }
        );
      }
      this.confirmDialogRef = null;
    });
  }

  public save(): void {
    const loan = new Loan();
    // console.log('crudEditForm', this.loanEditForm.value);
    loan.loanId = this.loanEditForm.value.loanId;
    loan.loanAmount = this.loanEditForm.value.loanAmount;
    loan.loanDescription = this.loanEditForm.value.loanDescription;

    if (this.newRecord) {
      this.loanService.createLoan(loan).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['loans/loan-detail', response.loanId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.loanService.updateLoan(loan).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['loans/loan-detail', response.loanId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.loan.loanId) {
      this.router.navigate(['loans/loan-detail', this.loan.loanId]).then();
    } else {
      this.router.navigate(['loans/loan-list']).then();
    }
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.save();
    }
    if (event.key === 'Escape') {
      this.cancel();
    }
  }

}
