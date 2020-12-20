import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostGradEventListComponent } from './post-grad-event-list/post-grad-event-list.component';
import { PostGradEventRoutingModule } from './post-grad-event-routing.module';
import { AngularMaterialModule } from '../../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [PostGradEventListComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    PostGradEventRoutingModule
  ]
})
export class PostGradEventModule {
}
