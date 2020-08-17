import {Injectable} from '@angular/core';
import {AppEvent} from '@tqp/models/AppEvent';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public loadingEvent: AppEvent<any> = new AppEvent<any>();

  constructor() {
  }
}
