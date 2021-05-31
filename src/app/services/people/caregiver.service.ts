import { Injectable } from '@angular/core';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { Observable } from 'rxjs';
import { ServerSidePaginationResponse } from '@tqp/models/ServerSidePaginationResponse';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { map } from 'rxjs/operators';
import { Caregiver } from '../../models/people/caregiver.model';

@Injectable({
  providedIn: 'root'
})
export class CaregiverService {
  private caregiverListNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  // BASIC CRUD

  public createCaregiver(caregiver: Caregiver): Observable<Caregiver> {
    const url = environment.apiUrl + '/api/v1/caregiver/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Caregiver>(url,
        caregiver,
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

  public getCaregiverList(): Observable<Caregiver[]> {
    const url = environment.apiUrl + '/api/v1/caregiver/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Caregiver[]>(url, {
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

  public getCaregiverList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse<Caregiver>> {
    const url = environment.apiUrl + '/api/v1/caregiver/ssp';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<ServerSidePaginationResponse<Caregiver>>(url,
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

  public getCaregiverDetail(caregiverId: number) {
    const url = environment.apiUrl + '/api/v1/caregiver/' + caregiverId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Caregiver>(url,
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

  public updateCaregiver(caregiver: Caregiver): Observable<Caregiver> {
    const url = environment.apiUrl + '/api/v1/caregiver/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Caregiver>(url,
        caregiver,
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

  public deleteCaregiver(caregiverId: number): Observable<string> {
    const url = environment.apiUrl + '/api/v1/caregiver/' + caregiverId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.delete<string>(url,
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

  // JOINED QUERIES

  public getCurrentCaregiverDetailByStudentId(studentId: number): Observable<Caregiver> {
    const url = environment.apiUrl + '/api/v1/caregiver/student/' + studentId + '/current';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Caregiver>(url,
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

  public getCaregiverWithLoanList(): Observable<Caregiver[]> {
    const url = environment.apiUrl + '/api/v1/caregiver/with-loan';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Caregiver[]>(url,
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

  // PERSISTENT FIELDS

  public setCaregiverListNameSearchValue(val) {
    this.caregiverListNameSearchValue = val;
  }

  public getCaregiverListNameSearchValue() {
    return this.caregiverListNameSearchValue;
  }
}
