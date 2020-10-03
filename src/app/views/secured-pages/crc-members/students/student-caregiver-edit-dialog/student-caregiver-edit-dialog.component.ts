import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CaregiverService } from '../../caregivers/caregiver.service';
import { Caregiver } from '../../caregivers/Caregiver';
import { RelationshipType } from '../../../reference-tables/relationship-type/RelationshipType';
import { RelationshipTypeService } from '../../../reference-tables/relationship-type/relationship-type.service';
import { TierType } from '../../../reference-tables/tier-type/TierType';
import { TierTypeService } from '../../../reference-tables/tier-type/tier-type.service';

@Component({
  selector: 'app-student-caregiver-edit-dialog',
  templateUrl: './student-caregiver-edit-dialog.component.html',
  styleUrls: ['./student-caregiver-edit-dialog.component.css']
})
export class StudentCaregiverEditDialogComponent implements OnInit {
  public studentCaregiverEditForm: FormGroup;
  public caregiverList: Caregiver[];
  public relationshipTypeList: RelationshipType[];
  public tierTypeList: TierType[];

  public validationMessages = {
    'caregiverId': [
      {type: 'required', message: 'A Caregiver is required'}
    ],
    // 'relationshipTypeId': [
    //   {type: 'required', message: 'A Relationship Type is required'}
    // ],
    'tierTypeId': [
      {type: 'required', message: 'A Support Tier is required'}
    ]
  };

  constructor(private dialogRef: MatDialogRef<StudentCaregiverEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private caregiverService: CaregiverService,
              private relationshipTypeService: RelationshipTypeService,
              private tierTypeService: TierTypeService
  ) {
    this.getCaregiverList();
    // this.getRelationshipTypeList();
    this.getSupportTierList();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.studentCaregiverEditForm = this.formBuilder.group({
      caregiverId: new FormControl(0, Validators.required),
      // relationshipTypeId: new FormControl('', Validators.required),
      tierTypeId: new FormControl('', Validators.required)
    });

    // setTimeout(() => {
    //   this.relationSurnameField.nativeElement.focus();
    // }, 0);
  }

  // Load Option Value Lists

  private getCaregiverList(): void {
    this.caregiverService.getCaregiverList().subscribe(
      (response: Caregiver[]) => {
        // console.log('response', response);
        this.caregiverList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // private getRelationshipTypeList(): void {
  //   this.relationshipTypeService.getRelationshipTypeList().subscribe(
  //     (response: RelationshipType[]) => {
  //       console.log('response', response);
  //       this.relationshipTypeList = response;
  //     },
  //     error => {
  //       console.error('Error: ', error);
  //     }
  //   );
  // }

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



  // BUTTONS

  public reset(): void {
    console.log('reset');
  }

  public save(): void {
    this.dialogRef.close(this.studentCaregiverEditForm.value);
  }

}
