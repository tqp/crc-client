import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RelationshipTypeRoutingModule} from './relationship-type-routing.module';
import {RelationshipTypeListComponent} from './relationship-type-list/relationship-type-list.component';
import {RelationshipTypeDetailComponent} from './relationship-type-detail/relationship-type-detail.component';
import {RelationshipTypeDetailEditComponent} from './relationship-type-detail-edit/relationship-type-detail-edit.component';
import {AngularMaterialModule} from '../../../../../@tqp/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {RouterModule} from '@angular/router';
import {ListAddRemoveItemsBasicModule} from '../../../../../@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {StudentRoutingModule} from '../../people/students/student-routing.module';


@NgModule({
  declarations: [
    RelationshipTypeListComponent,
    RelationshipTypeDetailComponent,
    RelationshipTypeDetailEditComponent
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
    StudentRoutingModule,
    RelationshipTypeRoutingModule
  ]
})
export class RelationshipTypeModule {
}
