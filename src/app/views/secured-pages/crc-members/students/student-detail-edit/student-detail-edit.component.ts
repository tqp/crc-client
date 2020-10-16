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
import { StudentRelationshipEditDialogComponent } from '../student-relationship-edit-dialog/student-relationship-edit-dialog.component';
import { Relationship } from '../Relationship';
import { RelationshipService } from '../../relations/relationship.service';
import { StudentCaregiverEditDialogComponent } from '../student-caregiver-edit-dialog/student-caregiver-edit-dialog.component';
import { StudentProgramStatusEditDialogComponent } from '../student-program-status-edit-dialog/student-program-status-edit-dialog.component';
import { StudentCaseManagerEditDialogComponent } from '../student-case-manager-edit-dialog/student-case-manager-edit-dialog.component';
import { StudentSponsorEditDialogComponent } from '../student-sponsor-edit-dialog/student-sponsor-edit-dialog.component';

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
    'studentGrade': [],
    'studentSchool': [],
    'studentAddress': [],
    'studentPhone': [],
    'tierTypeId': [
      {type: 'required', message: 'A Support Tier is required'}
    ],

    // Program Status
    'programStatus': [],
    'programStatusDate': [],

    'caregiverId': [],
    'caregiverName': []
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
      if (params['id'] !== undefined) {
        const studentId = params['id'];
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
      // Personal Information
      studentId: new FormControl(''),
      studentSurname: new FormControl('', Validators.required),
      studentGivenName: new FormControl('', Validators.required),
      studentGender: new FormControl('', Validators.required),
      studentDateOfBirth: new FormControl(''),
      studentSchool: new FormControl(''),
      studentGrade: new FormControl(''),
      studentAddress: new FormControl(''),
      studentPhone: new FormControl(''),
      tierTypeId: new FormControl('', Validators.required),
      // Program Status
      caregiverId: new FormControl(''),
      caregiverName: new FormControl(''),
    });
  }

  private getStudentDetail(id: number): void {
    this.studentService.getStudentDetail(id).subscribe(
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
        this.studentEditForm.controls['studentGrade'].patchValue(this.student.studentGrade);
        this.studentEditForm.controls['studentAddress'].patchValue(this.student.studentAddress);
        this.studentEditForm.controls['studentPhone'].patchValue(this.student.studentPhone);
        this.studentEditForm.controls['tierTypeId'].patchValue(this.student.tierTypeId);
        // Program Status
        this.studentEditForm.controls['caregiverId'].patchValue(this.student.caregiverId);
        this.studentEditForm.controls['caregiverName'].patchValue(this.student.caregiverName);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getRelationshipListByStudentId(studentId: number): void {
    this.relationshipService.getRelationshipListByStudentId(studentId).subscribe(
      (relationshipList: Relationship[]) => {
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
      const relationship: Relationship = {};
      relationship.relationshipTypeId = 13; // Caregiver
      relationship.studentId = this.student.studentId;
      relationship.personId = dialogData.caregiverId;
      relationship.relationshipComments = 'Meow';
      this.relationshipService.createCaregiverRelationship(relationship);
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
      const relationship: Relationship = {};
      relationship.relationshipTypeId = 14; // Sponsor
      relationship.studentId = this.student.studentId;
      relationship.personId = dialogData.caregiverId;
      relationship.relationshipComments = 'Meow';
      this.relationshipService.createCaregiverRelationship(relationship);
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
    student.studentGrade = this.studentEditForm.value.studentGrade;
    student.studentAddress = this.studentEditForm.value.studentAddress;
    student.studentPhone = this.studentEditForm.value.studentPhone;
    student.tierTypeId = this.studentEditForm.value.tierTypeId;
    // Program Status
    student.caregiverId = this.studentEditForm.value.caregiverId;
    student.caregiverName = this.studentEditForm.value.caregiverName;

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
