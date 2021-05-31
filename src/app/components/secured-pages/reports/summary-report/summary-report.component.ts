import { Component, OnInit } from '@angular/core';
import { SummaryReportService } from '../../../../services/reports/summary-report.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SummaryReportResultsDialogComponent } from '../summary-report-results-dialog/summary-report-results-dialog.component';
import { SummaryReportResultModel } from '../../../../models/summary-report-result.model';
import { Student } from '../../../../models/people/student.model';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.css']
})
export class SummaryReportComponent implements OnInit {
  public studentCount_Loading: boolean = false;
  public childrenCount_Total: number;

  constructor(private summaryReportService: SummaryReportService,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getActiveStudents_Count();
  }

  private getActiveStudents_Count(): void {
    this.studentCount_Loading = true;
    this.summaryReportService.getActiveStudents_Count().subscribe(
      response => {
        console.log('response', response);
        this.childrenCount_Total = response;
      },
      error => {
        console.error('Error: ', error);
      },
      () => {
        this.studentCount_Loading = false;
      }
    );
  }

  public getActiveStudents_Results(): void {
    this.studentCount_Loading = true;
    this.summaryReportService.getActiveStudents_Results().subscribe(
      (response: SummaryReportResultModel[]) => {
        // console.log('response', response);
        this.openSummaryReportResultsDialog(response);
      },
      error => {
        console.error('Error: ', error);
      },
      () => {
        this.studentCount_Loading = false;
      }
    );
  }

  public openSummaryReportResultsDialog(reportData: SummaryReportResultModel[]): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '40%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      reportData: reportData,
    };
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(SummaryReportResultsDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      console.log('dialogData', dialogData);
      if (dialogData) {
        console.log('dialogData', dialogData);
      }
    });
  }

}
