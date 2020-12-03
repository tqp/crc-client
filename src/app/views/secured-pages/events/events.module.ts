import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitModule } from './visit/visit.module';
import { CsiModule } from './csi/csi.module';
import { PostGradEventDetailComponent } from './post-grad-event/post-grad-event-detail/post-grad-event-detail.component';
import { PostGradEventDetailEditComponent } from './post-grad-event/post-grad-event-detail-edit/post-grad-event-detail-edit.component';
import { PostGradEventDetailEditDialogComponent } from './post-grad-event/post-grad-event-detail-edit-dialog/post-grad-event-detail-edit-dialog.component';
import { PostGradEventModule } from './post-grad-event/post-grad-event.module';


@NgModule({
  declarations: [PostGradEventDetailComponent, PostGradEventDetailEditComponent, PostGradEventDetailEditDialogComponent],
  imports: [
    CommonModule,
    VisitModule,
    PostGradEventModule,
    CsiModule
  ]
})
export class EventsModule {
}
