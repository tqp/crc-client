import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListAddRemoveItemsBasicComponent} from './list-add-remove-items-basic.component';
import { AngularMaterialModule } from '../../modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListAddRemoveItemsBasicComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ListAddRemoveItemsBasicComponent
  ]
})
export class ListAddRemoveItemsBasicModule {
}
