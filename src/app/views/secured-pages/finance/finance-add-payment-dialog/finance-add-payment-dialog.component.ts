import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Caregiver } from '../../people/caregivers/Caregiver';
import { RelationshipType } from '../../reference-tables/relationship-type/RelationshipType';
import { TierType } from '../../reference-tables/tier-type/TierType';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CaregiverService } from '../../people/caregivers/caregiver.service';
import { RelationshipTypeService } from '../../reference-tables/relationship-type/relationship-type.service';
import { TierTypeService } from '../../reference-tables/tier-type/tier-type.service';
import { FormattingService } from '../../../../../@tqp/services/formatting.service';

@Component({
  selector: 'app-finance-add-payment-dialog',
  templateUrl: './finance-add-payment-dialog.component.html',
  styleUrls: ['./finance-add-payment-dialog.component.css']
})
export class FinanceAddPaymentDialogComponent implements OnInit {
  public addPaymentForm: FormGroup;
  public caregiverList: Caregiver[];
  public relationshipTypeList: RelationshipType[];
  public tierTypeList: TierType[];

  public validationMessages = {
    'caregiverId': [
      {type: 'required', message: 'A Caregiver is required'}
    ],
    'tierTypeId': [
      {type: 'required', message: 'A Support Tier is required'}
    ],
    'relationshipStartDate': [
      {type: 'required', message: 'An Effective Date is required'}
    ],
  };

  constructor(private dialogRef: MatDialogRef<FinanceAddPaymentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private caregiverService: CaregiverService,
              private relationshipTypeService: RelationshipTypeService,
              private tierTypeService: TierTypeService,
              private formattingService: FormattingService
  ) {
    this.getCaregiverList();
    this.getSupportTierList();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.addPaymentForm = this.formBuilder.group({
      caregiverId: new FormControl(0, Validators.required),
      tierTypeId: new FormControl('', Validators.required),
      relationshipStartDate: new FormControl('', Validators.required)
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
    this.dialogRef.close(this.addPaymentForm.value);
  }

}
