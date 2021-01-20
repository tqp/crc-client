import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CaregiverService } from '../../people/caregivers/caregiver.service';
import { Caregiver } from '../../people/caregivers/Caregiver';
import { RelationshipType } from '../../reference-tables/relationship-type/RelationshipType';
import { RelationshipTypeService } from '../../reference-tables/relationship-type/relationship-type.service';
import { TierType } from '../../reference-tables/tier-type/TierType';
import { TierTypeService } from '../../reference-tables/tier-type/tier-type.service';
import { FormattingService } from '../../../../../@tqp/services/formatting.service';

import * as moment from 'moment';
import { validateNonZeroValue } from '../../../../../@tqp/validators/custom.validators';
import { ConfirmDialogComponent } from '../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { RelationshipService } from '../relationship.service';

@Component({
  selector: 'app-student-caregiver-edit-dialog',
  templateUrl: './student-caregiver-edit-dialog.component.html',
  styleUrls: ['./student-caregiver-edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentCaregiverEditDialogComponent implements OnInit {
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public dataLoaded: boolean = false;
  public studentCaregiverEditForm: FormGroup;
  public caregiverList: Caregiver[];
  public relationshipTypeList: RelationshipType[];
  public tierTypeList: TierType[];
  public caregiverRelationship: Caregiver;

  public validationMessages = {
    'relationshipId': [],
    'caregiverId': [
      {type: 'required', message: 'A Caregiver is required'}
    ],
    'relationshipStartDate': [
      {type: 'required', message: 'An Effective Date is required'}
    ],
    'tierTypeId': [
      {type: 'required', message: 'A Support Tier is required'}
    ],
    'relationshipTypeId': [
      {type: 'required', message: 'A Relationship Type is required'}
    ],
    'relationshipFamilyOfOriginTypeId': [
      {type: 'required', message: 'A Family of Origin response required'}
    ]
  };

  constructor(private dialogRef: MatDialogRef<StudentCaregiverEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private caregiverService: CaregiverService,
              private relationshipService: RelationshipService,
              private relationshipTypeService: RelationshipTypeService,
              private tierTypeService: TierTypeService,
              private formattingService: FormattingService,
              public _matDialog: MatDialog
  ) {
    this.getCaregiverList(this.data.caregiverId);
    this.getSupportTierList();
    this.getRelationshipTypeList();
    if (this.data.action === 'update') {
      this.getCaregiverDetailByStudentId(this.data.studentId);
    } else {
      this.dataLoaded = true;
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.studentCaregiverEditForm = this.formBuilder.group({
      relationshipId: new FormControl({value: 0, disabled: true}),
      caregiverId: new FormControl(0, [Validators.required, validateNonZeroValue]),
      relationshipStartDate: new FormControl(moment().format('MM/DD/YYYY'), Validators.required),
      tierTypeId: new FormControl(0, [Validators.required, validateNonZeroValue]),
      relationshipTypeId: new FormControl(0, [Validators.required, validateNonZeroValue]),
      relationshipFamilyOfOriginTypeId: new FormControl(0, [Validators.required, validateNonZeroValue]),
    });

    // setTimeout(() => {
    //   this.relationSurnameField.nativeElement.focus();
    // }, 0);
  }

  // LOAD DATA

  private getCaregiverDetailByStudentId(studentId: number): void {
    this.caregiverService.getCaregiverDetailByStudentId(studentId).subscribe(
      response => {
        // console.log('response', response);
        this.caregiverRelationship = response;
        this.caregiverRelationship.relationshipStartDate = this.formattingService.formatMySqlDateAsStandard(this.caregiverRelationship.relationshipStartDate);
        this.studentCaregiverEditForm.controls['relationshipId'].patchValue(this.caregiverRelationship.relationshipId);
        this.studentCaregiverEditForm.controls['caregiverId'].patchValue(this.caregiverRelationship.caregiverId);
        this.studentCaregiverEditForm.controls['relationshipStartDate'].patchValue(this.caregiverRelationship.relationshipStartDate);
        this.studentCaregiverEditForm.controls['tierTypeId'].patchValue(this.caregiverRelationship.relationshipTierTypeId);
        this.studentCaregiverEditForm.controls['relationshipTypeId'].patchValue(this.caregiverRelationship.relationshipTypeId);
        this.studentCaregiverEditForm.controls['relationshipFamilyOfOriginTypeId'].patchValue(this.caregiverRelationship.relationshipFamilyOfOriginTypeId);
        this.dataLoaded = true;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // LOAD OPTION VALUE LISTS

  private getCaregiverList(excludeId: number): void {
    this.caregiverService.getCaregiverList().subscribe(
      (response: Caregiver[]) => {
        // console.log('response', response);
        this.caregiverList = response;
        this.caregiverList = this.caregiverList.filter(item => {
          return item.caregiverId !== excludeId;
        });
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getSupportTierList(): void {
    this.tierTypeService.getTierTypeList().subscribe(
      (response: TierType[]) => {
        // console.log('response', response);
        this.tierTypeList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getRelationshipTypeList(): void {
    this.relationshipTypeService.getRelationshipTypeList().subscribe(
      (response: RelationshipType[]) => {
        // console.log('response', response);
        this.relationshipTypeList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public delete(): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false,
      minWidth: '30%'
    });
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close(['delete', this.studentCaregiverEditForm.getRawValue()]);
      }
      this.confirmDialogRef = null;
    });
  }

  public save(): void {
    this.dialogRef.close([this.data.action, this.studentCaregiverEditForm.getRawValue()]);
  }

}
