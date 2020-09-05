import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Student } from '../Student';
import { StudentService } from '../student.service';
import { FormattingService } from '@tqp/services/formatting.service';
import { TierTypeService } from '../../../reference-tables/tier-type/tier-type.service';
import { TierType } from '../../../reference-tables/tier-type/TierType';
import { Person } from '../../../../../../@tqp/models/Person';
import { StudentRelationshipEditDialogComponent } from '../student-relationship-edit-dialog/student-relationship-edit-dialog.component';
import { Relationship } from '../Relationship';
import { RelationshipService } from '../../relationship/relationship.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-student-detail-edit',
  templateUrl: './student-detail-edit.component.html',
  styleUrls: ['./student-detail-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentDetailEditComponent implements OnInit {
  @ViewChild('studentSurnameInputField', {static: false}) studentSurnameInputField: ElementRef;
  public pageSource: string;
  public newRecord: boolean;
  public student: Student;
  public tierTypeList: TierType[];
  public studentEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  private relationship: Relationship;

  // Relationships List
  public records: Person[] = [];
  public dataSource: Person[] = [];
  public displayedColumns: string[] = [
    'name',
    'relationship',
    'bloodRelative'
  ];

  public validationMessages = {
    'studentId': [
      {type: 'required', message: 'A GUID is required'}
    ],
    'studentSurname': [
      {type: 'required', message: 'A Surname is required'}
    ],
    'studentGivenName': [
      {type: 'required', message: 'A Given Name is required'}
    ],
    'studentGender': [
      {type: 'required', message: 'A Gender is required'}
    ],
    'studentDateOfBirth': [],
    'studentGrade': [],
    'studentSchool': [],
    'studentAddress': [],
    'studentPhone': [],
    'tierTypeGuid': [
      {type: 'required', message: 'A Support Tier is required'}
    ]
  };

  constructor(private route: ActivatedRoute,
              private studentService: StudentService,
              private relationshipService: RelationshipService,
              private tierTypeService: TierTypeService,
              private router: Router,
              private formBuilder: FormBuilder,
              private formattingService: FormattingService,
              public _matDialog: MatDialog) {
    this.initializeForm();
    this.getTierTypeList();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const studentId = params['guid'];
        // console.log('studentId', studentId);
        this.getStudentDetail(studentId);
        this.getRelationshipListByStudentId(studentId);
      } else {
        // Create new Person
        this.newRecord = true;
        this.student = new Student();
        this.student.studentId = null;
        setTimeout(() => {
          this.studentSurnameInputField.nativeElement.focus();
        }, 0);
      }
    }).then();
  }

  private initializeForm(): void {
    this.studentEditForm = this.formBuilder.group({
      studentId: new FormControl(''),
      studentSurname: new FormControl('', Validators.required),
      studentGivenName: new FormControl('', Validators.required),
      studentGender: new FormControl('', Validators.required),
      studentDateOfBirth: new FormControl(''),
      studentSchool: new FormControl(''),
      studentGrade: new FormControl(''),
      studentAddress: new FormControl(''),
      studentPhone: new FormControl(''),
      tierTypeGuid: new FormControl('', Validators.required),
    });
  }

  private getStudentDetail(guid: string): void {
    this.studentService.getStudentDetail(guid).subscribe(
      response => {
        this.student = response;
        // console.log('response', response);
        this.studentEditForm.controls['studentId'].patchValue(this.student.studentId);
        this.studentEditForm.controls['studentSurname'].patchValue(this.student.studentSurname);
        this.studentEditForm.controls['studentGivenName'].patchValue(this.student.studentGivenName);
        this.studentEditForm.controls['studentGender'].patchValue(this.student.studentGender);
        this.studentEditForm.controls['studentDateOfBirth'].patchValue(this.formattingService.formatMySqlDateAsStandard(this.student.studentDateOfBirth));
        this.studentEditForm.controls['studentSchool'].patchValue(this.student.studentSchool);
        this.studentEditForm.controls['studentGrade'].patchValue(this.student.studentGrade);
        this.studentEditForm.controls['studentAddress'].patchValue(this.student.studentAddress);
        this.studentEditForm.controls['studentPhone'].patchValue(this.student.studentPhone);
        this.studentEditForm.controls['tierTypeGuid'].patchValue(this.student.tierTypeId);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getRelationshipListByStudentId(studentId: number): void {
    this.relationshipService.getRelationshipListByStudentId(studentId).subscribe(
      (relationshipList: Person[]) => {
        // console.log('relationshipList', relationshipList);
        this.records = [];
        relationshipList.forEach(item => {
          this.records.push(item);
        });
        this.dataSource = this.records;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getTierTypeList(): void {
    this.tierTypeService.getTierTypeList().subscribe(
      (response: TierType[]) => {
        this.tierTypeList = response;
        // console.log('response', response);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public openStudentRelationshipEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'create',
      studentId: this.student.studentId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(StudentRelationshipEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      console.log('dialogClose', dialogData);
      this.relationship = dialogData;
      console.log('this.relationship', this.relationship);

      this.relationshipService.createPerson_Relationship(this.relationship).pipe(
        mergeMap(newPersonId => {
          console.log('newPersonId', newPersonId);
          this.relationship.personId = newPersonId;
          this.relationship.relationshipBloodRelative = 0;
          console.log('this.relationship', this.relationship);
          return this.relationshipService.createRelationship(this.relationship);
        })
      ).subscribe(thing => {
        console.log('this.student.studentId', this.student.studentId);
        this.getRelationshipListByStudentId(this.student.studentId);
      });

    });
  }

  public save(): void {
    const student = new Student();

    // console.log('crudEditForm', this.studentEditForm.value);
    student.studentId = this.studentEditForm.value.studentId;
    student.studentSurname = this.studentEditForm.value.studentSurname;
    student.studentGivenName = this.studentEditForm.value.studentGivenName;
    student.studentGender = this.studentEditForm.value.studentGender;
    student.studentDateOfBirth = this.formattingService.formatStandardDateAsMySql(this.studentEditForm.value.studentDateOfBirth);
    student.studentSchool = this.studentEditForm.value.studentSchool;
    student.studentGrade = this.studentEditForm.value.studentGrade;
    student.studentAddress = this.studentEditForm.value.studentAddress;
    student.studentPhone = this.studentEditForm.value.studentPhone;
    student.tierTypeId = this.studentEditForm.value.tierTypeGuid;

    if (this.newRecord) {
      this.studentService.createStudent(student).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['students/student-detail', response.studentId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.studentService.updateStudent(student).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['students/student-detail', response.studentId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public delete(studentId: number): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.deleteStudent(studentId).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['students/student-list']).then();
          },
          error => {
            console.error('Error: ' + error.message);
          }
        );
      }
      this.confirmDialogRef = null;
    });
  }

  public cancel(): void {
    if (this.student.studentId) {
      this.router.navigate(['students/student-detail', this.student.studentId]).then();
    } else {
      this.router.navigate(['students/student-list']).then();
    }
  }

  // @HostListener('window:keydown', ['$event'])
  // public handleKeyboardEvent(event: KeyboardEvent): void {
  //   if (event.key === 'Enter') {
  //     this.save();
  //   }
  //   if (event.key === 'Escape') {
  //     this.cancel();
  //   }
  //   if (event.ctrlKey && event.key === 'd') {
  //     event.preventDefault();
  //     this.delete(this.student.studentId);
  //   }
  //   if (event.ctrlKey && event.key === 's') {
  //     event.preventDefault();
  //     this.save();
  //   }
  //   if (event.ctrlKey && event.key === 'c') {
  //     event.preventDefault();
  //     this.cancel();
  //   }
  // }

}
