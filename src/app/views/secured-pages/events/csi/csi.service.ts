import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { ServerSidePaginationResponse } from '@tqp/models/ServerSidePaginationResponse';
import { Csi } from './Csi';

@Injectable({
  providedIn: 'root'
})
export class CsiService {
  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  // BASIC CRUD

  public createCsi(csiRecord: Csi): Observable<Csi> {
    const url = environment.apiUrl + '/api/v1/csi/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Csi>(url,
        csiRecord,
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

  public getCsiList(): Observable<Csi[]> {
    const url = environment.apiUrl + '/api/v1/csi/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Csi[]>(url, {
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

  public getCsiList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse<Csi>> {
    const url = environment.apiUrl + '/api/v1/csi/ssp';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<ServerSidePaginationResponse<Csi>>(url,
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

  public getCsiDetail(id: number): Observable<Csi> {
    const url = environment.apiUrl + '/api/v1/csi/' + id;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Csi>(url,
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

  public updateCsi(csiRecord: Csi): Observable<Csi> {
    const url = environment.apiUrl + '/api/v1/csi/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Csi>(url,
        csiRecord,
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

  public deleteCsi(csiId: number): Observable<string> {
    const url = environment.apiUrl + '/api/v1/csi/' + csiId;
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

  // JOINED TABLES

  public getCsiListByStudentId(studentId: number): Observable<Csi[]> {
    const url = environment.apiUrl + '/api/v1/csi/student/' + studentId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Csi[]>(url, {
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

  public getCsiListByCaseManagerId(caseManagerId: number): Observable<Csi[]> {
    const url = environment.apiUrl + '/api/v1/csi/case-manager/' + caseManagerId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Csi[]>(url, {
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
