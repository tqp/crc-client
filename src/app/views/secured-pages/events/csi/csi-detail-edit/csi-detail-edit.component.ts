import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CsiRecord } from '../CsiRecord';
import { CsiRecordService } from '../csi-record.service';
import * as moment from 'moment';

@Component({
  selector: 'app-csi-detail-edit',
  templateUrl: './csi-detail-edit.component.html',
  styleUrls: ['./csi-detail-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CsiDetailEditComponent implements OnInit {
  @ViewChild('caregiverSurnameInputField', {static: false}) caregiverSurnameInputField: ElementRef;
  public pageSource: string;
  public newRecord: boolean;
  public csiRecord: CsiRecord;
  public csiRecordEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  public validationMessages = {
    'csiId': [
      {type: 'required', message: 'An ID is required'}
    ],
    'csiDate': [
      {type: 'required', message: 'A date is required'}
    ],
    'csiFoodSecurity': [
      {type: 'required', message: 'A response is required'}
    ]
  };

  constructor(private route: ActivatedRoute,
              private csiRecordService: CsiRecordService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const csiId = params['id'];
        // console.log('csiId', csiId);
        this.getCsiRecordDetail(csiId);
      } else {
        // Create new Person
        this.newRecord = true;
        this.csiRecord = new CsiRecord();
        this.csiRecord.csiId = null;
        // setTimeout(() => {
        //   this.csiRecordDateInputField.nativeElement.focus();
        // }, 0);
      }
    }).then();
  }

  private initializeForm(): void {
    this.csiRecordEditForm = this.formBuilder.group({
      csiId: new FormControl('', Validators.required),
      csiDate: new FormControl(moment().format('MM/DD/YYYY'), Validators.required),
      csiFoodSecurity: new FormControl('', Validators.required),
    });
  }

  private getCsiRecordDetail(csiId: number): void {
    this.csiRecordService.getCsiRecordDetail(csiId).subscribe(
      response => {
        this.csiRecord = response;
        // console.log('response', response);
        this.csiRecordEditForm.controls['csiId'].patchValue(this.csiRecord.csiId);
        this.csiRecordEditForm.controls['csiDate'].patchValue(this.csiRecord.csiDate);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public delete(csiId: number): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.csiRecordService.deleteCsiRecord(csiId).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['csi-record/csi-record-list']).then();
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
    const csiRecord = new CsiRecord();
    // console.log('crudEditForm', this.caregiverEditForm.value);
    csiRecord.csiId = this.csiRecordEditForm.value.csiId;
    csiRecord.csiDate = this.csiRecordEditForm.value.csiDate;
    csiRecord.csiFoodSecurity = this.csiRecordEditForm.value.csiFoodSecurity;


    if (this.newRecord) {
      this.csiRecordService.createCsiRecord(csiRecord).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['csi-record/csi-record-detail', response.csiId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.csiRecordService.updateCsiRecord(csiRecord).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['csi-record/csi-record-detail', response.csiId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.csiRecord.csiId) {
      this.router.navigate(['csi-record/csi-record-detail', this.csiRecord.csiId]).then();
    } else {
      this.router.navigate(['csi-record/csi-record-list']).then();
    }
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.save();
    }
    // if (event.key === 'Escape') {
    //   this.cancel();
    // }
  }

}
