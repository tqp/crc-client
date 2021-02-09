import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseManagerDetailEditComponent } from './case-manager-detail-edit/case-manager-detail-edit.component';
import { CaseManagerDetailComponent } from './case-manager-detail/case-manager-detail.component';
import { CaseManagerListComponent } from './case-manager-list/case-manager-list.component';
import { CaseManagerCreateComponent } from './case-manager-create/case-manager-create.component';

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
        path: 'case-manager-list',
        component: CaseManagerListComponent,
        data: {
          title: 'Case Manager List'
        }
      },
      {
        path: 'case-manager-detail/:id',
        component: CaseManagerDetailComponent,
        data: {
          title: 'Case Manager Detail'
        }
      },
      {
        path: 'case-manager-create',
        component: CaseManagerCreateComponent,
        data: {
          title: 'Create Case Manager'
        }
      },
      {
        path: 'case-manager-detail-edit/:id',
        component: CaseManagerDetailEditComponent,
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
export class CaseManagerRoutingModule {
}
