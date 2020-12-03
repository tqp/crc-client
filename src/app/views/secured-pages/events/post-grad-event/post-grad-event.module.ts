import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostGradEventListComponent } from './post-grad-event-list/post-grad-event-list.component';
import { PostGradEventRoutingModule } from './post-grad-event-routing.module';



@NgModule({
  declarations: [PostGradEventListComponent],
  imports: [
    CommonModule,
    PostGradEventRoutingModule
  ]
})
export class PostGradEventModule { }
