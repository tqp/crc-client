import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ServicesProvidedType } from '../../reference-tables/services-provided-type/ServicesProvidedType';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../../@tqp/services/http.service';
import { TokenService } from '../../../../../@tqp/services/token.service';
import { Role } from './Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public getRoleList() {
    const url = environment.apiUrl + '/api/v1/role/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Role[]>(url,
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
