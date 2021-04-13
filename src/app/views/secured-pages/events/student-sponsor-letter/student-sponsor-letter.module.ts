import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PostGradEventRoutingModule } from '../post-grad-events/post-grad-event-routing.module';
import { StudentSponsorLetterDetailEditDialogComponent } from './student-sponsor-letter-detail-edit-dialog/student-sponsor-letter-detail-edit-dialog.component';
import { StudentSponsorLetterListComponent } from './student-sponsor-letter-list/student-sponsor-letter-list.component';


@NgModule({
  declarations: [
    StudentSponsorLetterDetailEditDialogComponent,
    StudentSponsorLetterListComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    FlexLayoutModule,
    PostGradEventRoutingModule
  ]
})
export class StudentSponsorLetterModule {
}
