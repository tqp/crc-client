import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Sponsor } from '../../../../../models/people/sponsor.model';
import { SponsorService } from '../../../../../services/people/sponsor.service';

@Component({
  selector: 'app-sponsor-detail-edit',
  templateUrl: './sponsor-detail-edit.component.html',
  styleUrls: ['./sponsor-detail-edit.component.css']
})
export class SponsorDetailEditComponent implements OnInit {
  @ViewChild('sponsorSurnameInputField', {static: false}) sponsorSurnameInputField: ElementRef;
  public pageSource: string;
  public newRecord: boolean;
  public sponsor: Sponsor;
  public sponsorEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  public validationMessages = {
    'sponsorId': [
      {type: 'required', message: 'An ID is required.'}
    ],
    'sponsorSurname': [
      {type: 'required', message: 'A Surname is required.'}
    ],
    'sponsorGivenName': [],
    'sponsorAffiliatedChurch': []
  };

  constructor(private route: ActivatedRoute,
              private sponsorService: SponsorService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const sponsorId = params['id'];
        // console.log('sponsorId', sponsorId);
        this.getSponsorDetail(sponsorId);
      } else {
        // Create new Person
        this.newRecord = true;
        this.sponsor = new Sponsor();
        this.sponsor.sponsorId = null;
        setTimeout(() => {
          this.sponsorSurnameInputField.nativeElement.focus();
        }, 0);
      }
    }).then();
  }

  private initializeForm(): void {
    this.sponsorEditForm = this.formBuilder.group({
      sponsorId: new FormControl(''),
      sponsorSurname: new FormControl('', Validators.required),
      sponsorGivenName: new FormControl('', Validators.required),
      sponsorAffiliatedChurch: new FormControl('')
    });
  }

  private getSponsorDetail(sponsorId: number): void {
    this.sponsorService.getSponsorDetail(sponsorId).subscribe(
      response => {
        this.sponsor = response;
        console.log('response', response);
        this.sponsorEditForm.controls['sponsorId'].patchValue(this.sponsor.sponsorId);
        this.sponsorEditForm.controls['sponsorSurname'].patchValue(this.sponsor.sponsorSurname);
        this.sponsorEditForm.controls['sponsorGivenName'].patchValue(this.sponsor.sponsorGivenName);
        this.sponsorEditForm.controls['sponsorAffiliatedChurch'].patchValue(this.sponsor.sponsorAffiliatedChurch);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public delete(sponsorId: number): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sponsorService.deleteSponsor(sponsorId).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['sponsors/sponsor-list']).then();
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
    const sponsor = new Sponsor();
    // console.log('crudEditForm', this.sponsorEditForm.value);
    sponsor.sponsorId = this.sponsorEditForm.value.sponsorId;
    sponsor.sponsorSurname = this.sponsorEditForm.value.sponsorSurname;
    sponsor.sponsorGivenName = this.sponsorEditForm.value.sponsorGivenName;
    sponsor.sponsorAffiliatedChurch = this.sponsorEditForm.value.sponsorAffiliatedChurch;

    if (this.newRecord) {
      this.sponsorService.createSponsor(sponsor).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['sponsors/sponsor-detail', response.sponsorId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.sponsorService.updateSponsor(sponsor).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['sponsors/sponsor-detail', response.sponsorId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.sponsor.sponsorId) {
      this.router.navigate(['sponsors/sponsor-detail', this.sponsor.sponsorId]).then();
    } else {
      this.router.navigate(['sponsors/sponsor-list']).then();
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
      this.delete(this.sponsor.sponsorId);
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
