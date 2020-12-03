import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostGradEventTypeListComponent } from './post-grad-event-type-list/post-grad-event-type-list.component';
import { PostGradEventTypeDetailComponent } from './post-grad-event-type-detail/post-grad-event-type-detail.component';
import { PostGradEventTypeDetailEditComponent } from './post-grad-event-type-detail-edit/post-grad-event-type-detail-edit.component';
import { AngularMaterialModule } from '../../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '../../../../../@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StudentRoutingModule } from '../../people/students/student-routing.module';
import { PersonTypeRoutingModule } from '../person-type/person-type-routing.module';
import { PostGradEventTypeRoutingModule } from './post-grad-event-type-routing.module';


@NgModule({
  declarations: [
    PostGradEventTypeListComponent,
    PostGradEventTypeDetailComponent,
    PostGradEventTypeDetailEditComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    ListAddRemoveItemsBasicModule,
    FlexLayoutModule,
    PostGradEventTypeRoutingModule
  ]
})
export class PostGradEventTypeModule {
}
