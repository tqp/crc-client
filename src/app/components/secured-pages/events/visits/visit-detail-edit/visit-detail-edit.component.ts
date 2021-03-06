import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Visit } from '../../../../../models/visit.model';
import { VisitService } from '../../../../../services/events/visit.service';
import { FormattingService } from '@tqp/services/formatting.service';
import { VisitTypeService } from '../../../../../services/reference-tables/visit-type.service';
import { InteractionTypeService } from '../../../../../services/reference-tables/interaction-type.service';
import { InteractionType } from '../../../../../models/types/type-interaction.model';
import { VisitTypeModel } from '../../../../../models/types/type-visit.model';
import { CaseManager } from '../../../../../models/people/case-manager.model';
import { CaseManagerService } from '../../../../../services/people/case-manager.service';
import { Student } from '../../../../../models/people/student.model';
import { StudentService } from '../../../../../services/people/student.service';

@Component({
  selector: 'app-visit-detail-edit',
  templateUrl: './visit-detail-edit.component.html',
  styleUrls: ['./visit-detail-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VisitDetailEditComponent implements OnInit {
  @ViewChild('visitSurnameInputField', {static: false}) visitSurnameInputField: ElementRef;
  public pageSource: string;
  public newRecord: boolean;
  public visit: Visit;
  public visitEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  public visitTypeList: VisitTypeModel[];
  public interactionTypeList: InteractionType[];
  public caseManagerList: CaseManager[];
  public studentList: Student[];

  public validationMessages = {
    'studentId': [
      {type: 'required', message: 'A Student is required.'}
    ],
    'caseManagerUserId': [
      {type: 'required', message: 'A Case Manager is required.'}
    ],
    'visitId': [
      {type: 'required', message: 'An Student Visit ID is required.'}
    ],
    'visitDate': [
      {type: 'required', message: 'A Visit Date is required.'}
    ],
    'visitTypeId': [
      {type: 'required', message: 'A Visit Type is required.'}
    ],
    'interactionTypeId': [
      {type: 'required', message: 'An Interaction Type is required.'}
    ],
    'caregiverComments': [],
    'caseManagerComments': []
  };

  constructor(private route: ActivatedRoute,
              private visitService: VisitService,
              private visitTypeService: VisitTypeService,
              private caseManagerService: CaseManagerService,
              private studentService: StudentService,
              private interactionTypeService: InteractionTypeService,
              private formattingService: FormattingService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.initializeForm();
    this.getStudentList();
    this.getCaseManagerList();
    this.getVisitTypeList();
    this.getInteractionTypeList();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const visitId = params['id'];
        this.newRecord = false;
        // console.log('visitId', visitId);
        this.getVisitDetail(visitId);
      } else {
        // Create new Person
        this.newRecord = true;
        this.visit = new Visit();
        this.visit.visitId = null;
        setTimeout(() => {
          this.visitSurnameInputField.nativeElement.focus();
        }, 0);
      }
    }).then();
  }

  private initializeForm(): void {
    this.visitEditForm = this.formBuilder.group({
      studentId: new FormControl({value: 0, disabled: true}, Validators.required),
      caseManagerUserId: new FormControl('', Validators.required),
      visitId: new FormControl('', Validators.required),
      visitDate: new FormControl('', Validators.required),
      visitTypeId: new FormControl('', Validators.required),
      interactionTypeId: new FormControl('', Validators.required),
      caregiverComments: new FormControl('', Validators.required),
      caseManagerComments: new FormControl('', Validators.required)
    });
  }

  private getVisitDetail(visitId: number): void {
    this.visitService.getVisitDetail(visitId).subscribe(
      response => {
        this.visit = response;
        // console.log('response', response);
        this.visitEditForm.controls['studentId'].patchValue(this.visit.studentId);
        this.visitEditForm.controls['caseManagerUserId'].patchValue(this.visit.caseManagerUserId);
        this.visitEditForm.controls['visitId'].patchValue(this.visit.visitId);
        this.visitEditForm.controls['visitDate'].patchValue(this.formattingService.formatMySqlDateAsStandard(this.visit.visitDate));
        this.visitEditForm.controls['visitTypeId'].patchValue(this.visit.visitTypeId);
        this.visitEditForm.controls['interactionTypeId'].patchValue(this.visit.interactionTypeId);
        this.visitEditForm.controls['caregiverComments'].patchValue(this.visit.caregiverComments);
        this.visitEditForm.controls['caseManagerComments'].patchValue(this.visit.caseManagerComments);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getStudentList(): void {
    this.studentService.getStudentList().subscribe(
      (response: Student[]) => {
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
      (response: CaseManager[]) => {
        // console.log('response', response);
        this.caseManagerList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getVisitTypeList(): void {
    this.visitTypeService.getVisitTypeList().subscribe(
      (response: VisitTypeModel[]) => {
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
        console.log('response', response);
        this.interactionTypeList = response;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public delete(visitId: number): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.visitService.deleteVisit(visitId).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['visits/visit-list']).then();
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
    const visit = new Visit();
    // console.log('crudEditForm', this.visitEditForm.value);
    visit.visitId = this.visitEditForm.value.visitId;
    visit.caseManagerUserId = this.visitEditForm.value.caseManagerUserId;
    visit.visitDate = this.formattingService.formatStandardDateAsMySql(this.visitEditForm.value.visitDate);
    visit.visitTypeId = this.visitEditForm.value.visitTypeId;
    visit.interactionTypeId = this.visitEditForm.value.interactionTypeId;
    visit.caregiverComments = this.visitEditForm.value.caregiverComments;
    visit.caseManagerComments = this.visitEditForm.value.caseManagerComments;

    if (this.newRecord) {
      this.visitService.createVisit(visit).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['visits/visit-detail', response.visitId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.visitService.updateVisit(visit).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['visits/visit-detail', response.visitId]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.visit.visitId) {
      this.router.navigate(['visits/visit-detail', this.visit.visitId]).then();
    } else {
      this.router.navigate(['visits/visit-list']).then();
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
      this.delete(this.visit.visitId);
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
