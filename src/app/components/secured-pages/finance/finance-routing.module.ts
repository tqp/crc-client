import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceReportByParticipantComponent } from './reports/finance-report-by-participant/finance-report-by-participant.component';
import { FinanceReportByPaymentPeriodComponent } from './reports/finance-report-by-payment-period/finance-report-by-payment-period.component';
import { PaymentListComponent } from './payments/payment-list/payment-list.component';
import { LoanListComponent } from './loans/loan-list/loan-list.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Finance'
    },
    children: [
      {
        path: '',
        redirectTo: 'summary-by-participant',
        pathMatch: 'full'
      },
      {
        path: 'summary-by-participant',
        component: FinanceReportByParticipantComponent,
        data: {
          title: 'Summary by Participant'
        }
      },
      {
        path: 'summary-by-payment-period',
        component: FinanceReportByPaymentPeriodComponent,
        data: {
          title: 'Summary by Payment Period'
        }
      },
      {
        path: 'payment-list',
        component: PaymentListComponent,
        data: {
          title: 'Payments'
        }
      },
      {
        path: 'loan-list',
        component: LoanListComponent,
        data: {
          title: 'Loans'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule {
}
