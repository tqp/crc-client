import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Student } from '../../../../../models/people/student.model';
import { StudentService } from '../../../../../services/people/student.service';
import { FormattingService } from '@tqp/services/formatting.service';
import { TierTypeService } from '../../../../../services/reference-tables/tier-type.service';
import { TierTypeModel } from '../../../../../models/types/type-tier.model';
import { Relationship } from '../../../../../models/relationship.model';
import { SchoolClassTypeService } from '../../../../../services/reference-tables/school-class-type.service';
import { SchoolClassType } from '../../../../../models/types/type-school-class.model';
import { ImpairmentType } from '../../../../../models/types/type-impairment.model';
import { ImpairmentTypeService } from '../../../../../services/reference-tables/impairment-type.service';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-student-detail-edit',
  templateUrl: './student-detail-edit.component.html',
  styleUrls: ['./student-detail-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentDetailEditComponent implements OnInit {
  @ViewChild('studentGivenNameInputField', {static: false}) studentGivenNameInputField: ElementRef;
  public pageSource: string;
  public newRecord: boolean;
  public student: Student;
  public tierTypeList: TierTypeModel[];
  public schoolLevelList: SchoolClassType[];
  public classLevelList: SchoolClassType[];
  public impairmentTypeList: ImpairmentType[];
  public studentEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public potentialDuplicateStudentFlag: boolean = false;

  // Relationships List
  public records: Relationship[] = [];
  public dataSource: Relationship[] = [];
  public displayedColumns: string[] = [
    'name',
    'relationship',
    'bloodRelative'
  ];

  public validationMessages = {
    // Personal Information
    'studentId': [
      {type: 'required', message: 'An ID is required'}
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
    'studentDateOfBirth': [
      {type: 'required', message: 'A Date of Birth is required'}
    ],
    'studentSchool': [],
    'schoolLevelTypeId': [],
    'classLevelTypeId': [],
    'classRepeatYearTypeId': [],
    'impairmentTypeId': [],

    // Program Status
    'programStatus': [],
    'programStatusDate': [],

    'caregiverId': [],
    'caregiverName': []
  };

  constructor(private route: ActivatedRoute,
              private studentService: StudentService,
              private tierTypeService: TierTypeService,
              private schoolClassTypeService: SchoolClassTypeService,
              private impairmentTypeService: ImpairmentTypeService,
              private router: Router,
              private formBuilder: FormBuilder,
              private formattingService: FormattingService,
              public _matDialog: MatDialog) {
    this.initializeForm();
    this.getTierTypeList();
    this.getSchoolLevelList();
    this.getImpairmentTypeList();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const studentId = params['id'];
        // console.log('studentId', studentId);
        this.getStudentDetail(studentId);
        // this.getRelationshipListByStudentId(studentId);
      } else {
        // Create new Person
        this.newRecord = true;
        this.student = new Student();
        this.student.studentId = null;
        setTimeout(() => {
          this.studentGivenNameInputField.nativeElement.focus();
        }, 0);
      }
    }).then();

    this.listenForDuplicateChanges();
  }

  private initializeForm(): void {
    this.studentEditForm = this.formBuilder.group({
      // Personal Information
      studentId: new FormControl(''),
      studentSurname: new FormControl('', Validators.required),
      studentGivenName: new FormControl('', Validators.required),
      studentGender: new FormControl('', Validators.required),
      studentDateOfBirth: new FormControl('', Validators.required),
      studentSchool: new FormControl(''),
      schoolLevelTypeId: new FormControl(0),
      classLevelTypeId: new FormControl(0),
      classRepeatYearTypeId: new FormControl(0),
      impairmentTypeId: new FormControl(0),
      // Program Status
      caregiverId: new FormControl(''),
      caregiverName: new FormControl(''),
    });
  }

  private getStudentDetail(studentId: number): void {
    this.studentService.getStudentDetail(studentId).subscribe(
      response => {
        this.student = response;
        console.log('getStudentDetail', response);
        // Personal Information
        this.studentEditForm.controls['studentId'].patchValue(this.student.studentId);
        this.studentEditForm.controls['studentSurname'].patchValue(this.student.studentSurname);
        this.studentEditForm.controls['studentGivenName'].patchValue(this.student.studentGivenName);
        this.studentEditForm.controls['studentGender'].patchValue(this.student.studentGender);
        this.studentEditForm.controls['studentDateOfBirth'].patchValue(this.formattingService.formatMySqlDateAsStandard(this.student.studentDateOfBirth));
        this.studentEditForm.controls['studentSchool'].patchValue(this.student.studentSchool);
        this.studentEditForm.controls['schoolLevelTypeId'].patchValue(this.student.schoolLevelTypeId);
        this.studentEditForm.controls['classRepeatYearTypeId'].patchValue(this.student.classRepeatYearTypeId);
        this.studentEditForm.controls['impairmentTypeId'].patchValue(this.student.impairmentTypeId);
        // Program Status
        this.studentEditForm.controls['caregiverId'].patchValue(this.student.caregiverId);

        this.getClassLevelList(this.student.schoolLevelTypeId);
        this.studentEditForm.controls['classLevelTypeId'].patchValue(this.student.classLevelTypeId);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getTierTypeList(): void {
    this.tierTypeService.getTierTypeList().subscribe(
      (response: TierTypeModel[]) => {
        this.tierTypeList = response;
        // console.log('response', response);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getSchoolLevelList(): void {
    this.schoolClassTypeService.getSchoolClassChildListByParentId(0).subscribe(
      (response: SchoolClassType[]) => {
        this.schoolLevelList = response;
        // console.log('response', response);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getClassLevelList(schoolLevelId: number): void {
    this.schoolClassTypeService.getSchoolClassChildListByParentId(schoolLevelId).subscribe(
      (response: SchoolClassType[]) => {
        this.classLevelList = response;
        // console.log('classLevelList', this.classLevelList);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getImpairmentTypeList(): void {
    this.impairmentTypeService.getImpairmentTypeList().subscribe(
      (response: ImpairmentType[]) => {
        this.impairmentTypeList = response;
        // console.log('response', response);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public schoolLevelIdChanged(event: any): void {
    const schoolLevelId = event.target.value;
    // console.log('schoolLevelTypeId', schoolLevelTypeId);
    this.studentEditForm.controls['classLevelTypeId'].patchValue(0);
    if (Number(schoolLevelId) === 0) {
      this.studentEditForm.get('classLevelTypeId').disable();
    } else {
      this.getClassLevelList(this.studentEditForm.get('schoolLevelTypeId').value);
      this.studentEditForm.get('classLevelTypeId').enable();
    }
  }

  private listenForDuplicateChanges(): void {
    merge(
      this.studentEditForm.controls['studentSurname'].valueChanges.pipe(debounceTime(500)),
      this.studentEditForm.controls['studentGivenName'].valueChanges.pipe(debounceTime(500)),
    ).subscribe(() => {
        const student: Student = new Student();
        student.studentGivenName = this.studentEditForm.controls['studentGivenName'].value;
        student.studentSurname = this.studentEditForm.controls['studentSurname'].value;
        this.studentService.checkDuplicateStudentRecord(student).subscribe(
          (response: Student[]) => {
            this.potentialDuplicateStudentFlag = response.length > 0;
          }
        );
      },
      error => {
        console.error('Error: ', error.message);
      },
      () => {
        console.log('complete');
      }
    );
  }

  // BUTTONS

  public save(): void {
    this.performSave();
    // if (this.potentialDuplicateStudentFlag) {
    //   console.log('h');
    //   this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
    //     disableClose: false,
    //     minWidth: '30%'
    //   });
    //   this.confirmDialogRef.componentInstance.mainButtonText = 'Yes';
    //   this.confirmDialogRef.componentInstance.dialogTitle = 'Potential Duplicate Record';
    //   this.confirmDialogRef.componentInstance.dialogMessage = 'There is already a record for a ' +
    //     this.studentEditForm.controls['studentGivenName'].value + ' ' +
    //     this.studentEditForm.controls['studentSurname'].value + '.\n' +
    //     'Do you want to create another one?';
    //   this.confirmDialogRef.afterClosed().subscribe(result => {
    //     if (result) {
    //       this.performSave();
    //     }
    //   });
    // } else {
    //   this.performSave();
    // }
  }

  private performSave(): void {
    const student = new Student();
    console.log('crudEditForm', this.studentEditForm.value);
    // Personal Information
    student.studentId = this.studentEditForm.value.studentId;
    student.studentSurname = this.studentEditForm.value.studentSurname;
    student.studentGivenName = this.studentEditForm.value.studentGivenName;
    student.studentGender = this.studentEditForm.value.studentGender;
    student.studentDateOfBirth = this.formattingService.formatStandardDateAsMySql(this.studentEditForm.value.studentDateOfBirth);
    student.studentSchool = this.studentEditForm.value.studentSchool;
    student.schoolLevelTypeId = this.studentEditForm.value.schoolLevelTypeId;
    student.classLevelTypeId = this.studentEditForm.value.classLevelTypeId;
    student.classRepeatYearTypeId = this.studentEditForm.value.classRepeatYearTypeId;
    student.impairmentTypeId = this.studentEditForm.value.impairmentTypeId;
    // Program Status
    student.caregiverId = this.studentEditForm.value.caregiverId;

    if (this.newRecord) {
      this.studentService.createStudent(student).subscribe(
        response => {
          console.log('response: ', response);
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
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete?';
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
