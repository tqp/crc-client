import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostGradEventDetailEditComponent } from './post-grad-event-detail-edit/post-grad-event-detail-edit.component';
import { PostGradEventDetailComponent } from './post-grad-event-detail/post-grad-event-detail.component';
import { PostGradEventListComponent } from './post-grad-event-list/post-grad-event-list.component';


const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Post-Grad Event'
    },
    children: [
      {
        path: '',
        redirectTo: 'post-grad-event-list',
        pathMatch: 'full'
      },
      {
        path: 'post-grad-event-list',
        component: PostGradEventListComponent,
        data: {
          title: 'Post-Grad Event List'
        }
      },
      {
        path: 'post-grad-event-detail/:id',
        component: PostGradEventDetailComponent,
        data: {
          title: 'Post-Grad Event Detail'
        }
      },
      {
        path: 'post-grad-event-create',
        component: PostGradEventDetailEditComponent,
        data: {
          title: 'Create Post-Grad Event'
        }
      },
      {
        path: 'post-grad-event-detail-edit/:id',
        component: PostGradEventDetailEditComponent,
        data: {
          title: 'Edit Post-Grad Event'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostGradEventRoutingModule {
}
