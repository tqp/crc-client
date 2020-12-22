import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitModule } from './visit/visit.module';
import { CsiModule } from './csi/csi.module';
import { PostGradEventModule } from './post-grad-events/post-grad-event.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VisitModule,
    PostGradEventModule,
    CsiModule
  ]
})
export class EventsModule {
}
