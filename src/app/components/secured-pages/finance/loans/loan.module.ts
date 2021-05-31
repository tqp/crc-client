import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LoanRoutingModule } from './loan-routing.module';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { LoanDetailEditComponent } from './loan-detail-edit/loan-detail-edit.component';
import { LoanDetailEditDialogComponent } from './loan-detail-edit-dialog/loan-detail-edit-dialog.component';


@NgModule({
  declarations: [
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
    LoanRoutingModule
  ],
  providers: [
    CurrencyPipe
  ]
})
export class LoanModule {
}
