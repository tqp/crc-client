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
import { Relationship } from '../../../relationships/Relationship';
import { StudentCaregiverEditDialogComponent } from '../../../relationships/student-caregiver-edit-dialog/student-caregiver-edit-dialog.component';
import { StudentProgramStatusEditDialogComponent } from '../../../relationships/student-program-status-edit-dialog/student-program-status-edit-dialog.component';
import { StudentCaseManagerEditDialogComponent } from '../../../relationships/student-case-manager-edit-dialog/student-case-manager-edit-dialog.component';
import { StudentSponsorEditDialogComponent } from '../../../relationships/student-sponsor-edit-dialog/student-sponsor-edit-dialog.component';
import { SchoolClassTypeService } from '../../../reference-tables/school-class-type/school-class-type.service';
import { SchoolClassType } from '../../../reference-tables/school-class-type/SchoolClassType';
import { ImpairmentType } from '../../../reference-tables/impairment-type/ImpairmentType';
import { ImpairmentTypeService } from '../../../reference-tables/impairment-type/impairment-type.service';

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
  public schoolLevelList: SchoolClassType[];
  public classLevelList: SchoolClassType[];
  public impairmentTypeList: ImpairmentType[];
  public studentEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

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
    'studentDateOfBirth': [],
    'studentSchool': [],
    'schoolLevelId': [],
    'classLevelId': [],
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
          this.studentSurnameInputField.nativeElement.focus();
        }, 0);
      }
    }).then();
  }

  private initializeForm(): void {
    this.studentEditForm = this.formBuilder.group({
      // Personal Information
      studentId: new FormControl(''),
      studentSurname: new FormControl('', Validators.required),
      studentGivenName: new FormControl('', Validators.required),
      studentGender: new FormControl('', Validators.required),
      studentDateOfBirth: new FormControl(''),
      studentSchool: new FormControl(''),
      schoolLevelId: new FormControl(''),
      classLevelId: new FormControl(''),
      impairmentTypeId: new FormControl(''),
      // Program Status
      caregiverId: new FormControl(''),
      caregiverName: new FormControl(''),
    });
  }

  private getStudentDetail(studentId: number): void {
    this.studentService.getStudentDetail(studentId).subscribe(
      response => {
        this.student = response;
        // console.log('getStudentDetail', response);
        // Personal Information
        this.studentEditForm.controls['studentId'].patchValue(this.student.studentId);
        this.studentEditForm.controls['studentSurname'].patchValue(this.student.studentSurname);
        this.studentEditForm.controls['studentGivenName'].patchValue(this.student.studentGivenName);
        this.studentEditForm.controls['studentGender'].patchValue(this.student.studentGender);
        this.studentEditForm.controls['studentDateOfBirth'].patchValue(this.formattingService.formatMySqlDateAsStandard(this.student.studentDateOfBirth));
        this.studentEditForm.controls['studentSchool'].patchValue(this.student.studentSchool);
        this.studentEditForm.controls['schoolLevelId'].patchValue(this.student.schoolLevelId);
        this.studentEditForm.controls['impairmentTypeId'].patchValue(this.student.impairmentTypeId);
        // Program Status
        this.studentEditForm.controls['caregiverId'].patchValue(this.student.caregiverId);

        this.getClassLevelList(this.student.schoolLevelId);
        this.studentEditForm.controls['classLevelId'].patchValue(this.student.classLevelId);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // private getRelationshipListByStudentId(studentId: number): void {
  //   this.relationshipService.getRelationshipListByStudentId(studentId).subscribe(
  //     (relationshipList: Relationship[]) => {
  //       // console.log('relationshipList', relationshipList);
  //       this.records = [];
  //       relationshipList.forEach(item => {
  //         this.records.push(item);
  //       });
  //       this.dataSource = this.records;
  //     },
  //     error => {
  //       console.error('Error: ', error);
  //     }
  //   );
  // }

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
    // console.log('schoolLevelId', schoolLevelId);
    this.studentEditForm.controls['classLevelId'].patchValue(0);
    if (Number(schoolLevelId) === 0) {
      this.studentEditForm.get('classLevelId').disable();
    } else {
      this.getClassLevelList(this.studentEditForm.get('schoolLevelId').value);
      this.studentEditForm.get('classLevelId').enable();
    }
  }

  // DIALOGS

  public openStudentProgramStatusEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'create',
      studentId: this.student.studentId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(StudentProgramStatusEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      console.log('dialogClose', dialogData);
    });
  }

  public openStudentCaregiverEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'create',
      studentId: this.student.studentId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(StudentCaregiverEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      console.log('dialogClose', dialogData);
      console.log('studentId', this.student.studentId);
      // const relationship: Relationship = {};
      // relationship.relationshipTypeId = 13; // Caregiver
      // relationship.studentId = this.student.studentId;
      // relationship.personId = dialogData.caregiverId;
      // relationship.relationshipComments = 'Meow';
      // this.relationshipService.createCaregiverRelationship(relationship);
    });
  }

  public openStudentCaseManagerEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'create',
      studentId: this.student.studentId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(StudentCaseManagerEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      console.log('dialogClose', dialogData);
      console.log('studentId', this.student.studentId);
      // const relationship: Relationship = {};
      // relationship.relationshipTypeId = 14; // Sponsor
      // relationship.studentId = this.student.studentId;
      // relationship.personId = dialogData.caregiverId;
      // relationship.relationshipComments = 'Meow';
      // this.relationshipService.createCaregiverRelationship(relationship);
    });
  }

  public openStudentSponsorEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'create',
      studentId: this.student.studentId
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(StudentSponsorEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      console.log('dialogClose', dialogData);
    });
  }

  // BUTTONS

  public save(): void {
    const student = new Student();
    // console.log('crudEditForm', this.studentEditForm.value);
    // Personal Information
    student.studentId = this.studentEditForm.value.studentId;
    student.studentSurname = this.studentEditForm.value.studentSurname;
    student.studentGivenName = this.studentEditForm.value.studentGivenName;
    student.studentGender = this.studentEditForm.value.studentGender;
    student.studentDateOfBirth = this.formattingService.formatStandardDateAsMySql(this.studentEditForm.value.studentDateOfBirth);
    student.studentSchool = this.studentEditForm.value.studentSchool;
    student.schoolLevelId = this.studentEditForm.value.schoolLevelId;
    student.classLevelId = this.studentEditForm.value.classLevelId;
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
