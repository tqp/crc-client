import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Caregiver } from '../Caregiver';
import { CaregiverService } from '../caregiver.service';

@Component({
  selector: 'app-caregiver-detail-edit',
  templateUrl: './caregiver-detail-edit.component.html',
  styleUrls: ['./caregiver-detail-edit.component.css']
})
export class CaregiverDetailEditComponent implements OnInit {
  @ViewChild('caregiverSurnameInputField', {static: false}) caregiverSurnameInputField: ElementRef;
  public pageSource: string;
  public newRecord: boolean;
  public caregiver: Caregiver;
  public caregiverEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  public validationMessages = {
    'caregiverGuid': [
      {type: 'required', message: 'A GUID is required'}
    ],
    'caregiverSurname': [
      {type: 'required', message: 'A Surname is required'}
    ],
    'caregiverGivenName': [
      {type: 'required', message: 'A Given Name is required'}
    ]
  };

  constructor(private route: ActivatedRoute,
              private caregiverService: CaregiverService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const caregiverGuid = params['guid'];
        // console.log('caregiverGuid', caregiverGuid);
        this.getCaregiverDetail(caregiverGuid);
      } else {
        // Create new Person
        this.newRecord = true;
        this.caregiver = new Caregiver();
        this.caregiver.caregiverGuid = null;
        setTimeout(() => {
          this.caregiverSurnameInputField.nativeElement.focus();
        }, 0);
      }
    }).then();
  }

  private initializeForm(): void {
    this.caregiverEditForm = this.formBuilder.group({
      caregiverGuid: new FormControl(''),
      caregiverSurname: new FormControl('', Validators.required),
      caregiverGivenName: new FormControl('', Validators.required)
    });
  }

  private getCaregiverDetail(guid: string): void {
    this.caregiverService.getCaregiverDetail(guid).subscribe(
      response => {
        this.caregiver = response;
        // console.log('response', response);
        this.caregiverEditForm.controls['caregiverGuid'].patchValue(this.caregiver.caregiverGuid);
        this.caregiverEditForm.controls['caregiverSurname'].patchValue(this.caregiver.caregiverSurname);
        this.caregiverEditForm.controls['caregiverGivenName'].patchValue(this.caregiver.caregiverGivenName);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public delete(caregiverGuid: string): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.caregiverService.deleteCaregiver(caregiverGuid).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['caregivers/caregiver-list']).then();
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
    const caregiver = new Caregiver();
    // console.log('crudEditForm', this.caregiverEditForm.value);
    caregiver.caregiverGuid = this.caregiverEditForm.value.caregiverGuid;
    caregiver.caregiverSurname = this.caregiverEditForm.value.caregiverSurname;
    caregiver.caregiverGivenName = this.caregiverEditForm.value.caregiverGivenName;

    if (this.newRecord) {
      this.caregiverService.createCaregiver(caregiver).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['caregivers/caregiver-detail', response.caregiverGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.caregiverService.updateCaregiver(caregiver).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['caregivers/caregiver-detail', response.caregiverGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.caregiver.caregiverGuid) {
      this.router.navigate(['caregivers/caregiver-detail', this.caregiver.caregiverGuid]).then();
    } else {
      this.router.navigate(['caregivers/caregiver-list']).then();
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
      this.delete(this.caregiver.caregiverGuid);
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
