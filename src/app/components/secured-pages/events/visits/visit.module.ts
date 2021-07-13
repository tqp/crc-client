import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitListComponent } from './visit-list/visit-list.component';
import { VisitDetailComponent } from './visit-detail/visit-detail.component';
import { VisitDetailEditComponent } from './visit-detail-edit/visit-detail-edit.component';
import { VisitRoutingModule } from './visit-routing.module';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VisitDetailEditDialogComponent } from './visit-detail-edit-dialog/visit-detail-edit-dialog.component';
import { VisitListByCaseManagerComponent } from './visit-list-by-case-manager/visit-list-by-case-manager.component';


@NgModule({
  declarations: [
    VisitListComponent,
    VisitDetailComponent,
    VisitDetailEditComponent,
    VisitDetailEditDialogComponent,
    VisitListByCaseManagerComponent
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
    VisitRoutingModule,
  ]
})
export class VisitModule {
}
