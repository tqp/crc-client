import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrcMetricsComponent } from './crc-metrics/crc-metrics.component';
import { ExportComponent } from './export/export.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { SummaryReportComponent } from './summary-report/summary-report.component';


@NgModule({
  declarations: [
    CrcMetricsComponent,
    ExportComponent,
    SummaryReportComponent
  ],
  imports: [
    CommonModule,
    // Custom Routing
    ReportsRoutingModule
  ]
})
export class ReportsModule {
}
