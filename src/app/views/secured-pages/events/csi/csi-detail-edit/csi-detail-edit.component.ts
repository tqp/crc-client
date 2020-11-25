import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Csi } from '../Csi';
import { CsiService } from '../csi.service';
import { Student } from '../../../people/students/Student';
import { StudentService } from '../../../people/students/student.service';
import { FormattingService } from '../../../../../../@tqp/services/formatting.service';
import { CaseManager } from '../../../people/case-managers/CaseManager';
import { CaseManagerService } from '../../../people/case-managers/case-manager.service';
import * as moment from 'moment';
import { ServicesProvidedTypeService } from '../../../reference-tables/services-provided-type/services-provided-type.service';
import { ServicesProvidedType } from '../../../reference-tables/services-provided-type/ServicesProvidedType';
import { forkJoin } from 'rxjs';

// REF: https://coryrylan.com/blog/creating-a-dynamic-checkbox-list-in-angular

@Component({
  selector: 'app-csi-detail-edit',
  templateUrl: './csi-detail-edit.component.html',
  styleUrls: ['./csi-detail-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CsiDetailEditComponent implements OnInit, OnDestroy {
  @ViewChild('caregiverSurnameInputField', {static: false}) caregiverSurnameInputField: ElementRef;
  public studentId;
  public pageSource: string;
  public newRecord: boolean;
  public csi: Csi;
  public csiEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public studentList: Student[];
  public caseManagerList: CaseManager[];
  public servicesProvidedTypeList: ServicesProvidedType[];

  public dark = 'badge-dark';
  public light = 'badge-light';

  get checkboxFormArray() {
    return this.csiEditForm.controls.csiServicesProvidedCheckboxes as FormArray;
  }

  public validationMessages = {
    'csiId': [
      {type: 'required', message: 'An ID is required'}
    ],
    'studentId': [
      {type: 'required', message: 'An Student is required'}
    ],
    'caseManagerId': [
      {type: 'required', message: 'A Case Manager is required'}
    ],
    'csiDate': [
      {type: 'required', message: 'A date is required'}
    ],
    'csiServicesProvided': [
      {type: 'required', message: 'Please check the services provided'}
    ],
    'csiServicesProvidedArray': [
      {type: 'required', message: 'Please check the services provided'}
    ],
    'csiComments': [
      {type: 'required', message: 'A response is required'}
    ],

    'csiScoreFoodSecurity': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiScoreNutritionAndGrowth': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiScoreShelter': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiScoreCare': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiScoreAbuseAndExploitation': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiScoreLegalProtection': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiScoreWellness': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiScoreHealthCareServices': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiScoreEmotionalHealth': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiScoreSocialBehavior': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiScorePerformance': [
      {type: 'required', message: 'A response is required'}
    ],
    'csiScoreEducationAndWork': [
      {type: 'required', message: 'A response is required'}
    ]
  };

  constructor(private route: ActivatedRoute,
              private csiService: CsiService,
              private studentService: StudentService,
              private caseManagerService: CaseManagerService,
              private formattingService: FormattingService,
              private servicesProvidedTypeService: ServicesProvidedTypeService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.getStudentList();
    this.getCaseManagerList();

    if (this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.studentId) {
      this.studentId = this.router.getCurrentNavigation().extras.state.studentId;
      localStorage.setItem('studentId', this.studentId);
    } else {
      console.error('Refreshed Screen. Returning to Main Page.');
      this.studentId = localStorage.getItem('studentId');
      console.log('Retrieved studentId from local storage.', this.studentId);
      // this.router.navigate(['students/student-list']).then();
    }
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const csiId = params['id'];
        this.newRecord = false;
        // console.log('csiId', csiId);
        this.getCsiDetail(csiId);
      } else {
        // Create new Person
        this.newRecord = true;
        this.csi = new Csi();
        this.csi.csiId = null;
        // setTimeout(() => {
        //   this.csiRecordDateInputField.nativeElement.focus();
        // }, 0);
      }
    }).then();
    this.initializeForm();
  }

  ngOnDestroy() {
    localStorage.clear();
  }

  private initializeForm(): void {
    console.log('this.studentId', this.studentId);

    this.csiEditForm = this.formBuilder.group({
      csiId: new FormControl({value: 0, disabled: true}),
      studentId: new FormControl({value: this.studentId, disabled: true}),
      caseManagerId: new FormControl({value: 0, disabled: false}),
      csiDate: new FormControl(moment().format('MM/DD/YYYY'), Validators.required),
      csiComments: new FormControl('', Validators.required),
      csiServicesProvided: new FormControl(''),
      csiServicesProvidedCheckboxes: new FormArray([], minSelectedCheckboxes(1)),
      // Scores
      csiScoreFoodSecurity: new FormControl(''),
      csiScoreNutritionAndGrowth: new FormControl(''),
      csiScoreShelter: new FormControl(''),
      csiScoreCare: new FormControl(''),
      csiScoreAbuseAndExploitation: new FormControl(''),
      csiScoreLegalProtection: new FormControl(''),
      csiScoreWellness: new FormControl(''),
      csiScoreHealthCareServices: new FormControl(''),
      csiScoreEmotionalHealth: new FormControl(''),
      csiScoreSocialBehavior: new FormControl(''),
      csiScorePerformance: new FormControl(''),
      csiScoreEducationAndWork: new FormControl(''),
    });
  }

  private addCheckboxes() {
    this.servicesProvidedTypeList.forEach(() => {
      const formArray = this.csiEditForm.controls.csiServicesProvidedCheckboxes as FormArray;
      return formArray.push(new FormControl(false));
    });
  }

  private getCsiDetail(csiId: number): void {
    const servicesProvided = this.servicesProvidedTypeService.getServicesProvidedTypeList();
    const csiDetail = this.csiService.getCsiDetail(csiId);

    // We need to ensure that both the servicedProvided list and the csiDetail come back before
    // trying to populate the checkboxes... so, we use forkJoin.
    forkJoin([servicesProvided, csiDetail]).subscribe(response => {
        // console.log('response', response);

        // Use the servicesProvidedTypeList response
        this.servicesProvidedTypeList = response[0];
        this.addCheckboxes();

        // User the csiDetail response
        this.csi = response[1];
        // console.log('this.csi', this.csi);
        this.csiEditForm.controls['csiId'].patchValue(this.csi.csiId);
        this.csiEditForm.controls['studentId'].patchValue(this.csi.studentId);
        this.csiEditForm.controls['caseManagerId'].patchValue(this.csi.caseManagerId);
        this.csiEditForm.controls['csiDate'].patchValue(this.formattingService.formatMySqlDateAsStandard(this.csi.csiDate));
        this.csiEditForm.controls['csiComments'].patchValue(this.csi.csiComments);
        this.csiEditForm.controls['csiServicesProvided'].patchValue(this.csi.csiServicesProvided);

        this.csiEditForm.controls['csiScoreFoodSecurity'].patchValue(this.csi.csiScoreFoodSecurity);
        this.csiEditForm.controls['csiScoreNutritionAndGrowth'].patchValue(this.csi.csiScoreNutritionAndGrowth);
        this.csiEditForm.controls['csiScoreShelter'].patchValue(this.csi.csiScoreShelter);
        this.csiEditForm.controls['csiScoreCare'].patchValue(this.csi.csiScoreCare);
        this.csiEditForm.controls['csiScoreAbuseAndExploitation'].patchValue(this.csi.csiScoreAbuseAndExploitation);
        this.csiEditForm.controls['csiScoreLegalProtection'].patchValue(this.csi.csiScoreLegalProtection);
        this.csiEditForm.controls['csiScoreWellness'].patchValue(this.csi.csiScoreWellness);
        this.csiEditForm.controls['csiScoreHealthCareServices'].patchValue(this.csi.csiScoreHealthCareServices);
        this.csiEditForm.controls['csiScoreEmotionalHealth'].patchValue(this.csi.csiScoreEmotionalHealth);
        this.csiEditForm.controls['csiScoreSocialBehavior'].patchValue(this.csi.csiScoreSocialBehavior);
        this.csiEditForm.controls['csiScorePerformance'].patchValue(this.csi.csiScorePerformance);
        this.csiEditForm.controls['csiScoreEducationAndWork'].patchValue(this.csi.csiScoreEducationAndWork);

        // Populate Checkboxes
        const servicesProvidedCheckboxArray = this.csi.csiServicesProvided.split('|');
        this.servicesProvidedTypeList.forEach((value, index) => {
          const padded = ('000' + value.servicesProvidedTypeId).slice(-3);
          if (servicesProvidedCheckboxArray.indexOf(padded) > -1) {
            this.checkboxFormArray.controls[index].setValue(true);
          }
        });
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  onCsiServicesProvidedCheckboxChange(e) {
    const array: string[] = [];
    this.checkboxFormArray.value.forEach((value, index) => {
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

  // BUTTONS

  public delete(csiId: number): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.csiService.deleteCsi(csiId).subscribe(
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
    const csi = new Csi();
    // console.log('csiEditForm', this.csiEditForm.getRawValue());
    csi.csiId = this.csiEditForm.getRawValue().csiId;
    csi.studentId = this.csiEditForm.getRawValue().studentId;
    csi.caseManagerId = this.csiEditForm.getRawValue().caseManagerId;
    csi.csiDate = this.formattingService.formatStandardDateAsMySql(this.csiEditForm.getRawValue().csiDate);
    csi.csiComments = this.csiEditForm.getRawValue().csiComments;
    csi.csiServicesProvided = this.csiEditForm.getRawValue().csiServicesProvided;
    // Scores
    csi.csiScoreFoodSecurity = this.csiEditForm.getRawValue().csiScoreFoodSecurity;
    csi.csiScoreNutritionAndGrowth = this.csiEditForm.getRawValue().csiScoreNutritionAndGrowth;
    csi.csiScoreShelter = this.csiEditForm.getRawValue().csiScoreShelter;
    csi.csiScoreCare = this.csiEditForm.getRawValue().csiScoreCare;
    csi.csiScoreAbuseAndExploitation = this.csiEditForm.getRawValue().csiScoreAbuseAndExploitation;
    csi.csiScoreLegalProtection = this.csiEditForm.getRawValue().csiScoreLegalProtection;
    csi.csiScoreWellness = this.csiEditForm.getRawValue().csiScoreWellness;
    csi.csiScoreHealthCareServices = this.csiEditForm.getRawValue().csiScoreHealthCareServices;
    csi.csiScoreEmotionalHealth = this.csiEditForm.getRawValue().csiScoreEmotionalHealth;
    csi.csiScoreSocialBehavior = this.csiEditForm.getRawValue().csiScoreSocialBehavior;
    csi.csiScorePerformance = this.csiEditForm.getRawValue().csiScorePerformance;
    csi.csiScoreEducationAndWork = this.csiEditForm.getRawValue().csiScoreEducationAndWork;

    if (this.newRecord) {
      this.csiService.createCsi(csi).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['csi/csi-detail', response.csiId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.csiService.updateCsi(csi).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['csi/csi-detail', response.csiId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.csi.csiId) {
      this.router.navigate(['csi/csi-detail', this.csi.csiId]).then();
    } else {
      this.router.navigate(['csi/csi-list']).then();
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
