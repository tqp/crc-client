import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsModule } from './reports/reports.module';
import { AccountModule } from './account/account.module';
import { MicrofinanceModule } from './microfinance/microfinance.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Custom Modules
    ReportsModule,
    AccountModule,
    MicrofinanceModule
  ]
})
export class SecuredPagesModule {
}
