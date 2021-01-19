import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseManagerRevisedListComponent } from './case-manager-revised-list/case-manager-revised-list.component';
import { CaseManagerRevisedDetailComponent } from './case-manager-revised-detail/case-manager-revised-detail.component';
import { CaseManagerRevisedDetailEditComponent } from './case-manager-revised-detail-edit/case-manager-revised-detail-edit.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Case Managers'
    },
    children: [
      {
        path: '',
        redirectTo: 'case-manager-list',
        pathMatch: 'full'
      },
      {
        path: 'case-manager-revised-list',
        component: CaseManagerRevisedListComponent,
        data: {
          title: 'Case Manager List'
        }
      },
      {
        path: 'case-manager-revised-detail/:id',
        component: CaseManagerRevisedDetailComponent,
        data: {
          title: 'Case Manager Detail'
        }
      },
      {
        path: 'case-manager-revised-create',
        component: CaseManagerRevisedDetailEditComponent,
        data: {
          title: 'Create Case Manager'
        }
      },
      {
        path: 'case-manager-revised-detail-edit/:id',
        component: CaseManagerRevisedDetailEditComponent,
        data: {
          title: 'Edit Case Manager'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseManagerRevisedRoutingModule {
}
