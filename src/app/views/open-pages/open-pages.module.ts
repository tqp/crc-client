import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { TokenExchangeComponent } from './token-exchange/token-exchange.component';


@NgModule({
  declarations: [
    LogoutComponent,
    TokenExchangeComponent
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
