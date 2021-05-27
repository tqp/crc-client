import { Component, OnInit } from '@angular/core';
import { CsiScoresReportData } from '../../../../models/csi-scores-report-data.model';
import { CsiScoresReportService } from '../../../../services/csi-scores-report.service';

@Component({
  selector: 'app-csi-scores-report',
  templateUrl: './csi-scores-report.component.html',
  styleUrls: ['./csi-scores-report.component.css']
})
export class CsiScoresReportComponent implements OnInit {
  public userGuid: string = 'key_user1';
  public minNumberToDisplay: number = 0;
  public maxNumberToDisplay: number = 48;

  // Picks Table
  public csiScoresReportListLoading: boolean = false;
  public csiScoresTotalColumn: number;
  public csiScoresReportListDataSource: CsiScoresReportData[] = [];
  public csiScoresReportListRecords: CsiScoresReportData[] = [];
  public csiScoresReportListDisplayedColumns: string[] = [];

  constructor(private csiScoresReportService: CsiScoresReportService) {
  }

  ngOnInit(): void {
    this.getCsiScoresReportData('key_team2', this.userGuid);

    console.log('test1', this.counter(3, 7));
  }

  public getCsiScoresReportData(teamKey: string, userKey: string): void {
    this.csiScoresReportListLoading = true;
    this.csiScoresReportService.getCsiScoresReportData(teamKey, userKey).subscribe(
      (chartData: CsiScoresReportData[]) => {
        this.csiScoresReportListDisplayedColumns.push('caseManagerName');

        console.log('chartData', chartData);

        // Get Number Columns to Display
        this.minNumberToDisplay = Math.min.apply(Math, chartData.map((o) => o.totalScore));
        this.maxNumberToDisplay = Math.max.apply(Math, chartData.map((o) => o.totalScore));

        for (let i = this.minNumberToDisplay; i <= this.maxNumberToDisplay; i++) {
          console.log('round', 'round' + i);
          this.csiScoresReportListDisplayedColumns.push('round' + i);
        }

        // // Populate Table
        // chartData.forEach(item => {
        //   this.picksRecords.push(item);
        // });
        //
        // // Pivot Data
        // this.picksDataSource = chartData.reduce((prev, cur) => {
        //   const existing = prev.find(x => x.contestantKey === cur.contestant.contestantKey);
        //   if (existing) {
        //     existing.values.push(cur);
        //   } else {
        //     prev.push({
        //       contestantKey: cur.contestant.contestantKey,
        //       values: [cur]
        //     });
        //   }
        //   return prev;
        // }, []);
      }, error => {
        console.error('Error: ', error);
      }, () => {
        this.csiScoresReportListLoading = false;
      }
    );
  }

  public counter(min: number, max: number) {
    return new Array(max - min);
  }

  public getCustomClass(value: string): string {
    return value.toLowerCase();
  }

  public getCustomIcon(value: string): string {
    switch (value.toLowerCase()) {
      case 'correct':
        return '';
      case 'wrong':
        return 'fa fa-close';
      case 'projected':
        return 'fa fa-question';
      default:
        return '';
    }
  }

  public getCustomText(value: string, points: number): string {
    switch (value.toLowerCase()) {
      case 'correct':
        return points.toString();
      case 'wrong':
        return '';
      case 'projected':
        return '';
      default:
        return '';
    }
  }

  public calculateTotal(picksDataSource: CsiScoresReportData[], i): string {
    const points = picksDataSource.reduce((accum, curr) => {
      // Add points for all picks in the current round that are correct.
      const pickChartItem = curr['values']
        .filter(obj => obj.round === i + 1)
        .filter(obj => obj.status === 'CORRECT');
      const cellPoints = pickChartItem[0] ? pickChartItem[0].points : 0;
      return accum + cellPoints;
    }, 0);
    return points !== 0 ? points : '';
  }

}
