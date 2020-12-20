import { Component, OnInit } from '@angular/core';
import { SummaryReportService } from './summary-report.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SummaryReportResultsDialogComponent } from '../summary-report-results-dialog/summary-report-results-dialog.component';
import { SummaryReportResult } from './SummaryReportResult';
import { Student } from '../../people/students/Student';

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
      (response: SummaryReportResult[]) => {
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

  public openSummaryReportResultsDialog(reportData: SummaryReportResult[]): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
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
