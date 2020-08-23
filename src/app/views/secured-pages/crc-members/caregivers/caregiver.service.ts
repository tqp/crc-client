import { Injectable } from '@angular/core';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { Observable } from 'rxjs';
import { ServerSidePaginationResponse } from '@tqp/models/ServerSidePaginationResponse';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { map } from 'rxjs/operators';
import { Caregiver } from './Caregiver';
import { Student } from '../students/Student';

@Injectable({
  providedIn: 'root'
})
export class CaregiverService {
  private caregiverListNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

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

  public getCaregiverDetail(guid: string) {
    const url = environment.apiUrl + '/api/v1/caregiver/' + guid;
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

  public deleteCaregiver(caregiverGuid: string): Observable<string> {
    const url = environment.apiUrl + '/api/v1/caregiver/' + caregiverGuid;
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

  public setCaregiverListNameSearchValue(val) {
    this.caregiverListNameSearchValue = val;
  }

  public getCaregiverListNameSearchValue() {
    return this.caregiverListNameSearchValue;
  }
}
