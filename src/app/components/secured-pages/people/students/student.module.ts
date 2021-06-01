import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentDetailEditComponent } from './student-detail-edit/student-detail-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListAddRemoveItemsBasicModule } from '@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentRoutingModule } from './student-routing.module';
import { ChartsModule } from 'ng2-charts';
import { StudentListByCaseManagerComponent } from './student-list-by-case-manager/student-list-by-case-manager.component';
import { StudentListSspComponent } from './student-list-ssp/student-list-ssp.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailComponent,
    StudentDetailEditComponent,
    StudentListByCaseManagerComponent,
    StudentListSspComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ChartsModule,
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    ListAddRemoveItemsBasicModule,
    FlexLayoutModule,
    StudentRoutingModule
  ]
})
export class StudentModule {
}
