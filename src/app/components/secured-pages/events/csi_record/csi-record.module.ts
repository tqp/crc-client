import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsiRecordRoutingModule } from './csi-record-routing.module';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CsiRecordDetailEditComponent } from './csi-record-detail-edit/csi-record-detail-edit.component';
import { CsiRecordDetailEditDialogComponent } from './csi-record-detail-edit-dialog/csi-record-detail-edit-dialog.component';
import { CsiRecordListComponent } from './csi-record-list/csi-record-list.component';
import { CsiRecordDetailComponent } from './csi-record-detail/csi-record-detail.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';


@NgModule({
  declarations: [
    CsiRecordDetailComponent,
    CsiRecordDetailEditComponent,
    CsiRecordDetailEditDialogComponent,
    CsiRecordListComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    ListAddRemoveItemsBasicModule,
    FlexLayoutModule,
    CsiRecordRoutingModule
  ]
})
export class CsiRecordModule {
}
