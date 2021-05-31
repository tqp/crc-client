import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { ServicesProvidedType } from '../../models/types/type-services-provided.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesProvidedTypeService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public getServicesProvidedTypeList() {
    const url = environment.apiUrl + '/api/v1/services-provided-type/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<ServicesProvidedType[]>(url,
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
