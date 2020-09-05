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
    'caseManagerGuid': [
      {type: 'required', message: 'A GUID is required'}
    ],
    'caseManagerSurname': [
      {type: 'required', message: 'A Surname is required'}
    ],
    'caseManagerGivenName': [
      {type: 'required', message: 'A Given Name is required'}
    ]
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
      if (params['guid'] !== undefined) {
        const caseManagerGuid = params['guid'];
        // console.log('caseManagerGuid', caseManagerGuid);
        this.getCaseManagerDetail(caseManagerGuid);
      } else {
        // Create new Person
        this.newRecord = true;
        this.caseManager = new CaseManager();
        this.caseManager.caseManagerGuid = null;
        setTimeout(() => {
          this.caseManagerSurnameInputField.nativeElement.focus();
        }, 0);
      }
    }).then();
  }

  private initializeForm(): void {
    this.caseManagerEditForm = this.formBuilder.group({
      caseManagerGuid: new FormControl(''),
      caseManagerSurname: new FormControl('', Validators.required),
      caseManagerGivenName: new FormControl('', Validators.required)
    });
  }

  private getCaseManagerDetail(guid: string): void {
    this.caseManagerService.getCaseManagerDetail(guid).subscribe(
      response => {
        this.caseManager = response;
        // console.log('response', response);
        this.caseManagerEditForm.controls['caseManagerGuid'].patchValue(this.caseManager.caseManagerGuid);
        this.caseManagerEditForm.controls['caseManagerSurname'].patchValue(this.caseManager.caseManagerSurname);
        this.caseManagerEditForm.controls['caseManagerGivenName'].patchValue(this.caseManager.caseManagerGivenName);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public delete(caseManagerGuid: string): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.caseManagerService.deleteCaseManager(caseManagerGuid).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['caseManager-list']).then();
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
    caseManager.caseManagerGuid = this.caseManagerEditForm.value.caseManagerGuid;
    caseManager.caseManagerSurname = this.caseManagerEditForm.value.caseManagerSurname;
    caseManager.caseManagerGivenName = this.caseManagerEditForm.value.caseManagerGivenName;

    if (this.newRecord) {
      this.caseManagerService.createCaseManager(caseManager).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['case-managers/case-manager-detail', response.caseManagerGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.caseManagerService.updateCaseManager(caseManager).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['case-managers/case-manager-detail', response.caseManagerGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.caseManager.caseManagerGuid) {
      this.router.navigate(['case-managers/case-manager-detail', this.caseManager.caseManagerGuid]).then();
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
      this.delete(this.caseManager.caseManagerGuid);
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
