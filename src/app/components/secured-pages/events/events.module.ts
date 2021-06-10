import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitModule } from './visits/visit.module';
import { CsiModule } from './csi/csi.module';
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
    CsiModule,
    SponsorLetterModule
  ]
})
export class EventsModule {
}
