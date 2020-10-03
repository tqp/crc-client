import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelationListComponent } from './relation-list/relation-list.component';
import { RelationDetailComponent } from './relation-detail/relation-detail.component';
import { RelationDetailEditComponent } from './relation-detail-edit/relation-detail-edit.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Relations'
    },
    children: [
      {
        path: '',
        redirectTo: 'relation-list',
        pathMatch: 'full'
      },
      {
        path: 'relation-list',
        component: RelationListComponent,
        data: {
          title: 'Relation List'
        }
      },
      {
        path: 'relation-detail/:id',
        component: RelationDetailComponent,
        data: {
          title: 'Relation Detail'
        }
      },
      {
        path: 'relation-create',
        component: RelationDetailEditComponent,
        data: {
          title: 'Create Relation'
        }
      },
      {
        path: 'relation-detail-edit/:id',
        component: RelationDetailEditComponent,
        data: {
          title: 'Edit Relation'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelationRoutingModule {
}
