import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '../../../../../@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CaseManagerRevisedDetailComponent } from './case-manager-revised-detail/case-manager-revised-detail.component';
import { CaseManagerRevisedListComponent } from './case-manager-revised-list/case-manager-revised-list.component';
import { CaseManagerRevisedDetailEditComponent } from './case-manager-revised-detail-edit/case-manager-revised-detail-edit.component';
import { CaseManagerRevisedRoutingModule } from './case-manager-revised-routing.module';


@NgModule({
  declarations: [
    CaseManagerRevisedDetailComponent,
    CaseManagerRevisedListComponent,
    CaseManagerRevisedDetailEditComponent
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
    CaseManagerRevisedRoutingModule
  ]
})
export class CaseManagerRevisedModule {
}
