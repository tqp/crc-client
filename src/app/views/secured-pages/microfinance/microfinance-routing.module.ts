import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MicrofinanceSummaryComponent } from './microfinance-summary/microfinance-summary.component';
import { MicrofinanceByParticipantComponent } from './microfinance-by-participant/microfinance-by-participant.component';
import { MicrofinanceByPaymentPeriodComponent } from './microfinance-by-payment-period/microfinance-by-payment-period.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Microfinance'
    },
    children: [
      {
        path: '',
        redirectTo: 'summary-by-participant',
        pathMatch: 'full'
      },
      {
        path: 'summary-by-participant',
        component: MicrofinanceByParticipantComponent,
        data: {
          title: 'Summary by Participant'
        }
      },
      {
        path: 'summary-by-payment-period',
        component: MicrofinanceByPaymentPeriodComponent,
        data: {
          title: 'Summary by Payment Period'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MicrofinanceRoutingModule {
}
