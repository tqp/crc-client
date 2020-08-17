import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { AboutModule } from './about/about.module';
import { AccountRoutingModule } from './account-routing.module';


@NgModule({
  declarations: [
    MyProfileComponent,
    UserProfileComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AboutModule
  ]
})
export class AccountModule {
}
