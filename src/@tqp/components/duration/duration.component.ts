import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css']
})
export class DurationComponent implements OnInit {
  @Input() start: number = 0;
  @Input() end: number = 0;
  public durationMillis: number;
  public durationDisplay: string = '';

  private static formatMillis(milliseconds): string {
    const days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
    const daysMs = milliseconds % (24 * 60 * 60 * 1000);
    const hours = Math.floor((daysMs) / (60 * 60 * 1000));
    const hoursMs = milliseconds % (60 * 60 * 1000);
    const minutes = Math.floor((hoursMs) / (60 * 1000));
    const minutesMs = milliseconds % (60 * 1000);
    const seconds = Math.floor((minutesMs) / 1000);
    const daysDisplay = days > 0 ? days > 1 ? days + ' Days ' : days + ' Day ' : '';
    return daysDisplay
      + DurationComponent.pad(hours) + ':'
      + DurationComponent.pad(minutes) + ':'
      + DurationComponent.pad(seconds);
  }

  private static pad(number: number) {
    return ('00' + number).slice(-2);
  }

  constructor() {
  }

  ngOnInit(): void {
    const diff = moment(this.end).diff(moment(this.start));
    const milliseconds: number = moment.duration(diff).asMilliseconds();
    if (milliseconds > 0) {
      this.durationMillis = milliseconds;
      this.durationDisplay = DurationComponent.formatMillis(Math.abs(this.durationMillis));
    }
  }


}
