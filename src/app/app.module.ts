import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppFooterModule,
  AppHeaderModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { OpenPagesModule } from './components/open-pages/open-pages.module';
import { LoginPageModule } from './components/open-pages/login-page/login-page.module';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '@tqp/shared.module';
import { SecuredPagesModule } from './components/secured-pages/secured-pages.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    // CUSTOM IMPORTS
    LoginPageModule,
    SharedModule,
    OpenPagesModule,
    SecuredPagesModule,
    // CUSTOM ADD-ONS
    AngularMaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
