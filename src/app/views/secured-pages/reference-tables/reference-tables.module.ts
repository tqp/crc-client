import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TierTypeListComponent } from './tier-type/tier-type-list/tier-type-list.component';
import { TierTypeDetailComponent } from './tier-type/tier-type-detail/tier-type-detail.component';
import { TierTypeDetailEditComponent } from './tier-type/tier-type-detail-edit/tier-type-detail-edit.component';
import { PersonTypeListComponent } from './person-type/person-type-list/person-type-list.component';
import { PersonTypeDetailComponent } from './person-type/person-type-detail/person-type-detail.component';
import { RelationshipTypeListComponent } from './relationship-type/relationship-type-list/relationship-type-list.component';
import { RelationshipTypeDetailComponent } from './relationship-type/relationship-type-detail/relationship-type-detail.component';
import { RelationshipTypeDetailEditComponent } from './relationship-type/relationship-type-detail-edit/relationship-type-detail-edit.component';
import { PersonTypeDetailEditComponent } from './person-type/person-type-detail-edit/person-type-detail-edit.component';
import { TierTypeModule } from './tier-type/tier-type.module';
import { PersonTypeModule } from './person-type/person-type.module';
import { RelationshipTypeModule } from './relationship-type/relationship-type.module';


@NgModule({
  declarations: [

    PersonTypeListComponent,
    PersonTypeDetailComponent,
    RelationshipTypeListComponent,
    RelationshipTypeDetailComponent,
    RelationshipTypeDetailEditComponent,
    PersonTypeDetailEditComponent
  ],
  imports: [
    CommonModule,
    // Custom Modules
    TierTypeModule,
    PersonTypeModule,
    RelationshipTypeModule
  ]
})
export class ReferenceTablesModule {
}
