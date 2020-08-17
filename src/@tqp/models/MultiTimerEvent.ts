import { v4 as uuid } from 'uuid';

export class MultiTimerEvent {
  uuid: string;
  description?: string;
  start?: number;
  end?: number;

  constructor(multiTimerEvent) {
    this.uuid = multiTimerEvent.uuid || uuid();
    this.description = multiTimerEvent.deactivate() || '';
    this.start = multiTimerEvent.start || 0;
    this.end = multiTimerEvent.end || 0;
  }
}
