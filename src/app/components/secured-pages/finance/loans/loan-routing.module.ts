import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanListComponent } from './loan-list/loan-list.component';
import { SponsorDetailComponent } from '../../people/sponsors/sponsor-detail/sponsor-detail.component';
import { SponsorDetailEditComponent } from '../../people/sponsors/sponsor-detail-edit/sponsor-detail-edit.component';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { LoanDetailEditComponent } from './loan-detail-edit/loan-detail-edit.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Loans'
    },
    children: [
      {
        path: '',
        redirectTo: 'loan-list',
        pathMatch: 'full'
      },
      {
        path: 'loan-list',
        component: LoanListComponent,
        data: {
          title: 'Loans'
        }
      },
      {
        path: 'loan-detail/:id',
        component: LoanDetailComponent,
        data: {
          title: 'Loan Detail'
        }
      },
      {
        path: 'loan-create',
        component: LoanDetailComponent,
        data: {
          title: 'Create Loan'
        }
      },
      {
        path: 'loan-detail-edit/:id',
        component: LoanDetailEditComponent,
        data: {
          title: 'Edit Loan'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule {
}
