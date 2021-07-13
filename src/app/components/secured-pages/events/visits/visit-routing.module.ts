import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitListComponent } from './visit-list/visit-list.component';
import { VisitDetailComponent } from './visit-detail/visit-detail.component';
import { VisitDetailEditComponent } from './visit-detail-edit/visit-detail-edit.component';
import { VisitListByCaseManagerComponent } from './visit-list-by-case-manager/visit-list-by-case-manager.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Student Visit'
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
          title: 'Student Visit List'
        }
      },
      {
        path: 'visit-list-by-case-manager',
        component: VisitListByCaseManagerComponent,
        data: {
          title: 'My Student Visit List'
        }
      },
      {
        path: 'visit-detail/:id',
        component: VisitDetailComponent,
        data: {
          title: 'Student Visit Detail'
        }
      },
      {
        path: 'visit-create',
        component: VisitDetailEditComponent,
        data: {
          title: 'Create Student Visit'
        }
      },
      {
        path: 'visit-detail-edit/:id',
        component: VisitDetailEditComponent,
        data: {
          title: 'Edit Student Visit'
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
