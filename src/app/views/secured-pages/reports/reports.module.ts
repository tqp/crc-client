import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentHomeMapComponent } from './student-home-map/student-home-map.component';
import { StudentSchoolMapComponent } from './student-school-map/student-school-map.component';
import { CrcMetricsComponent } from './crc-metrics/crc-metrics.component';
import { ExportComponent } from './export/export.component';
import { ReportsRoutingModule } from './reports-routing.module';


@NgModule({
  declarations: [
    StudentHomeMapComponent,
    StudentSchoolMapComponent,
    CrcMetricsComponent,
    ExportComponent
  ],
  imports: [
    CommonModule,
    // Custom Routing
    ReportsRoutingModule
  ]
})
export class ReportsModule {
}
