import { Injectable } from '@angular/core';
import { ServerSidePaginationRequest } from '../../../../@tqp/models/ServerSidePaginationRequest';
import { Observable } from 'rxjs';
import { ServerSidePaginationResponse } from '../../../../@tqp/models/ServerSidePaginationResponse';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../@tqp/services/http.service';
import { TokenService } from '../../../../@tqp/services/token.service';
import { Loan } from './Loan';
import { Payment } from './Payment';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public addPayment(payment: Payment): Observable<Payment> {
    const url = environment.apiUrl + '/api/v1/finance/payment/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Payment>(url,
        payment,
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

  public getFinanceListByParticipant_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse<Loan>> {
    const url = environment.apiUrl + '/api/v1/finance/report-by-participant/ssp';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<ServerSidePaginationResponse<Loan>>(url,
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

  public getPaymentList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse<Loan>> {
    const url = environment.apiUrl + '/api/v1/finance/payment-list/ssp';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<ServerSidePaginationResponse<Loan>>(url,
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

  public getLoanListByCaregiverId(caregiverId: string): Observable<Loan[]> {
    const url = environment.apiUrl + '/api/v1/finance/loan/caregiver/' + caregiverId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Loan[]>(url, {
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
