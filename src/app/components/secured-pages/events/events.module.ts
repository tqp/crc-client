import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitModule } from './visits/visit.module';
import { CsiModule } from './csi/csi.module';
import { PostGradEventModule } from './post-grad-events/post-grad-event.module';
import { CaregiverWorkshopModule } from './caregiver-workshop/caregiver-workshop.module';
import { CaseManagerQualificationModule } from './case-manager-qualifications/case-manager-qualification.module';
import { StudentSponsorLetterModule } from './student-sponsor-letter/student-sponsor-letter.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VisitModule,
    PostGradEventModule,
    CaregiverWorkshopModule,
    CaseManagerQualificationModule,
    CsiModule,
    StudentSponsorLetterModule
  ]
})
export class EventsModule {
}