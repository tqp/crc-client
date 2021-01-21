import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { TokenExchangeComponent } from './token-exchange/token-exchange.component';
import { P404Component } from './error/404.component';


@NgModule({
  declarations: [
    LogoutComponent,
    TokenExchangeComponent,
    P404Component
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class OpenPagesModule {
}
