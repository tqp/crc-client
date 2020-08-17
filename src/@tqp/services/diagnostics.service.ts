import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticsService {

  constructor(protected http: HttpClient,
              protected tokenService: TokenService) {
  }

  public getOpenEndpoint(): Observable<any> {
    // Even though this is an open endpoint, we use the token for auditing the request's username.
    const token = this.tokenService.getToken();
    if (token) {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + token);
      return this.http.get(environment.apiUrl + '/api/v1/diagnostics/endpoint/open', {headers: headers});
    } else {
      console.error('No token was present.');
      return null;
    }
  }

  public getUserEndpoint(): Observable<any> {
    const token = this.tokenService.getToken();
    if (token) {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + token);
      return this.http.get(environment.apiUrl + '/api/v1/diagnostics/endpoint/user', {headers: headers});
    } else {
      console.error('No token was present.');
      return null;
    }
  }

  public getManagerEndpoint(): Observable<any> {
    const token = this.tokenService.getToken();
    if (token) {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + token);
      return this.http.get(environment.apiUrl + '/api/v1/diagnostics/endpoint/manager', {headers: headers});
    } else {
      console.error('No token was present.');
      return null;
    }
  }

  public getAdminEndpoint(): Observable<any> {
    const token = this.tokenService.getToken();
    if (token) {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + token);
      return this.http.get(environment.apiUrl + '/api/v1/diagnostics/endpoint/admin', {headers: headers});
    } else {
      console.error('No token was present.');
      return null;
    }
  }

  public getDeveloperEndpoint(): Observable<any> {
    const token = this.tokenService.getToken();
    if (token) {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + token);
      return this.http.get(environment.apiUrl + '/api/v1/diagnostics/endpoint/developer', {headers: headers});
    } else {
      console.error('No token was present.');
      return null;
    }
  }
}
