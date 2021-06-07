import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailEditComponent } from './user-detail-edit/user-detail-edit.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'User Management'
    },
    children: [
      {
        path: '',
        redirectTo: 'user-list',
        pathMatch: 'full'
      },
      {
        path: 'user-list',
        component: UserListComponent,
        data: {
          title: 'User List'
        }
      },
      {
        path: 'user-detail/:id',
        component: UserDetailComponent,
        data: {
          title: 'User Detail'
        }
      },
      {
        path: 'user-detail-edit/:id',
        component: UserDetailEditComponent,
        data: {
          title: 'User Detail Edit'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
