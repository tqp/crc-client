import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportsModule} from './reports/reports.module';
import {CrcMembersModule} from './crc-members/crc-members.module';
import {AccountModule} from './account/account.module';
import { TierTypeListComponent } from './reference-tables/tier-type/tier-type-list/tier-type-list.component';
import { TierTypeDetailComponent } from './reference-tables/tier-type/tier-type-detail/tier-type-detail.component';
import { TierTypeDetailEditComponent } from './reference-tables/tier-type/tier-type-detail-edit/tier-type-detail-edit.component';


@NgModule({
  declarations: [TierTypeListComponent, TierTypeDetailComponent, TierTypeDetailEditComponent],
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
