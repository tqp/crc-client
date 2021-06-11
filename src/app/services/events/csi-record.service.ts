import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { ServerSidePaginationResponse } from '@tqp/models/ServerSidePaginationResponse';
import { CsiRecord } from '../../models/csi-record.model';

@Injectable({
  providedIn: 'root'
})
export class CsiRecordService {
  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  // BASIC CRUD

  public createCsiRecord(csiRecord: CsiRecord): Observable<CsiRecord> {
    const url = environment.apiUrl + '/api/v1/csi-record/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<CsiRecord>(url,
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

  public getCsiRecordList(): Observable<CsiRecord[]> {
    const url = environment.apiUrl + '/api/v1/csi-record/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<CsiRecord[]>(url, {
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

  public getCsiRecordList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse<CsiRecord>> {
    const url = environment.apiUrl + '/api/v1/csi-record/ssp';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<ServerSidePaginationResponse<CsiRecord>>(url,
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

  public getCsiRecordDetail(csiRecordId: number): Observable<CsiRecord> {
    const url = environment.apiUrl + '/api/v1/csi-record/' + csiRecordId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<CsiRecord>(url,
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

  public updateCsiRecord(csiRecord: CsiRecord): Observable<CsiRecord> {
    const url = environment.apiUrl + '/api/v1/csi-record/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<CsiRecord>(url,
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

  public deleteCsiRecord(csiRecordId: number): Observable<string> {
    const url = environment.apiUrl + '/api/v1/csi-record/' + csiRecordId;
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

  public getCsiRecordListByStudentId(studentId: number): Observable<CsiRecord[]> {
    const url = environment.apiUrl + '/api/v1/csi-record/student/' + studentId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<CsiRecord[]>(url, {
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

  public getMostRecentCsiRecordScoresByStudentId(studentId: number): Observable<CsiRecord> {
    const url = environment.apiUrl + '/api/v1/csi-record/recent-scores/student/' + studentId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<CsiRecord>(url, {
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

  public getCsiRecordListByCaseManagerId(caseManagerId: number): Observable<CsiRecord[]> {
    const url = environment.apiUrl + '/api/v1/csi-record/case-manager/' + caseManagerId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<CsiRecord[]>(url, {
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
