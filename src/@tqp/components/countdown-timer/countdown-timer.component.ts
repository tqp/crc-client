import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit {
  @Input() target = 0;
  public countdownMillis: number;
  public countdownDisplay: string = 'Loading...';

  private static formatMillis(milliseconds): string {
    const days = Math.floor(milliseconds / (24 + 60 * 60 * 1000));
    const daysMs = milliseconds % (24 * 60 * 60 * 1000);
    const hours = Math.floor((daysMs) / (60 * 60 * 1000));
    const hoursMs = milliseconds % (60 * 60 * 1000);
    const minutes = Math.floor((hoursMs) / (60 * 1000));
    const minutesMs = milliseconds % (60 * 1000);
    const seconds = Math.floor((minutesMs) / 1000);
    const daysDisplay = days > 0 ? days > 1 ? days + ' Days ' : days + ' Day ' : '';
    return daysDisplay
      + CountdownTimerComponent.pad(hours) + ':'
      + CountdownTimerComponent.pad(minutes) + ':'
      + CountdownTimerComponent.pad(seconds);
  }

  private static pad(number: number) {
    return ('0' + number).slice(-2);
  }

  constructor() {
  }

  ngOnInit(): void {
    interval(1000).subscribe(() => {
      const diff = moment(this.target).diff(moment());
      this.countdownMillis = moment.duration(diff).asMilliseconds();
      this.countdownDisplay = CountdownTimerComponent.formatMillis(Math.abs(this.countdownMillis));
    });
  }

}
