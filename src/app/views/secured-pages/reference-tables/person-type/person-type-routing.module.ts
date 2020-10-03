import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonTypeListComponent} from './person-type-list/person-type-list.component';
import {PersonTypeDetailComponent} from './person-type-detail/person-type-detail.component';
import {PersonTypeDetailEditComponent} from './person-type-detail-edit/person-type-detail-edit.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Person Type'
    },
    children: [
      {
        path: '',
        redirectTo: 'person-type-list',
        pathMatch: 'full'
      },
      {
        path: 'person-type-list',
        component: PersonTypeListComponent,
        data: {
          title: 'Person Type List'
        }
      },
      {
        path: 'person-type-detail/:id',
        component: PersonTypeDetailComponent,
        data: {
          title: 'Person Type Detail'
        }
      },
      {
        path: 'person-type-create',
        component: PersonTypeDetailEditComponent,
        data: {
          title: 'Create Person Type'
        }
      },
      {
        path: 'caregiver-detail-edit/:id',
        component: PersonTypeDetailEditComponent,
        data: {
          title: 'Edit Caregiver'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonTypeRoutingModule {
}
