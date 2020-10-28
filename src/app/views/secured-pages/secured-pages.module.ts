import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsModule } from './reports/reports.module';
import { AccountModule } from './account/account.module';
import { FinanceModule } from './finance/finance.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Custom Modules
    ReportsModule,
    AccountModule,
    FinanceModule
  ]
})
export class SecuredPagesModule {
}
