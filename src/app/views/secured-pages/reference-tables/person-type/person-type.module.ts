import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PersonTypeRoutingModule} from './person-type-routing.module';
import {AngularMaterialModule} from '../../../../../@tqp/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {RouterModule} from '@angular/router';
import {ListAddRemoveItemsBasicModule} from '../../../../../@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {StudentRoutingModule} from '../../people/students/student-routing.module';
import {PersonTypeListComponent} from './person-type-list/person-type-list.component';
import {PersonTypeDetailComponent} from './person-type-detail/person-type-detail.component';
import {PersonTypeDetailEditComponent} from './person-type-detail-edit/person-type-detail-edit.component';



@NgModule({
  declarations: [
    PersonTypeListComponent,
    PersonTypeDetailComponent,
    PersonTypeDetailEditComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    ListAddRemoveItemsBasicModule,
    FlexLayoutModule,
    PersonTypeRoutingModule
  ]
})
export class PersonTypeModule { }
