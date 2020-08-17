import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/open-pages/error/404.component';
import { P500Component } from './views/open-pages/error/500.component';
import { LoginPageComponent } from './views/open-pages/login-page/login-page.component';
import { LogoutComponent } from './views/open-pages/logout/logout.component';
import { SecuredPageResolverService } from '@tqp/services/secured-page-resolver.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/account/about',
    pathMatch: 'full',
  },

  {
    path: 'login-page',
    component: LoginPageComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout'
    }
  },

  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'account',
        loadChildren: () => import('./views/secured-pages/account/account.module').then(m => m.AccountModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'crc-members',
        loadChildren: () => import('./views/secured-pages/crc-members/crc-members.module').then(m => m.CrcMembersModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'reports',
        loadChildren: () => import('./views/secured-pages/reports/reports.module').then(m => m.ReportsModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      }
    ]
  },
  {path: '**', component: P404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
