import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostGradEventTypeListComponent } from './post-grad-event-type-list/post-grad-event-type-list.component';
import { PostGradEventTypeDetailComponent } from './post-grad-event-type-detail/post-grad-event-type-detail.component';
import { PostGradEventTypeDetailEditComponent } from './post-grad-event-type-detail-edit/post-grad-event-type-detail-edit.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Post Grad Event Type'
    },
    children: [
      {
        path: '',
        redirectTo: 'post-grad-event-type-list',
        pathMatch: 'full'
      },
      {
        path: 'post-grad-event-type-list',
        component: PostGradEventTypeListComponent,
        data: {
          title: ' Post-Graduate Event Type List'
        }
      },
      {
        path: 'post-grad-event-type-detail/:id',
        component: PostGradEventTypeDetailComponent,
        data: {
          title: ' Post-Graduate Event Type Detail'
        }
      },
      {
        path: 'post-grad-event-type-create',
        component: PostGradEventTypeDetailEditComponent,
        data: {
          title: 'Create Post-Graduate Event Type'
        }
      },
      {
        path: 'post-grad-event-detail-edit/:id',
        component: PostGradEventTypeDetailEditComponent,
        data: {
          title: 'Edit Post-Graduate Event Type'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostGradTypeRoutingModule {
}
