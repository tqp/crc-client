import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../../../@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '../../../../@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceReportByPaymentPeriodComponent } from './reports/finance-report-by-payment-period/finance-report-by-payment-period.component';
import { FinanceReportByParticipantComponent } from './reports/finance-report-by-participant/finance-report-by-participant.component';
import { PaymentListComponent } from './payments/payment-list/payment-list.component';
import { PaymentDetailComponent } from './payments/payment-detail/payment-detail.component';
import { PaymentDetailEditDialogComponent } from './payments/payment-detail-edit-dialog/payment-detail-edit-dialog.component';
import { LoanListComponent } from './loans/loan-list/loan-list.component';
import { LoanDetailComponent } from './loans/loan-detail/loan-detail.component';
import { LoanDetailEditComponent } from './loans/loan-detail-edit/loan-detail-edit.component';
import { LoanDetailEditDialogComponent } from './loans/loan-detail-edit-dialog/loan-detail-edit-dialog.component';


@NgModule({
  declarations: [
    FinanceReportByPaymentPeriodComponent,
    FinanceReportByParticipantComponent,
    PaymentListComponent,
    PaymentDetailComponent,
    PaymentDetailEditDialogComponent,
    LoanListComponent,
    LoanDetailComponent,
    LoanDetailEditComponent,
    LoanDetailEditDialogComponent
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
    FinanceRoutingModule
  ]
})
export class FinanceModule { }
