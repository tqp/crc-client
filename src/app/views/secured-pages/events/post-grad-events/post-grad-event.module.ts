import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostGradEventListComponent } from './post-grad-event-list/post-grad-event-list.component';
import { PostGradEventRoutingModule } from './post-grad-event-routing.module';
import { AngularMaterialModule } from '../../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PostGradEventDetailComponent } from './post-grad-event-detail/post-grad-event-detail.component';
import { PostGradEventDetailEditComponent } from './post-grad-event-detail-edit/post-grad-event-detail-edit.component';
import { PostGradEventDetailEditDialogComponent } from './post-grad-event-detail-edit-dialog/post-grad-event-detail-edit-dialog.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    PostGradEventListComponent,
    PostGradEventDetailComponent,
    PostGradEventDetailEditComponent,
    PostGradEventDetailEditDialogComponent
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
export class PostGradEventModule {
}
