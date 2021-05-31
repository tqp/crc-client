import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TierTypeListComponent } from './tier-type-list/tier-type-list.component';
import { TierTypeDetailComponent } from './tier-type-detail/tier-type-detail.component';
import { TierTypeDetailEditComponent } from './tier-type-detail-edit/tier-type-detail-edit.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Tier Types'
    },
    children: [
      {
        path: '',
        redirectTo: 'tier-type-list',
        pathMatch: 'full'
      },
      {
        path: 'tier-type-list',
        component: TierTypeListComponent,
        data: {
          title: 'Tier Type List'
        }
      },
      {
        path: 'tier-type-detail/:id',
        component: TierTypeDetailComponent,
        data: {
          title: 'Tier Type Detail'
        }
      },
      {
        path: 'tier-type-create',
        component: TierTypeDetailComponent,
        data: {
          title: 'Create Tier Type'
        }
      },
      {
        path: 'tier-type-detail-edit/:id',
        component: TierTypeDetailEditComponent,
        data: {
          title: 'Edit Tier Type'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TierTypeRoutingModule {
}
