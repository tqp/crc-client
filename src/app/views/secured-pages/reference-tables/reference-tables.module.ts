import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TierTypeModule } from './tier-type/tier-type.module';
import { PersonTypeModule } from './person-type/person-type.module';
import { RelationshipTypeModule } from './relationship-type/relationship-type.module';
import { PostGradEventTypeModule } from './post-grad-event-type/post-grad-event-type.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Custom Modules
    TierTypeModule,
    PersonTypeModule,
    RelationshipTypeModule,
    PostGradEventTypeModule
  ]
})
export class ReferenceTablesModule {
}
