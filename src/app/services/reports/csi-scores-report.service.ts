import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CsiScoresReportData } from '../../models/csi-scores-report-data.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CsiScoresReportService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public getCsiScoresReportData(teamKey: string, userKey: String): Observable<CsiScoresReportData[]> {
    const url = environment.apiUrl + '/api/v1/csi-scores-report/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<CsiScoresReportData[]>(url, {
        headers: this.httpService.setHeadersWithToken(),
        observe: 'response',
        params: {}
      })
        .pipe(
          map(res => {
            return res.body;
          })
        );
    } else {
      console.error('No token was present.');
      return null;
    }
  }
}
