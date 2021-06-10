import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { Position } from '../../models/Position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public getPositionList() {
    const url = environment.apiUrl + '/api/v1/position/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Position[]>(url,
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
