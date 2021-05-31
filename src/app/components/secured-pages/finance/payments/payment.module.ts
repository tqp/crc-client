import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentDetailEditComponent } from './payment-detail-edit/payment-detail-edit.component';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FinanceRoutingModule } from '../finance-routing.module';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { PaymentDetailEditDialogComponent } from './payment-detail-edit-dialog/payment-detail-edit-dialog.component';



@NgModule({
  declarations: [
    PaymentListComponent,
    PaymentDetailComponent,
    PaymentDetailEditComponent,
    PaymentDetailEditDialogComponent
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
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
