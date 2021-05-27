import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsiDetailEditComponent } from './csi-detail-edit/csi-detail-edit.component';
import { CsiDetailComponent } from './csi-detail/csi-detail.component';
import { CsiRoutingModule } from './csi-routing.module';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CsiListComponent } from './csi-list/csi-list.component';
import { CsiDetailEditDialogComponent } from './csi-detail-edit-dialog/csi-detail-edit-dialog.component';


@NgModule({
  declarations: [
    CsiDetailEditComponent,
    CsiDetailComponent,
    CsiListComponent,
    CsiDetailEditDialogComponent
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
    CsiRoutingModule
  ]
})
export class CsiModule {
}
