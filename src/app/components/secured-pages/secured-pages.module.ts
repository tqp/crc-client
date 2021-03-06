import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsModule } from './reports/reports.module';
import { AccountModule } from './account/account.module';
import { FinanceModule } from './finance/finance.module';
import { PeopleModule } from './people/people.module';
import { ReferenceTablesModule } from './reference-tables/reference-tables.module';
import { RelationshipModule } from './relationships/relationship.module';
import { EventsModule } from './events/events.module';
import { VisitModule } from './events/visits/visit.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Custom Modules
    AccountModule,
    FinanceModule,
    PeopleModule,
    ReferenceTablesModule,
    RelationshipModule,
    ReportsModule,
    EventsModule,
    VisitModule
  ]
})
export class SecuredPagesModule {
}
