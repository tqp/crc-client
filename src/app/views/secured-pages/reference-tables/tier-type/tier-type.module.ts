import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TierTypeRoutingModule } from './tier-type-routing.module';
import { TierTypeListComponent } from './tier-type-list/tier-type-list.component';
import { TierTypeDetailComponent } from './tier-type-detail/tier-type-detail.component';
import { TierTypeDetailEditComponent } from './tier-type-detail-edit/tier-type-detail-edit.component';


@NgModule({
  declarations: [
    TierTypeListComponent,
    TierTypeDetailComponent,
    TierTypeDetailEditComponent
  ],
  imports: [
    CommonModule,
    TierTypeRoutingModule
  ]
})
export class TierTypeModule {
}
