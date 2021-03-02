import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitModule } from './visit/visit.module';
import { CsiModule } from './csi/csi.module';
import { PostGradEventModule } from './post-grad-events/post-grad-event.module';
import { CaregiverWorkshopModule } from './caregiver-workshop/caregiver-workshop.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VisitModule,
    PostGradEventModule,
    CaregiverWorkshopModule,
    CsiModule
  ]
})
export class EventsModule {
}
