import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Student} from '../../crc-members/students/Student';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '@tqp/services/http.service';
import {TokenService} from '@tqp/services/token.service';
import {TierType} from './TierType';

@Injectable({
  providedIn: 'root'
})
export class TierTypeService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public getTierTypeList() {
    const url = environment.apiUrl + '/api/v1/tier-type/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<TierType[]>(url,
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
