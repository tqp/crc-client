import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentDetailEditComponent } from './student-detail-edit/student-detail-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListAddRemoveItemsBasicModule } from '../../../../../@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../../../@tqp/modules/angular-material.module';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentRoutingModule } from './student-routing.module';
import { StudentCaregiverEditDialogComponent } from '../../relationships/student-caregiver-edit-dialog/student-caregiver-edit-dialog.component';
import { StudentProgramStatusEditDialogComponent } from '../../relationships/student-program-status-edit-dialog/student-program-status-edit-dialog.component';
import { StudentCaseManagerEditDialogComponent } from '../../relationships/student-case-manager-edit-dialog/student-case-manager-edit-dialog.component';
import { StudentSponsorEditDialogComponent } from '../../relationships/student-sponsor-edit-dialog/student-sponsor-edit-dialog.component';
import { StudentStatusEditDialogComponent } from '../../relationships/student-status-edit-dialog/student-status-edit-dialog.component';

@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailComponent,
    StudentDetailEditComponent,
    StudentCaregiverEditDialogComponent,
    StudentProgramStatusEditDialogComponent,
    StudentCaseManagerEditDialogComponent,
    StudentSponsorEditDialogComponent,
    StudentStatusEditDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    ListAddRemoveItemsBasicModule,
    FlexLayoutModule,
    StudentRoutingModule
  ]
})
export class StudentModule {
}