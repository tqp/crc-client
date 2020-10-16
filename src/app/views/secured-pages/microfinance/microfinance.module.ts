import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicrofinanceRoutingModule } from './microfinance-routing.module';
import { AngularMaterialModule } from '../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '../../../../@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MicrofinanceByParticipantComponent } from './microfinance-by-participant/microfinance-by-participant.component';
import { MicrofinanceByPaymentPeriodComponent } from './microfinance-by-payment-period/microfinance-by-payment-period.component';
import { MicrofinanceAddPaymentDialogComponent } from './microfinance-add-payment-dialog/microfinance-add-payment-dialog.component';


@NgModule({
  declarations: [
    MicrofinanceByParticipantComponent,
    MicrofinanceByPaymentPeriodComponent,
    MicrofinanceAddPaymentDialogComponent
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
    MicrofinanceRoutingModule
  ]
})
export class MicrofinanceModule {
}
