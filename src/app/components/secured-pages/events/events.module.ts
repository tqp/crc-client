import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitModule } from './visits/visit.module';
import { CsiRecordModule } from './csi_record/csi-record.module';
import { PostGradEventModule } from './post-grad-events/post-grad-event.module';
import { CaregiverWorkshopModule } from './caregiver-workshop/caregiver-workshop.module';
import { CaseManagerQualificationModule } from './case-manager-qualifications/case-manager-qualification.module';
import { SponsorLetterModule } from './sponsor-letters/sponsor-letter.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
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
