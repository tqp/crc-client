import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrcMetricsComponent } from './crc-metrics/crc-metrics.component';
import { ExportComponent } from './export/export.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { SummaryReportComponent } from './summary-report/summary-report.component';
import { CsiScoresReportComponent } from './csi-scores-report/csi-scores-report.component';
import { AngularMaterialModule } from '@tqp/modules/angular-material.module';
import { SummaryReportResultsDialogComponent } from './summary-report-results-dialog/summary-report-results-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CaseManagerCoverageComponent } from './case-manager-coverage/case-manager-coverage.component';
import { CaregiverCoverageComponent } from './caregiver-coverage/caregiver-coverage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CrcMetricsComponent,
    ExportComponent,
    SummaryReportComponent,
    CsiScoresReportComponent,
    SummaryReportResultsDialogComponent,
    CaseManagerCoverageComponent,
    CaregiverCoverageComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    // Custom Routing
    ReportsRoutingModule
  ]
})
export class ReportsModule {
}
