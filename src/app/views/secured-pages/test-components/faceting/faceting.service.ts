import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../../@tqp/services/http.service';
import { TokenService } from '../../../../../@tqp/services/token.service';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FacetPackage } from './models/FacetPackage';

@Injectable({
  providedIn: 'root'
})
export class FacetingService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public runElasticQuery(): Observable<FacetPackage> {
    const url = environment.apiUrl + '/api/v1/faceting';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<FacetPackage>(url,
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
