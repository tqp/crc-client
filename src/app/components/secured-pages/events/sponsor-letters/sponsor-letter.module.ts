import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SponsorLetterDetailEditDialogComponent } from './sponsor-letter-detail-edit-dialog/sponsor-letter-detail-edit-dialog.component';
import { SponsorLetterListComponent } from './sponsor-letter-list/sponsor-letter-list.component';
import { SponsorLetterDetailComponent } from './sponsor-letter-detail/sponsor-letter-detail.component';
import { SponsorLetterRoutingModule } from './sponsor-letter-routing.module';
import { SponsorLetterDetailEditComponent } from './sponsor-letter-detail-edit/sponsor-letter-detail-edit.component';


@NgModule({
  declarations: [
    SponsorLetterDetailEditDialogComponent,
    SponsorLetterListComponent,
    SponsorLetterDetailComponent,
    SponsorLetterDetailEditComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    FlexLayoutModule,
    SponsorLetterRoutingModule
  ]
})
export class SponsorLetterModule {
}
