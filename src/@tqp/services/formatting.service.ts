import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FormattingService {
  private standardDateFormat = 'dd-MMM-yyyy';
  private mySqlDateFormat = 'YYYY-MM-DD';

  constructor() {
  }

  public formatStandardDateAsMySql(standardFormattedDate: string): string {
    return standardFormattedDate !== null ? moment(standardFormattedDate, this.standardDateFormat).format(this.mySqlDateFormat) : null;
  }

  public formatMySqlDateAsStandard(mySqlFormattedDate: string): string {
    return mySqlFormattedDate !== undefined ? moment(mySqlFormattedDate, this.mySqlDateFormat).format(this.standardDateFormat) : null;
  }

}
