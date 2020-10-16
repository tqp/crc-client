import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../../@tqp/services/http.service';
import { TokenService } from '../../../../../@tqp/services/token.service';
import { Sponsor } from '../sponsors/Sponsor';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ServerSidePaginationRequest } from '../../../../../@tqp/models/ServerSidePaginationRequest';
import { ServerSidePaginationResponse } from '../../../../../@tqp/models/ServerSidePaginationResponse';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {
  private sponsorListNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public createSponsor(sponsor: Sponsor): Observable<Sponsor> {
    const url = environment.apiUrl + '/api/v1/sponsor/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Sponsor>(url,
        sponsor,
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

  public getSponsorList(): Observable<Sponsor[]> {
    const url = environment.apiUrl + '/api/v1/sponsor/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Sponsor[]>(url, {
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

  public getSponsorList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse<Sponsor>> {
    const url = environment.apiUrl + '/api/v1/sponsor/ssp';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<ServerSidePaginationResponse<Sponsor>>(url,
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

  public getSponsorDetail(sponsorId: number) {
    const url = environment.apiUrl + '/api/v1/sponsor/' + sponsorId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Sponsor>(url,
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

  public updateSponsor(sponsor: Sponsor): Observable<Sponsor> {
    const url = environment.apiUrl + '/api/v1/sponsor/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Sponsor>(url,
        sponsor,
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

  public deleteSponsor(sponsorId: number): Observable<string> {
    const url = environment.apiUrl + '/api/v1/sponsor/' + sponsorId;
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

  // Relationship

  public getSponsorDetailByStudentId(studentId: number): Observable<Sponsor> {
    const url = environment.apiUrl + '/api/v1/sponsor/student/' + studentId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Sponsor>(url,
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

  // Remembered Fields

  public setSponsorListNameSearchValue(val) {
    this.sponsorListNameSearchValue = val;
  }

  public getSponsorListNameSearchValue() {
    return this.sponsorListNameSearchValue;
  }
}
