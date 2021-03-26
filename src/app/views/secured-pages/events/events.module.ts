import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitModule } from './visit/visit.module';
import { CsiModule } from './csi/csi.module';
import { PostGradEventModule } from './post-grad-events/post-grad-event.module';
import { CaregiverWorkshopModule } from './caregiver-workshop/caregiver-workshop.module';
import { CaseManagerQualificationModule } from './case-manager-qualifications/case-manager-qualification.module';
import { StudentSponsorLetterComponent } from './student-sponsor-letter/student-sponsor-letter.component';


@NgModule({
  declarations: [StudentSponsorLetterComponent],
  imports: [
    CommonModule,
    VisitModule,
    PostGradEventModule,
    CaregiverWorkshopModule,
    CaseManagerQualificationModule,
    CsiModule
  ]
})
export class EventsModule {
}
