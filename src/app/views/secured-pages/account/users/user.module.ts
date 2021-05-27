import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailEditComponent } from './user-detail-edit/user-detail-edit.component';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserRoutingModule } from './user-routing.module';
import { UserDetailEditDialogComponent } from './user-detail-edit-dialog/user-detail-edit-dialog.component';



@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserDetailEditComponent,
    UserDetailEditDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    ListAddRemoveItemsBasicModule,
    FlexLayoutModule,
    // Routing
    UserRoutingModule
  ]
})
export class UserModule { }
