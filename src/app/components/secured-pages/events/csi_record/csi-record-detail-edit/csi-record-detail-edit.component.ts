import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CsiRecord } from '../../../../../models/csi-record.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../../../../models/people/student.model';
import { CaseManager } from '../../../../../models/people/case-manager.model';
import { ServicesProvidedType } from '../../../../../models/types/type-services-provided.model';
import { ConfirmDialogComponent } from '../../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CsiRecordService } from '../../../../../services/events/csi-record.service';
import { StudentService } from '../../../../../services/people/student.service';
import { CaseManagerService } from '../../../../../services/people/case-manager.service';
import { FormattingService } from '../../../../../../@tqp/services/formatting.service';
import { ServicesProvidedTypeService } from '../../../../../services/reference-tables/services-provided-type.service';
import { validateNonZeroValue } from '../../../../../../@tqp/validators/custom.validators';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-csi-record-detail-edit',
  templateUrl: './csi-record-detail-edit.component.html',
  styleUrls: ['./csi-record-detail-edit.component.scss']
})
export class CsiRecordDetailEditComponent implements OnInit, OnDestroy {
  @ViewChild('caregiverSurnameInputField', {static: false}) caregiverSurnameInputField: ElementRef;
  public studentId;
  public pageSource: string;
  public newRecord: boolean;
  public csi: CsiRecord;
  public csiEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public studentList: Student[];
  public caseManagerList: CaseManager[];
  public servicesProvidedTypeList: ServicesProvidedType[];

  public dark = 'badge-dark';
  public light = 'badge-light';

  get csiServicesProvidedCheckboxFormArray() {
    return this.csiEditForm.controls.csiServicesProvidedCheckboxes as FormArray;
  }

  public validationMessages = {
    'studentCsiId': [
      {type: 'required', message: 'An ID is required.'}
    ],
    'studentId': [
      {type: 'required', message: 'An Student is required.'},
      {type: 'validateNonZeroValue', message: 'You must select a Student.'}
    ],
    'caseManagerUserId': [
      {type: 'required', message: 'A Case Manager is required.'},
      {type: 'validateNonZeroValue', message: 'You must select a Case Manager.'}
    ],
    'csiDate': [
      {type: 'required', message: 'A date is required.'}
    ],
    'csiServicesProvided': [
      {type: 'required', message: 'Please check the services provided.'}
    ],
    'csiServicesProvidedArray': [
      {type: 'required', message: 'Please check the services provided.'}
    ],
    'csiComments': [
      {type: 'required', message: 'A response is required.'}
    ],

    'csiScoreFoodSecurity': [
      {type: 'required', message: 'A response is required.'}
    ],
    'csiScoreNutritionAndGrowth': [
      {type: 'required', message: 'A response is required.'}
    ],
    'csiScoreShelter': [
      {type: 'required', message: 'A response is required.'}
    ],
    'csiScoreCare': [
      {type: 'required', message: 'A response is required.'}
    ],
    'csiScoreAbuseAndExploitation': [
      {type: 'required', message: 'A response is required.'}
    ],
    'csiScoreLegalProtection': [
      {type: 'required', message: 'A response is required.'}
    ],
    'csiScoreWellness': [
      {type: 'required', message: 'A response is required.'}
    ],
    'csiScoreHealthCareServices': [
      {type: 'required', message: 'A response is required.'}
    ],
    'csiScoreEmotionalHealth': [
      {type: 'required', message: 'A response is required.'}
    ],
    'csiScoreSocialBehavior': [
      {type: 'required', message: 'A response is required.'}
    ],
    'csiScorePerformance': [
      {type: 'required', message: 'A response is required.'}
    ],
    'csiScoreEducationAndWork': [
      {type: 'required', message: 'A response is required.'}
    ]
  };

