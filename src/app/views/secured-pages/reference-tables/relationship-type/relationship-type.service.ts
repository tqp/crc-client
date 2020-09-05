import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../../@tqp/services/http.service';
import { TokenService } from '../../../../../@tqp/services/token.service';
import { RelationshipType } from './RelationshipType';

@Injectable({
  providedIn: 'root'
})
export class RelationshipTypeService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public getRelationshipTypeList() {
    const url = environment.apiUrl + '/api/v1/relationship-type/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<RelationshipType[]>(url,
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
