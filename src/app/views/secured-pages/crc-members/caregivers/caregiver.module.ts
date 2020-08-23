import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaregiverListComponent } from './caregiver-list/caregiver-list.component';
import { AngularMaterialModule } from '../../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '../../../../../@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CaregiverDetailComponent } from './caregiver-detail/caregiver-detail.component';
import { CaregiverDetailEditComponent } from './caregiver-detail-edit/caregiver-detail-edit.component';
import { CaregiverRoutingModule } from './caregiver-routing.module';


@NgModule({
  declarations: [CaregiverListComponent, CaregiverDetailComponent, CaregiverDetailEditComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    ListAddRemoveItemsBasicModule,
    FlexLayoutModule,
    CaregiverRoutingModule
  ]
})
export class CaregiverModule {
}
