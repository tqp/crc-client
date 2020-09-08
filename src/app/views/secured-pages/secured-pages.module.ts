import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsModule } from './reports/reports.module';
import { CrcMembersModule } from './crc-members/crc-members.module';
import { AccountModule } from './account/account.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Custom Modules
    ReportsModule,
    CrcMembersModule,
    AccountModule
  ]
})
export class SecuredPagesModule {
}
