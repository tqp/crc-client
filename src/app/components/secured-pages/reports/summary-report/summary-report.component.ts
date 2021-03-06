import { Component, OnInit } from '@angular/core';
import { SummaryReportService } from '../../../../services/reports/summary-report.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.css']
})
export class SummaryReportComponent implements OnInit {
  public studentCountTotal: number;
  public studentCountTotalLoading: boolean = false;

  public studentCountReintegrated: number;
  public studentCountReintegratedLoading: boolean = false;

  public studentCountReintegratedRunaway: number;
  public studentCountReintegratedRunawayLoading: boolean = false;

  public studentCountFamiliesIntact: number;
  public studentCountFamiliesIntactLoading: boolean = false;

  public studentCountFamiliesIntactEnrolled: number;
  public studentCountFamiliesIntactEnrolledLoading: boolean = false;

  constructor(private summaryReportService: SummaryReportService,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getStudentCountTotal();
    this.getStudentCountReintegrated();
    this.getStudentCountReintegratedRunaway();
    this.getStudentCountFamiliesIntact();
    this.getStudentCountFamiliesIntactEnrolled();
  }

  private getStudentCountTotal(): void {
    this.studentCountTotalLoading = true;
    this.summaryReportService.getStudentCountTotal().subscribe(
      (response: number) => {
        // console.log('getStudentCountTotal', response);
        this.studentCountTotal = response;
        this.studentCountTotalLoading = false;
      },
      error => {
        console.error('Error: ', error);
      },
      () => {
      }
    );
  }

  private getStudentCountReintegrated(): void {
    this.studentCountReintegratedLoading = true;
    this.summaryReportService.getStudentCountReintegrated().subscribe(
      (response: number) => {
        // console.log('getStudentCountReintegrated', response);
        this.studentCountReintegrated = response;
        this.studentCountReintegratedLoading = false;
      },
      error => {
        console.error('Error: ', error);
      },
      () => {
      }
    );
  }

  private getStudentCountReintegratedRunaway(): void {
    this.studentCountReintegratedLoading = true;
    this.summaryReportService.getStudentCountReintegratedRunaway().subscribe(
      (response: number) => {
        // console.log('getStudentCountReintegratedRunaway', response);
        this.studentCountReintegratedRunaway = response;
        this.studentCountReintegratedRunawayLoading = false;
      },
      error => {
        console.error('Error: ', error);
      },
      () => {
      }
    );
  }

  private getStudentCountFamiliesIntact(): void {
    this.studentCountFamiliesIntactLoading = true;
    this.summaryReportService.getStudentCountFamiliesIntact().subscribe(
      (response: number) => {
        console.log('studentCountFamiliesReunified', response);
        this.studentCountFamiliesIntact = response;
        this.studentCountFamiliesIntactLoading = false;
      },
      error => {
        console.error('Error: ', error);
      },
      () => {
      }
    );
  }

  private getStudentCountFamiliesIntactEnrolled(): void {
    this.studentCountFamiliesIntactEnrolledLoading = true;
    this.summaryReportService.getStudentCountFamiliesIntactEnrolled().subscribe(
      (response: number) => {
        console.log('studentCountFamiliesReunified', response);
        this.studentCountFamiliesIntactEnrolled = response;
        this.studentCountFamiliesIntactEnrolledLoading = false;
      },
      error => {
        console.error('Error: ', error);
      },
      () => {
      }
    );
  }

}
