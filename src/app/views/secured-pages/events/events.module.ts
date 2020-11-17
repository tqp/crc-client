import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitModule } from './visits/visit.module';
import { CsiModule } from './csi/csi.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VisitModule,
    CsiModule
  ]
})
export class EventsModule {
}
