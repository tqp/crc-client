import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '@tqp/models/Person';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public getServerBuildTimestamp(): Observable<Person[]> {
    const url = environment.apiUrl + '/api/v1/health-check/build-timestamp/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<any>(url, {
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

  public saveScreenResolution(): Observable<any> {
    const url = environment.apiUrl + '/api/v1/user/screen-resolution';
    const token = this.tokenService.getToken();
    const screenResolution = window.innerWidth + 'x' + window.innerHeight;
    if (token) {
      return this.http.put<any>(url,
        screenResolution,
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

}
