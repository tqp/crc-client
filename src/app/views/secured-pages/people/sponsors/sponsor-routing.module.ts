import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsorListComponent } from './sponsor-list/sponsor-list.component';
import { SponsorDetailComponent } from './sponsor-detail/sponsor-detail.component';
import { SponsorDetailEditComponent } from './sponsor-detail-edit/sponsor-detail-edit.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Sponsors'
    },
    children: [
      {
        path: '',
        redirectTo: 'sponsor-list',
        pathMatch: 'full'
      },
      {
        path: 'sponsor-list',
        component: SponsorListComponent,
        data: {
          title: 'Sponsor List'
        }
      },
      {
        path: 'sponsor-detail/:id',
        component: SponsorDetailComponent,
        data: {
          title: 'Sponsor Detail'
        }
      },
      {
        path: 'sponsor-create',
        component: SponsorDetailEditComponent,
        data: {
          title: 'Create Sponsor'
        }
      },
      {
        path: 'sponsor-detail-edit/:id',
        component: SponsorDetailEditComponent,
        data: {
          title: 'Edit Sponsor'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorRoutingModule {
}
