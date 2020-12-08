import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrcMetricsComponent } from './crc-metrics/crc-metrics.component';
import { ExportComponent } from './export/export.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { SummaryReportComponent } from './summary-report/summary-report.component';
import { CsiScoresReportComponent } from './csi-scores-report/csi-scores-report.component';
import { AngularMaterialModule } from '../../../../@tqp/modules/angular-material.module';


@NgModule({
  declarations: [
    CrcMetricsComponent,
    ExportComponent,
    SummaryReportComponent,
    CsiScoresReportComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    // Custom Routing
    ReportsRoutingModule
  ]
})
export class ReportsModule {
}
