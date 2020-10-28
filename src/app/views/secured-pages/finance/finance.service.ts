import { Injectable } from '@angular/core';
import { ServerSidePaginationRequest } from '../../../../@tqp/models/ServerSidePaginationRequest';
import { Observable } from 'rxjs';
import { ServerSidePaginationResponse } from '../../../../@tqp/models/ServerSidePaginationResponse';
import { Caregiver } from '../people/caregivers/Caregiver';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../@tqp/services/http.service';
import { TokenService } from '../../../../@tqp/services/token.service';
import { Finance } from './Finance';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public getFinanceListByParticipant_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse<Finance>> {
    const url = environment.apiUrl + '/api/v1/finance/report-by-participant/ssp';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<ServerSidePaginationResponse<Finance>>(url,
        serverSideSearchParams,
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

  public getPaymentList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse<Finance>> {
    const url = environment.apiUrl + '/api/v1/finance/payment-list/ssp';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<ServerSidePaginationResponse<Finance>>(url,
        serverSideSearchParams,
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

  public getTotalCommitted(): Observable<number> {
    const url = environment.apiUrl + '/api/v1/finance/total-committed';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<number>(url, {
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

  public getTotalPaid(): Observable<number> {
    const url = environment.apiUrl + '/api/v1/finance/total-paid';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<number>(url, {
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
