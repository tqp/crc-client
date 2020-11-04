import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitListComponent } from './visit-list/visit-list.component';
import { VisitDetailComponent } from './visit-detail/visit-detail.component';
import { VisitDetailEditComponent } from './visit-detail-edit/visit-detail-edit.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Visit'
    },
    children: [
      {
        path: '',
        redirectTo: 'visit-list',
        pathMatch: 'full'
      },
      {
        path: 'visit-list',
        component: VisitListComponent,
        data: {
          title: 'Visit List'
        }
      },
      {
        path: 'visit-detail/:id',
        component: VisitDetailComponent,
        data: {
          title: 'Visit Detail'
        }
      },
      {
        path: 'visit-create',
        component: VisitDetailEditComponent,
        data: {
          title: 'Create Visit'
        }
      },
      {
        path: 'visit-detail-edit/:id',
        component: VisitDetailEditComponent,
        data: {
          title: 'Edit Visit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitRoutingModule {
}
