import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentCaregiverEditDialogComponent } from './student-caregiver-edit-dialog/student-caregiver-edit-dialog.component';
import { StudentProgramStatusEditDialogComponent } from './student-program-status-edit-dialog/student-program-status-edit-dialog.component';
import { StudentCaseManagerEditDialogComponent } from './student-case-manager-edit-dialog/student-case-manager-edit-dialog.component';
import { StudentSponsorEditDialogComponent } from './student-sponsor-edit-dialog/student-sponsor-edit-dialog.component';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StudentRoutingModule } from '../people/students/student-routing.module';


@NgModule({
  declarations: [
    StudentCaregiverEditDialogComponent,
    StudentProgramStatusEditDialogComponent,
    StudentCaseManagerEditDialogComponent,
    StudentSponsorEditDialogComponent
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
export class RelationshipsModule {
}
