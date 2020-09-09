import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelationRoutingModule } from './relation-routing.module';
import { AngularMaterialModule } from '../../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '../../../../../@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CaregiverRoutingModule } from '../caregivers/caregiver-routing.module';
import { RelationListComponent } from './relation-list/relation-list.component';
import { RelationDetailComponent } from './relation-detail/relation-detail.component';
import { RelationDetailEditComponent } from './relation-detail-edit/relation-detail-edit.component';


@NgModule({
  declarations: [
    RelationListComponent,
    RelationDetailComponent,
    RelationDetailEditComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    ListAddRemoveItemsBasicModule,
    FlexLayoutModule,
    RelationRoutingModule
  ]
})
export class RelationModule {
}
