import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AboutModule } from './about/about.module';
import { AccountRoutingModule } from './account-routing.module';
import { AngularMaterialModule } from '../../../../@tqp/modules/angular-material.module';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { ListAddRemoveItemsBasicModule } from '../../../../@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { RoleDetailComponent } from './roles/role-detail/role-detail.component';
import { RoleDetailEditComponent } from './roles/role-detail-edit/role-detail-edit.component';
import { UserModule } from './users/user.module';
import { ChangePasswordDialogComponent } from './passwords/change-password-dialog/change-password-dialog.component';


@NgModule({
  declarations: [
    MyProfileComponent,
    RoleListComponent,
    RoleDetailComponent,
    RoleDetailEditComponent,
    ChangePasswordDialogComponent,
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
    // Custom Modules
    AccountRoutingModule,
    AboutModule,
    UserModule
  ]
})
export class AccountModule {
}
