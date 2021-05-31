import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './components/open-pages/error/404.component';
import { P500Component } from './components/open-pages/error/500.component';
import { LoginPageComponent } from './components/open-pages/login-page/login-page.component';
import { LogoutComponent } from './components/open-pages/logout/logout.component';
import { SecuredPageResolverService } from '@tqp/services/secured-page-resolver.service';
import { TokenExchangeComponent } from './components/open-pages/token-exchange/token-exchange.component';

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
        loadChildren: () => import('./components/secured-pages/account/account.module').then(m => m.AccountModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'users',
        loadChildren: () => import('./components/secured-pages/account/users/user.module').then(m => m.UserModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'students',
        loadChildren: () => import('./components/secured-pages/people/students/student.module').then(m => m.StudentModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'caregivers',
        loadChildren: () => import('./components/secured-pages/people/caregivers/caregiver.module').then(m => m.CaregiverModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'case-managers',
        loadChildren: () => import('./components/secured-pages/people/case-managers/case-manager.module').then(m => m.CaseManagerModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'sponsors',
        loadChildren: () => import('./components/secured-pages/people/sponsors/sponsor.module').then(m => m.SponsorModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'finance',
        loadChildren: () => import('./components/secured-pages/finance/finance.module').then(m => m.FinanceModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'payments',
        loadChildren: () => import('./components/secured-pages/finance/payments/payment.module').then(m => m.PaymentModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'loans',
        loadChildren: () => import('./components/secured-pages/finance/loans/loan.module').then(m => m.LoanModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'post-grad-events',
        loadChildren: () => import('./components/secured-pages/events/post-grad-events/post-grad-event.module').then(m => m.PostGradEventModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'visits',
        loadChildren: () => import('./components/secured-pages/events/visits/visit.module').then(m => m.VisitModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'csi',
        loadChildren: () => import('./components/secured-pages/events/csi/csi.module').then(m => m.CsiModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'person-type',
        loadChildren: () => import('./components/secured-pages/reference-tables/person-type/person-type.module').then(m => m.PersonTypeModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'relationship-type',
        loadChildren: () => import('./components/secured-pages/reference-tables/relationship-type/relationship-type.module').then(m => m.RelationshipTypeModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'tier-type',
        loadChildren: () => import('./components/secured-pages/reference-tables/tier-type/tier-type.module').then(m => m.TierTypeModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'reports',
        loadChildren: () => import('./components/secured-pages/reports/reports.module').then(m => m.ReportsModule),
        resolve: {
          securedPageResolver: SecuredPageResolverService
        }
      },
      {
        path: 'test-components',
        loadChildren: () => import('./components/secured-pages/test-components/test-components.module').then(m => m.TestComponentsModule),
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
