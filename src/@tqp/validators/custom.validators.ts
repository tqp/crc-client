import { AbstractControl, FormControl } from '@angular/forms';
import * as moment from 'moment';


export function validateNonZeroValue(fc: FormControl) {
  if (fc.value === 0) {
    return ({validateNonZeroValue: true});
  } else {
    return null;
  }
}

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
