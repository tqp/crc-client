import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RelationshipTypeListComponent} from './relationship-type-list/relationship-type-list.component';
import {RelationshipTypeDetailComponent} from './relationship-type-detail/relationship-type-detail.component';
import {RelationshipTypeDetailEditComponent} from './relationship-type-detail-edit/relationship-type-detail-edit.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Relationship Type'
    },
    children: [
      {
        path: '',
        redirectTo: 'relationship-type-list',
        pathMatch: 'full'
      },
      {
        path: 'relationship-type-list',
        component: RelationshipTypeListComponent,
        data: {
          title: 'Relationship Type List'
        }
      },
      {
        path: 'relationship-type-detail/:id',
        component: RelationshipTypeDetailComponent,
        data: {
          title: 'Relationship Type Detail'
        }
      },
      {
        path: 'relationship-type-create',
        component: RelationshipTypeDetailEditComponent,
        data: {
          title: 'Create Relationship Type'
        }
      },
      {
        path: 'relationship-type-detail-edit/:id',
        component: RelationshipTypeDetailEditComponent,
        data: {
          title: 'Edit Relationship Type'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelationshipTypeRoutingModule {
}
