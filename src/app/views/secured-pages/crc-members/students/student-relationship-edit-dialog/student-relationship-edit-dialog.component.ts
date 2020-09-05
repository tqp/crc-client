import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RelationshipType} from '../../../reference-tables/relationship-type/RelationshipType';
import {RelationshipTypeService} from '../../../reference-tables/relationship-type/relationship-type.service';
import {Relationship} from '../Relationship';

export function ValidateNonZero(control: AbstractControl): any {
  if (control.value === 0) {
    return {
      nonZero: true
    };
  }
  return null;
}

@Component({
  selector: 'app-student-relationship-edit-dialog',
  templateUrl: './student-relationship-edit-dialog.component.html',
  styleUrls: ['./student-relationship-edit-dialog.component.css']
})
export class StudentRelationshipEditDialogComponent implements OnInit {
  @ViewChild('relationSurnameField', {static: true}) relationSurnameField: ElementRef;
  public relationshipEditForm: FormGroup;
  public relationshipTypeList: RelationshipType[];
  public dialogTitle: string;
  public relationship: Relationship;

  public validationMessages = {
    'studentId': [
      {type: 'required', message: 'A Student ID is required'}
    ],
    'relationSurname': [
      {type: 'required', message: 'A Surname is required'}
    ],
    'relationGivenName': [
      {type: 'required', message: 'A Given Name is required'}
    ],
    'relationshipTypeId': [
      {type: 'nonZero', message: 'You must pick a Relationship Type'}
    ]
  };

  constructor(private dialogRef: MatDialogRef<StudentRelationshipEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private relationshipTypeService: RelationshipTypeService) {
    // console.log('data', this.data);
    this.getRelationshipTypeList();

    this.relationship = new Relationship({});
    if (this.data.action === 'edit') {
      this.dialogTitle = 'Edit Relationship';
    } else {
      this.dialogTitle = 'Add New Relationship';
      this.relationship.studentId = this.data.studentId;
      this.relationship.relationshipTypeId = 0;
    }

    this.initializeForm();
  }

  ngOnInit(): void {
  }

  private initializeForm(): void {
    this.relationshipEditForm = this.formBuilder.group({
      studentId: new FormControl(this.relationship.studentId, Validators.required),
      relationSurname: new FormControl(this.relationship.relationSurname, Validators.required),
      relationGivenName: new FormControl(this.relationship.relationGivenName, Validators.required),
      relationshipTypeId: new FormControl(this.relationship.relationshipTypeId, [ValidateNonZero])
    });

    setTimeout(() => {
      this.relationSurnameField.nativeElement.focus();
    }, 0);
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

  public reset(): void {
    console.log('form', this.relationshipEditForm);
    this.relationshipEditForm.controls['relationSurname'].patchValue('');
    this.relationshipEditForm.controls['relationGivenName'].patchValue('');
    this.relationshipEditForm.controls['relationshipTypeId'].patchValue(0);
    this.relationshipEditForm.markAsPristine();
    this.relationshipEditForm.markAsUntouched();

  }

  public save(): void {
    this.dialogRef.close(this.relationshipEditForm.value);
  }

}
