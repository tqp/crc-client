import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CaseManagerService } from '../case-manager.service';
import { CaseManager } from '../CaseManager';

@Component({
  selector: 'app-case-manager-detail-edit',
  templateUrl: './case-manager-detail-edit.component.html',
  styleUrls: ['./case-manager-detail-edit.component.css']
})
export class CaseManagerDetailEditComponent implements OnInit {
  @ViewChild('caseManagerSurnameInputField', {static: false}) caseManagerSurnameInputField: ElementRef;
  public pageSource: string;
  public newRecord: boolean;
  public caseManager: CaseManager;
  public caseManagerEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  public validationMessages = {
    'caseManagerId': [
      {type: 'required', message: 'An ID is required'}
    ],
    'caseManagerSurname': [
      {type: 'required', message: 'A Surname is required'}
    ],
    'caseManagerGivenName': [
      {type: 'required', message: 'A Given Name is required'}
    ],
    'caseManagerPhone': [],
    'caseManagerEmail': []
  };

  constructor(private route: ActivatedRoute,
              private caseManagerService: CaseManagerService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const caseManagerId = params['id'];
        // console.log('caseManagerId', caseManagerId);
        this.getCaseManagerDetail(caseManagerId);
      } else {
        // Create new Person
        this.newRecord = true;
        this.caseManager = new CaseManager();
        this.caseManager.caseManagerId = null;
        setTimeout(() => {
          this.caseManagerSurnameInputField.nativeElement.focus();
        }, 0);
      }
    }).then();
  }

  private initializeForm(): void {
    this.caseManagerEditForm = this.formBuilder.group({
      caseManagerId: new FormControl(''),
      caseManagerSurname: new FormControl('', Validators.required),
      caseManagerGivenName: new FormControl('', Validators.required),
      caseManagerPhone: new FormControl(''),
      caseManagerEmail: new FormControl('')
    });
  }

  private getCaseManagerDetail(caseManagerId: number): void {
    this.caseManagerService.getCaseManagerDetail(caseManagerId).subscribe(
      response => {
        this.caseManager = response;
        // console.log('response', response);
        this.caseManagerEditForm.controls['caseManagerId'].patchValue(this.caseManager.caseManagerId);
        this.caseManagerEditForm.controls['caseManagerSurname'].patchValue(this.caseManager.caseManagerSurname);
        this.caseManagerEditForm.controls['caseManagerGivenName'].patchValue(this.caseManager.caseManagerGivenName);
        this.caseManagerEditForm.controls['caseManagerPhone'].patchValue(this.caseManager.caseManagerPhone);
        this.caseManagerEditForm.controls['caseManagerEmail'].patchValue(this.caseManager.caseManagerEmail);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public delete(caseManagerId: number): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.caseManagerService.deleteCaseManager(caseManagerId).subscribe(
          response => {
            console.log('response: ', response);
            this.router.navigate(['case-managers/case-manager-list']).then();
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
    const caseManager = new CaseManager();
    // console.log('crudEditForm', this.caseManagerEditForm.value);
    caseManager.caseManagerId = this.caseManagerEditForm.value.caseManagerId;
    caseManager.caseManagerSurname = this.caseManagerEditForm.value.caseManagerSurname;
    caseManager.caseManagerGivenName = this.caseManagerEditForm.value.caseManagerGivenName;
    caseManager.caseManagerPhone = this.caseManagerEditForm.value.caseManagerPhone;
    caseManager.caseManagerEmail = this.caseManagerEditForm.value.caseManagerEmail;

    if (this.newRecord) {
      this.caseManagerService.createCaseManager(caseManager).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['case-managers/case-manager-detail', response.caseManagerId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.caseManagerService.updateCaseManager(caseManager).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['case-managers/case-manager-detail', response.caseManagerId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.caseManager.caseManagerId) {
      this.router.navigate(['case-managers/case-manager-detail', this.caseManager.caseManagerId]).then();
    } else {
      this.router.navigate(['case-managers/case-manager-list']).then();
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
      this.delete(this.caseManager.caseManagerId);
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
