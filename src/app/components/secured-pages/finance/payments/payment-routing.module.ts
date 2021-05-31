import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { LoanDetailComponent } from '../loans/loan-detail/loan-detail.component';
import { LoanDetailEditComponent } from '../loans/loan-detail-edit/loan-detail-edit.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { PaymentDetailEditComponent } from './payment-detail-edit/payment-detail-edit.component';


const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Payments'
    },
    children: [
      {
        path: '',
        redirectTo: 'payment-list',
        pathMatch: 'full'
      },
      {
        path: 'payment-list',
        component: PaymentListComponent,
        data: {
          title: 'Payments'
        }
      },
      {
        path: 'payment-detail/:id',
        component: PaymentDetailComponent,
        data: {
          title: 'Payment Detail'
        }
      },
      {
        path: 'payment-create',
        component: PaymentDetailComponent,
        data: {
          title: 'Create Payment'
        }
      },
      {
        path: 'payment-detail-edit/:id',
        component: PaymentDetailEditComponent,
        data: {
          title: 'Edit Payment'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {
}