  constructor(private route: ActivatedRoute,
              private csiService: CsiRecordService,
              private studentService: StudentService,
              private caseManagerService: CaseManagerService,
              private formattingService: FormattingService,
              private servicesProvidedTypeService: ServicesProvidedTypeService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {

    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const studentCsiId = params['id'];
        this.newRecord = false;
        this.getCsiDetail(studentCsiId);
      } else {
        this.newRecord = true;
        this.csi = new CsiRecord();
        this.csi.csiRecordId = null;
        this.prepareCreatePage();
      }
    }).then();

    this.getStudentList();
    this.getCaseManagerList();
    this.getServicesProvidedTypeList();

    if (!this.newRecord) {
      // console.log('studentId from Params', this.newRecord);
    } else if (this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.studentId) {
      this.studentId = this.router.getCurrentNavigation().extras.state.studentId;
      localStorage.setItem('studentId', this.studentId);
    } else {
      // console.error('Screen Refresh Detected');
      this.studentId = localStorage.getItem('studentId');
      if (this.studentId) {
        // console.log('Retrieved studentId from local storage.', this.studentId);
      } else {
        this.displayRefreshErrorDialog();
      }
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy() {
    localStorage.clear();
  }

  private initializeForm(): void {
    // console.log('this.studentId', this.studentId);
    this.csiEditForm = this.formBuilder.group({
      studentCsiId: new FormControl({value: 0, disabled: true}),
      studentId: new FormControl({value: this.studentId, disabled: true}, [validateNonZeroValue]),
      caseManagerUserId: new FormControl({value: 0, disabled: false}, [validateNonZeroValue]),
      csiDate: new FormControl(moment().format('DD-MMM-yyyy'), Validators.required),
      csiComments: new FormControl('', Validators.required),
      csiServicesProvided: new FormControl(''),
      csiServicesProvidedCheckboxes: new FormArray([], minSelectedCheckboxes(1)),
      // Scores
      csiScoreFoodSecurity: new FormControl('', Validators.required),
      csiScoreNutritionAndGrowth: new FormControl('', Validators.required),
      csiScoreShelter: new FormControl('', Validators.required),
      csiScoreCare: new FormControl('', Validators.required),
      csiScoreAbuseAndExploitation: new FormControl('', Validators.required),
      csiScoreLegalProtection: new FormControl('', Validators.required),
      csiScoreWellness: new FormControl('', Validators.required),
      csiScoreHealthCareServices: new FormControl('', Validators.required),
      csiScoreEmotionalHealth: new FormControl('', Validators.required),
      csiScoreSocialBehavior: new FormControl('', Validators.required),
      csiScorePerformance: new FormControl('', Validators.required),
      csiScoreEducationAndWork: new FormControl('', Validators.required),
    });
  }

  private getCsiDetail(studentCsiId: number): void {
    const servicesProvided = this.servicesProvidedTypeService.getServicesProvidedTypeList();
    const csiDetail = this.csiService.getCsiRecordDetail(studentCsiId);

    // We need to ensure that both the servicedProvided list and the csiDetail come back before
    // trying to populate the checkboxes... so, we use forkJoin.
    forkJoin([servicesProvided, csiDetail]).subscribe(response => {
        // console.log('response', response);

        // Use the servicesProvidedTypeList response
        this.servicesProvidedTypeList = response[0];
        this.addCheckboxes();

        // UserModel the csiDetail response
        this.csi = response[1];
        // console.log('this.csi', this.csi);
        this.csiEditForm.controls['studentCsiId'].patchValue(this.csi.csiRecordId);
        this.csiEditForm.controls['studentId'].patchValue(this.csi.studentId);
        this.csiEditForm.controls['caseManagerUserId'].patchValue(this.csi.caseManagerUserId);
        this.csiEditForm.controls['csiDate'].patchValue(this.formattingService.formatMySqlDateAsStandard(this.csi.csiRecordDate));
        this.csiEditForm.controls['csiComments'].patchValue(this.csi.csiRecordComments);
        this.csiEditForm.controls['csiServicesProvided'].patchValue(this.csi.csiRecordServicesProvided);

        this.csiEditForm.controls['csiScoreFoodSecurity'].patchValue(this.csi.csiRecordScoreFoodSecurity);
        this.csiEditForm.controls['csiScoreNutritionAndGrowth'].patchValue(this.csi.csiRecordScoreNutritionAndGrowth);
        this.csiEditForm.controls['csiScoreShelter'].patchValue(this.csi.csiRecordScoreShelter);
        this.csiEditForm.controls['csiScoreCare'].patchValue(this.csi.csiRecordScoreCare);
        this.csiEditForm.controls['csiScoreAbuseAndExploitation'].patchValue(this.csi.csiRecordScoreAbuseAndExploitation);
        this.csiEditForm.controls['csiScoreLegalProtection'].patchValue(this.csi.csiRecordScoreLegalProtection);
        this.csiEditForm.controls['csiScoreWellness'].patchValue(this.csi.csiRecordScoreWellness);
        this.csiEditForm.controls['csiScoreHealthCareServices'].patchValue(this.csi.csiRecordScoreHealthCareServices);
        this.csiEditForm.controls['csiScoreEmotionalHealth'].patchValue(this.csi.csiRecordScoreEmotionalHealth);
        this.csiEditForm.controls['csiScoreSocialBehavior'].patchValue(this.csi.csiRecordScoreSocialBehavior);
        this.csiEditForm.controls['csiScorePerformance'].patchValue(this.csi.csiRecordScorePerformance);
        this.csiEditForm.controls['csiScoreEducationAndWork'].patchValue(this.csi.csiRecordScoreEducationAndWork);

        // Populate Checkboxes
        // console.log('servicesProvidedTypeList', this.servicesProvidedTypeList);
        const servicesProvidedCheckboxArray = this.csi.csiRecordServicesProvided.split('|');
        this.servicesProvidedTypeList.forEach((value, index) => {
          const padded = ('000' + value.servicesProvidedTypeId).slice(-3);
          if (servicesProvidedCheckboxArray.indexOf(padded) > -1) {
            this.csiServicesProvidedCheckboxFormArray.controls[index].setValue(true);
          }
        });
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private prepareCreatePage(): void {
    const servicesProvided = this.servicesProvidedTypeService.getServicesProvidedTypeList();
    servicesProvided.subscribe(response => {
      this.servicesProvidedTypeList = response;
      this.addCheckboxes();
    });
  }

  private addCheckboxes() {
    // console.log('this.servicesProvidedTypeList', this.servicesProvidedTypeList);
    this.servicesProvidedTypeList.forEach(() => {
      const formArray = this.csiEditForm.controls.csiServicesProvidedCheckboxes as FormArray;
      return formArray.push(new FormControl(false));
    });
  }

  public onCsiServicesProvidedCheckboxChange(e) {
    const array: string[] = [];
    this.csiServicesProvidedCheckboxFormArray.value.forEach((value, index) => {
      if (value) {
        array.push(('000' + this.servicesProvidedTypeList[index].servicesProvidedTypeId).slice(-3));
      }
    });
    this.csiEditForm.controls['csiServicesProvided'].patchValue(array.join('|'));
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

  private getCaseManagerList(): void {
    this.caseManagerService.getCaseManagerList().subscribe(
      (response: CaseManager[]) => {
        // console.log('response', response);
        this.caseManagerList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getServicesProvidedTypeList(): void {
    this.servicesProvidedTypeService.getServicesProvidedTypeList().subscribe(
      (response: ServicesProvidedType[]) => {
        // console.log('response', response);
        this.servicesProvidedTypeList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public displayRefreshErrorDialog(): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.dialogTitle = 'Could Not Find the Student ID';
    this.confirmDialogRef.componentInstance.dialogMessage = 'An error occurred and the Student ID could not be found.' +
      '\nYou will be returned to the Student List page to try again.';
    this.confirmDialogRef.componentInstance.mainButtonText = 'OK';
    this.confirmDialogRef.componentInstance.hideCancelButton = true;
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['students/student-list']).then();
      }
      this.confirmDialogRef = null;
    });
  }

  // BUTTONS

  public delete(studentCsiId: number): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.csiService.deleteCsiRecord(studentCsiId).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['csi/csi-record-list']).then();
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
    const csi = new CsiRecord();
    // console.log('csiEditForm', this.csiEditForm.getRawValue());
    const formRawValues = this.csiEditForm.getRawValue()
    csi.csiRecordId = formRawValues.studentCsiId;
    csi.studentId = formRawValues.studentId;
    csi.caseManagerUserId = formRawValues.caseManagerUserId;
    csi.csiRecordDate = this.formattingService.formatStandardDateAsMySql(formRawValues.csiDate);
    csi.csiRecordComments = formRawValues.csiComments;
    csi.csiRecordServicesProvided = formRawValues.csiServicesProvided;
    // Scores
    csi.csiRecordScoreFoodSecurity = formRawValues.csiScoreFoodSecurity;
    csi.csiRecordScoreNutritionAndGrowth = formRawValues.csiScoreNutritionAndGrowth;
    csi.csiRecordScoreShelter = formRawValues.csiScoreShelter;
    csi.csiRecordScoreCare = formRawValues.csiScoreCare;
    csi.csiRecordScoreAbuseAndExploitation = formRawValues.csiScoreAbuseAndExploitation;
    csi.csiRecordScoreLegalProtection = formRawValues.csiScoreLegalProtection;
    csi.csiRecordScoreWellness = formRawValues.csiScoreWellness;
    csi.csiRecordScoreHealthCareServices = formRawValues.csiScoreHealthCareServices;
    csi.csiRecordScoreEmotionalHealth = formRawValues.csiScoreEmotionalHealth;
    csi.csiRecordScoreSocialBehavior = formRawValues.csiScoreSocialBehavior;
    csi.csiRecordScorePerformance = formRawValues.csiScorePerformance;
    csi.csiRecordScoreEducationAndWork = formRawValues.csiScoreEducationAndWork;

    if (this.newRecord) {
      this.csiService.createCsiRecord(csi).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['csi/csi-record-detail', response.csiRecordId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.csiService.updateCsiRecord(csi).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['csi/csi-record-detail', response.csiRecordId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.csi.csiRecordId) {
      console.log('A', this.csi.csiRecordId);
      this.router.navigate(['csi/csi-record-detail', this.csi.csiRecordId]).then();
    } else if (this.studentId) {
      console.log('B', this.studentId);
      this.router.navigate(['students/student-detail', this.studentId]).then();
    } else {
      console.log('C');
      this.router.navigate(['csi/csi-record-list']).then();
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

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : {required: true};
  };

  return validator;
}
