import { Injectable } from '@angular/core';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { Observable } from 'rxjs';
import { ServerSidePaginationResponse } from '@tqp/models/ServerSidePaginationResponse';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { map } from 'rxjs/operators';
import { CaseManagerRevised } from './CaseManagerRevised';

@Injectable({
  providedIn: 'root'
})
export class CaseManagerRevisedService {
  private caseManagerListNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  // BASIC CRUD

  public getCaseManagerRevisedList(): Observable<CaseManagerRevised[]> {
    const url = environment.apiUrl + '/api/v1/case-manager-revised/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<CaseManagerRevised[]>(url, {
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

  public setCaseManagerRevisedListNameSearchValue(val) {
    this.caseManagerListNameSearchValue = val;
  }

  public getCaseManagerRevisedListNameSearchValue() {
    return this.caseManagerListNameSearchValue;
  }
}
