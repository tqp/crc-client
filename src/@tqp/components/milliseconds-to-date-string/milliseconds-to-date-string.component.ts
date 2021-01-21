import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-milliseconds-to-date-string',
  templateUrl: './milliseconds-to-date-string.component.html',
  styleUrls: ['./milliseconds-to-date-string.component.css']
})
export class MillisecondsToDateStringComponent implements OnInit, OnDestroy, OnChanges {
  public static STANDARD = 'DD-MMM-YYYY h: mm:ss a';
  public static DDMMMYY_HHMMSS_ZZ = 'DDMMYY HH:mm:s ZZ';
  public static YY_MM_DD = 'YYYY-MM-DD';
  public static DDMMMYY = 'DDMMYY';
  public static MMDDYYYY = 'dd-MMM-yyyy';
  public static FROM_NOW = 'FROM_NOW';

  @Input() milliseconds = 0;
  @Input() format?: string = MillisecondsToDateStringComponent.STANDARD;

  public dateAsString = '';
  public title = '';

  public static ConvertMillisecondsToDateAsString(i: number, format: string = MillisecondsToDateStringComponent.DDMMMYY_HHMMSS_ZZ): string {
    // return moment(i).utc().format(format).replace(' +0000', ' Z').toUpperCase();
    return moment(i).format(format).toUpperCase();
  }

  constructor() {
  }

  public ngOnInit(): void {
    this.generate();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.milliseconds) {
      this.generate();
    }
  }

  public ngOnDestroy(): void {
  }

  public generate(): void {
    if (this.format === MillisecondsToDateStringComponent.FROM_NOW) {
      this.dateAsString = moment(this.milliseconds).fromNow();
    } else {
      this.dateAsString = MillisecondsToDateStringComponent.ConvertMillisecondsToDateAsString(this.milliseconds, this.format);
    }

    this.title = MillisecondsToDateStringComponent.ConvertMillisecondsToDateAsString(this.milliseconds, MillisecondsToDateStringComponent.STANDARD);
  }

}
