import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitModule } from './visits/visit.module';
import { CsiRecordModule } from './csi_record/csi-record.module';
import { PostGradEventModule } from './post-grad-events/post-grad-event.module';
import { CaregiverWorkshopModule } from './caregiver-workshop/caregiver-workshop.module';
import { CaseManagerQualificationModule } from './case-manager-qualifications/case-manager-qualification.module';
import { SponsorLetterModule } from './sponsor-letters/sponsor-letter.module';
import { ProgramStatusEditDialogComponent } from './program-status/program-status-edit-dialog/program-status-edit-dialog.component';
import { AngularMaterialModule } from '../../../../@tqp/modules/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [ProgramStatusEditDialogComponent],
  imports: [
    AngularMaterialModule,
    BsDatepickerModule.forRoot(),
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    // Custom Modules
    VisitModule,
    PostGradEventModule,
    CaregiverWorkshopModule,
    CaseManagerQualificationModule,
    CsiRecordModule,
    SponsorLetterModule
  ]
})
export class EventsModule {
}
