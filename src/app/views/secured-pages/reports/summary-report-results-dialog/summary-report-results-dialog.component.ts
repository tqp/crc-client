import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostGradEvent } from '../../../../models/post-grad-event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary-report-results-dialog',
  templateUrl: './summary-report-results-dialog.component.html',
  styleUrls: ['./summary-report-results-dialog.component.css']
})
export class SummaryReportResultsDialogComponent implements OnInit {
  public dataLoaded: boolean = false;

  // Result List
  public resultListRecords: PostGradEvent[] = [];
  public resultListDataSource: PostGradEvent[] = [];
  public resultListDisplayedColumns: string[] = [
    'text',
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) {
    console.log('data', data);
  }

  ngOnInit(): void {
    this.populateTable();
  }

  private populateTable(): void {
    const resultList = this.data.reportData;
    console.log('resultList', resultList);
    this.resultListRecords = [];
    resultList.forEach(item => {
      this.resultListRecords.push(item);
    });
    this.resultListDataSource = this.resultListRecords;
  }

  public openDetailPage(row: any): void {
    this.router.navigate(['students/student-detail', row.id]).then();
  }

}
