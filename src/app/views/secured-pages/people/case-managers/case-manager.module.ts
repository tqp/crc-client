import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseManagerListComponent } from './case-manager-list/case-manager-list.component';
import { AngularMaterialModule } from '../../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '../../../../../@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CaseManagerDetailComponent } from './case-manager-detail/case-manager-detail.component';
import { CaseManagerDetailEditComponent } from './case-manager-detail-edit/case-manager-detail-edit.component';
import { CaseManagerRoutingModule } from './case-manager-routing.module';
import { CaseManagerCreateComponent } from './case-manager-create/case-manager-create.component';


@NgModule({
  declarations: [
    CaseManagerListComponent,
    CaseManagerDetailComponent,
    CaseManagerDetailEditComponent,
    CaseManagerCreateComponent
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
    CaseManagerRoutingModule
  ]
})
export class CaseManagerModule {
}
