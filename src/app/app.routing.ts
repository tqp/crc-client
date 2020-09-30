import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/open-pages/error/404.component';
import { P500Component } from './views/open-pages/error/500.component';
import { LoginPageComponent } from './views/open-pages/login-page/login-page.component';
import { LogoutComponent } from './views/open-pages/logout/logout.component';
import { SecuredPageResolverService } from '@tqp/services/secured-page-resolver.service';
import { TokenExchangeComponent } from './views/open-pages/token-exchange/token-exchange.component';

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
    path: 'token-exchange',
    component: TokenExchangeComponent
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
        path: 'students',
        loadChildren: () => import('./views/secured-pages/crc-members/students/student.module').then(m => m.StudentModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'caregivers',
        loadChildren: () => import('./views/secured-pages/crc-members/caregivers/caregiver.module').then(m => m.CaregiverModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'case-managers',
        loadChildren: () => import('./views/secured-pages/crc-members/case-managers/case-manager.module').then(m => m.CaseManagerModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'relation',
        loadChildren: () => import('./views/secured-pages/crc-members/relations/relation.module').then(m => m.RelationModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'person-type',
        loadChildren: () => import('./views/secured-pages/reference-tables/person-type/person-type.module').then(m => m.PersonTypeModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'relationship-type',
        loadChildren: () => import('./views/secured-pages/reference-tables/relationship-type/relationship-type.module').then(m => m.RelationshipTypeModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'tier-type',
        loadChildren: () => import('./views/secured-pages/reference-tables/tier-type/tier-type.module').then(m => m.TierTypeModule),
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
