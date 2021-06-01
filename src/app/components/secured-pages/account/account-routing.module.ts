import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Account Management'
    },
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
      },
      {
        path: 'about',
        component: AboutComponent,
        data: {
          title: 'About'
        }
      },
      {
        path: 'my-profile',
        component: MyProfileComponent,
        data: {
          title: 'My Profile'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
