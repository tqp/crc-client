import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryReportService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public getStudentCountTotal(): Observable<number> {
    const url = environment.apiUrl + '/api/v1/summary-report/student-count-total';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<number>(url,
        {
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

  public getStudentCountReintegrated(): Observable<number> {
    const url = environment.apiUrl + '/api/v1/summary-report/student-count-reintegrated';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<number>(url,
        {
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

  public getStudentCountReintegratedRunaway(): Observable<number> {
    const url = environment.apiUrl + '/api/v1/summary-report/student-count-reintegrated-runaway';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<number>(url,
        {
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

  public getStudentCountFamiliesIntact(): Observable<number> {
    const url = environment.apiUrl + '/api/v1/summary-report/student-count-families-intact';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<number>(url,
        {
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

  public getStudentCountFamiliesIntactEnrolled(): Observable<number> {
    const url = environment.apiUrl + '/api/v1/summary-report/student-count-families-intact-enrolled';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<number>(url,
        {
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
