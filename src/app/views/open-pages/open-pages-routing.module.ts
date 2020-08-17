import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Open Pages'
    },
    children: [
      {
        path: '',
        redirectTo: 'login-page',
        pathMatch: 'full'
      },
      {
        path: 'login-page',
        component: LoginPageComponent,
        data: {
          title: 'Login Page'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuredPagesRoutingModule {
}
