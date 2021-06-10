import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormattingService } from '@tqp/services/formatting.service';
import { SponsorLetter } from '../../../../../models/sponsor.letter';
import { Student } from '../../../../../models/people/student.model';
import { Sponsor } from '../../../../../models/people/sponsor.model';
import { SponsorLetterService } from '../../../../../services/events/sponsor-letter.service';
import { StudentService } from '../../../../../services/people/student.service';
import { SponsorService } from '../../../../../services/people/sponsor.service';

@Component({
  selector: 'app-sponsor-letter-detail-edit',
  templateUrl: './sponsor-letter-detail-edit.component.html',
  styleUrls: ['./sponsor-letter-detail-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SponsorLetterDetailEditComponent implements OnInit {
  @ViewChild('sponsorLetterSurnameInputField', {static: false}) sponsorLetterSurnameInputField: ElementRef;
  public pageSource: string;
  public newRecord: boolean;
  public sponsorLetter: SponsorLetter;
  public sponsorLetterEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public studentList: Student[];
  public sponsorList: Sponsor[];

  public validationMessages = {
    'sponsorLetterId': [
      {type: 'required', message: 'An Student SponsorLetter ID is required.'}
    ],
    'studentId': [
      {type: 'required', message: 'A Student is required.'}
    ],
    'sponsorId': [
      {type: 'required', message: 'A Sponsor is required.'}
    ],
    'sponsorLetterDate': [
      {type: 'required', message: 'A SponsorLetter Date is required.'}
    ]
  };

  constructor(private route: ActivatedRoute,
              private sponsorLetterService: SponsorLetterService,
              private formattingService: FormattingService,
              private studentService: StudentService,
              private sponsorService: SponsorService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.initializeForm();
    this.getStudentList();
    this.getSponsorList();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const sponsorLetterId = params['id'];
        this.newRecord = false;
        // console.log('sponsorLetterId', sponsorLetterId);
        this.getSponsorLetterDetail(sponsorLetterId);
      } else {
        // Create new Person
        this.newRecord = true;
        this.sponsorLetter = new SponsorLetter();
        this.sponsorLetter.sponsorLetterId = null;
        setTimeout(() => {
          this.sponsorLetterSurnameInputField.nativeElement.focus();
        }, 0);
      }
    }).then();
  }

  private initializeForm(): void {
    this.sponsorLetterEditForm = this.formBuilder.group({
      sponsorLetterId: new FormControl({value: 0, disabled: true}, Validators.required),
      studentId: new FormControl('', Validators.required),
      sponsorId: new FormControl('', Validators.required),
      sponsorLetterDate: new FormControl('', Validators.required),
    });
  }

  private getSponsorLetterDetail(sponsorLetterId: number): void {
    this.sponsorLetterService.getSponsorLetterDetail(sponsorLetterId).subscribe(
      response => {
        this.sponsorLetter = response;
        // console.log('response', response);
        this.sponsorLetterEditForm.controls['sponsorLetterId'].patchValue(this.sponsorLetter.sponsorLetterId);
        this.sponsorLetterEditForm.controls['studentId'].patchValue(this.sponsorLetter.studentId);
        this.sponsorLetterEditForm.controls['sponsorId'].patchValue(this.sponsorLetter.sponsorId);
        this.sponsorLetterEditForm.controls['sponsorLetterDate'].patchValue(this.formattingService.formatMySqlDateAsStandard(this.sponsorLetter.sponsorLetterDate));
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getStudentList(): void {
    this.studentService.getStudentList().subscribe(
      (response: Student[]) => {
        // console.log('response', response);
        this.studentList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getSponsorList(): void {
    this.sponsorService.getSponsorList().subscribe(
      (response: Sponsor[]) => {
        // console.log('response', response);
        this.sponsorList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public delete(sponsorLetterId: number): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sponsorLetterService.deleteSponsorLetter(sponsorLetterId).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['sponsor-letters/sponsor-letter-list']).then();
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
    const sponsorLetter = new SponsorLetter();
    // console.log('crudEditForm', this.sponsorLetterEditForm.value);
    const formRawValues = this.sponsorLetterEditForm.getRawValue()
    sponsorLetter.sponsorLetterId = formRawValues.sponsorLetterId;
    sponsorLetter.studentId = formRawValues.studentId;
    sponsorLetter.sponsorId = formRawValues.sponsorId;
    sponsorLetter.sponsorLetterDate = this.formattingService.formatStandardDateAsMySql(formRawValues.sponsorLetterDate);

    if (this.newRecord) {
      this.sponsorLetterService.createSponsorLetter(sponsorLetter).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['sponsor-letters/sponsor-letter-detail', response.sponsorLetterId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.sponsorLetterService.updateSponsorLetter(sponsorLetter).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['sponsor-letters/sponsor-letter-detail', response.sponsorLetterId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.sponsorLetter.sponsorLetterId) {
      this.router.navigate(['sponsor-letters/sponsor-letter-detail', this.sponsorLetter.sponsorLetterId]).then();
    } else {
      this.router.navigate(['sponsor-letters/sponsor-letter-list']).then();
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
    if (event.ctrlKey && event.key === 'd') {
      event.preventDefault();
      this.delete(this.sponsorLetter.sponsorLetterId);
    }
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      this.save();
    }
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault();
      this.cancel();
    }
  }

}
