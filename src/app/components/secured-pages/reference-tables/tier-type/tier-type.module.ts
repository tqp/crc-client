import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TierTypeRoutingModule } from './tier-type-routing.module';
import { TierTypeListComponent } from './tier-type-list/tier-type-list.component';
import { TierTypeDetailComponent } from './tier-type-detail/tier-type-detail.component';
import { TierTypeDetailEditComponent } from './tier-type-detail-edit/tier-type-detail-edit.component';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StudentRoutingModule } from '../../people/students/student-routing.module';


@NgModule({
  declarations: [
    TierTypeListComponent,
    TierTypeDetailComponent,
    TierTypeDetailEditComponent
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
    StudentRoutingModule,
    TierTypeRoutingModule
  ]
})
export class TierTypeModule {
}
