import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailEditComponent } from './user-detail-edit/user-detail-edit.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'UserModel Management'
    },
    children: [
      {
        path: 'user-create',
        component: UserDetailComponent,
        data: {
          title: 'Add UserModel'
        }
      },
      {
        path: '',
        redirectTo: 'user-list',
        pathMatch: 'full'
      },
      {
        path: 'user-list',
        component: UserListComponent,
        data: {
          title: 'UserModel List'
        }
      },
      {
        path: 'user-detail/:id',
        component: UserDetailComponent,
        data: {
          title: 'UserModel Detail'
        }
      },
      {
        path: 'user-detail-edit/:id',
        component: UserDetailEditComponent,
        data: {
          title: 'UserModel Detail Edit'
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
