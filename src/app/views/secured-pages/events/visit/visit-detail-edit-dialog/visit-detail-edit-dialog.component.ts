import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Caregiver } from '../../../people/caregivers/Caregiver';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../../people/students/Student';
import { StudentService } from '../../../people/students/student.service';
import { InteractionType } from '../../../reference-tables/interaction-type/InteractionType';
import { VisitType } from '../../../reference-tables/visit-type/VisitType';
import { VisitTypeService } from '../../../reference-tables/visit-type/visit-type.service';
import { InteractionTypeService } from '../../../reference-tables/interaction-type/interaction-type.service';
import { validateNonZeroValue } from '@tqp/validators/custom.validators';
import * as moment from 'moment';
import { CaseManager } from '../../../people/case-managers/CaseManager';
import { CaseManagerService } from '../../../people/case-managers/case-manager.service';

@Component({
  selector: 'app-visit-detail-edit-dialog',
  templateUrl: './visit-detail-edit-dialog.component.html',
  styleUrls: ['./visit-detail-edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VisitDetailEditDialogComponent implements OnInit {
  public visitEditForm: FormGroup;
  public studentId: number;
  public studentList: Student[];
  public caseManagerList: CaseManager[];
  public visitTypeList: VisitType[];
  public interactionTypeList: InteractionType[];

  public validationMessages = {
    'studentId': [
      {type: 'required', message: 'A Student is required'},
      {type: 'validateNonZeroValue', message: 'You must select a Student'}
    ],
    'caseManagerId': [
      {type: 'required', message: 'A Case Manager is required'},
      {type: 'validateNonZeroValue', message: 'You must select a Case Manager'}
    ],
    'visitDate': [
      {type: 'required', message: 'A Visit Date is required'}
    ],
    'visitTypeId': [
      {type: 'required', message: 'A Visit Type is required'}
    ],
    'interactionTypeId': [
      {type: 'required', message: 'An Interaction Type is required'}
    ],
    'caregiverComments': [],
    'caseManagerComments': [],
  };

  static validateNonZeroValue(fc: FormControl) {
    if (fc.value === 0) {
      return ({validateNonZeroValue: true});
    } else {
      return null;
    }
  }

  constructor(private dialogRef: MatDialogRef<VisitDetailEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private studentService: StudentService,
              private caseManagerService: CaseManagerService,
              private visitTypeService: VisitTypeService,
              private interactionTypeService: InteractionTypeService
  ) {
    this.getStudentList();
    this.getCaseManagerList();
    this.getVisitTypeList();
    this.getInteractionTypeList();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.visitEditForm = this.formBuilder.group({
      studentId: new FormControl({
        value: this.data.studentId !== undefined ? this.data.studentId : 0,
        disabled: this.data.studentId !== undefined
      }, [Validators.required, validateNonZeroValue]),
      caseManagerId: new FormControl(0, [Validators.required, validateNonZeroValue]),
      visitDate: new FormControl(moment().format('DD-MMM-yyyy'), Validators.required),
      visitTypeId: new FormControl(0, [Validators.required, validateNonZeroValue]),
      interactionTypeId: new FormControl(0, [Validators.required, validateNonZeroValue]),
      caregiverComments: new FormControl(''),
      caseManagerComments: new FormControl('')
    });

    // setTimeout(() => {
    //   this.relationSurnameField.nativeElement.focus();
    // }, 0);
  }

  // Load Option Value Lists

  private getStudentList(): void {
    this.studentService.getStudentList().subscribe(
      (response: Caregiver[]) => {
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
      (response: Caregiver[]) => {
        console.log('response', response);
        this.caseManagerList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getVisitTypeList(): void {
    this.visitTypeService.getVisitTypeList().subscribe(
      (response: VisitType[]) => {
        // console.log('response', response);
        this.visitTypeList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getInteractionTypeList(): void {
    this.interactionTypeService.getInteractionTypeList().subscribe(
      (response: InteractionType[]) => {
        // console.log('response', response);
        this.interactionTypeList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public reset(): void {
    console.log('reset');
  }

  public save(): void {
    this.dialogRef.close(this.visitEditForm.getRawValue());
  }

}
