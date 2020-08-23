import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from '../../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Student } from '../Student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-detail-edit',
  templateUrl: './student-detail-edit.component.html',
  styleUrls: ['./student-detail-edit.component.css']
})
export class StudentDetailEditComponent implements OnInit {
  @ViewChild('studentSurnameInputField', {static: false}) studentSurnameInputField: ElementRef;
  public pageSource: string;
  public newRecord: boolean;
  public student: Student;
  public studentEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  public validationMessages = {
    'studentGuid': [
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
    ]
  };

  constructor(private route: ActivatedRoute,
              private studentService: StudentService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const studentGuid = params['guid'];
        // console.log('studentGuid', studentGuid);
        this.getStudentDetail(studentGuid);
      } else {
        // Create new Person
        this.newRecord = true;
        this.student = new Student();
        this.student.studentGuid = null;
        setTimeout(() => {
          this.studentSurnameInputField.nativeElement.focus();
        }, 0);
      }
    }).then();
  }

  private initializeForm(): void {
    this.studentEditForm = this.formBuilder.group({
      studentGuid: new FormControl(''),
      studentSurname: new FormControl('', Validators.required),
      studentGivenName: new FormControl('', Validators.required),
      studentGender: new FormControl('', Validators.required),
    });
  }

  private getStudentDetail(guid: string): void {
    this.studentService.getStudentDetail(guid).subscribe(
      response => {
        this.student = response;
        // console.log('response', response);
        this.studentEditForm.controls['studentGuid'].patchValue(this.student.studentGuid);
        this.studentEditForm.controls['studentSurname'].patchValue(this.student.studentSurname);
        this.studentEditForm.controls['studentGivenName'].patchValue(this.student.studentGivenName);
        this.studentEditForm.controls['studentGender'].patchValue(this.student.studentGender);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public delete(studentGuid: string): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.deleteStudent(studentGuid).subscribe(
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

  public save(): void {
    const student = new Student();
    // console.log('crudEditForm', this.studentEditForm.value);
    student.studentGuid = this.studentEditForm.value.studentGuid;
    student.studentSurname = this.studentEditForm.value.studentSurname;
    student.studentGivenName = this.studentEditForm.value.studentGivenName;
    student.studentGender = this.studentEditForm.value.studentGender;

    if (this.newRecord) {
      this.studentService.createStudent(student).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['students/student-detail', response.studentGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.studentService.updateStudent(student).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['students/student-detail', response.studentGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.student.studentGuid) {
      this.router.navigate(['students/student-detail', this.student.studentGuid]).then();
    } else {
      this.router.navigate(['students/student-list']).then();
    }
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.save();
    }
    if (event.key === 'Escape') {
      this.cancel();
    }
    if (event.ctrlKey && event.key === 'd') {
      event.preventDefault();
      this.delete(this.student.studentGuid);
    }
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      this.save();
    }
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault();
      this.cancel();
    }
  }

}
