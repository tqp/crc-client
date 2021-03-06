import { Injectable } from '@angular/core';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { Observable } from 'rxjs';
import { ServerSidePaginationResponse } from '@tqp/models/ServerSidePaginationResponse';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { map } from 'rxjs/operators';
import { CaseManager } from '../../models/people/case-manager.model';
import { AuthService } from '@tqp/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CaseManagerService {
  private caseManagerListNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService,
              public authService: AuthService) {
  }

  // BASIC CRUD

  public createCaseManager(caseManager: CaseManager): Observable<CaseManager> {
    const url = environment.apiUrl + '/api/v1/case-manager/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<CaseManager>(url,
        caseManager,
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

  public getCaseManagerList(): Observable<CaseManager[]> {
    const url = environment.apiUrl + '/api/v1/case-manager/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<CaseManager[]>(url, {
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

  public getCaseManagerList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse<CaseManager>> {
    const url = environment.apiUrl + '/api/v1/case-manager/ssp';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<ServerSidePaginationResponse<CaseManager>>(url,
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

  public getCaseManagerDetail(caseManagerId: number) {
    const url = environment.apiUrl + '/api/v1/case-manager/' + caseManagerId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<CaseManager>(url,
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

  public updateCaseManager(caseManager: CaseManager): Observable<CaseManager> {
    const url = environment.apiUrl + '/api/v1/case-manager/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<CaseManager>(url,
        caseManager,
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

  public deleteCaseManager(caseManagerId: number): Observable<string> {
    console.log('caseManagerId', caseManagerId);
    const url = environment.apiUrl + '/api/v1/case-manager/' + caseManagerId;
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

  public getCurrentCaseManagerDetailByStudentId(studentId: number): Observable<CaseManager> {
    const url = environment.apiUrl + '/api/v1/case-manager/student/' + studentId + '/current';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<CaseManager>(url,
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

  public isTheLoggedInUserTheStudentsCaseManager(studentId: number): Observable<boolean> {
    const username = this.authService.getUserIdFromToken();
    const url = environment.apiUrl + '/api/v1/case-manager/student/' + studentId + '/owner/' + username;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<boolean>(url,
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

  public setCaseManagerListNameSearchValue(val) {
    this.caseManagerListNameSearchValue = val;
  }

  public getCaseManagerListNameSearchValue() {
    return this.caseManagerListNameSearchValue;
  }

}
