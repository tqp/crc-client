import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export function customDateValidator(control: AbstractControl) {
  if (!control) {
    return null;
  } else if (!control.value) {
    return null;
  } else if (!moment(control.value, 'M/D/YYYY', true).isValid()) {
    return {dateValid: true};
  }
  return null;
}

export function customTimeValidator(control: AbstractControl) {
  if (!control) {
    return null;
  } else if (!control.value) {
    return null;
  } else if (!moment(control.value, 'h:mm:ss A', true).isValid()) {
    return {timeValid: true};
  }
  return null;
}
