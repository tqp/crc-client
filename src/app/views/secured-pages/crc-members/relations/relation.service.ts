import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Relationship } from '../students/Relationship';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { Person } from '@tqp/models/Person';
import { PersonEntity } from '../PersonEntity';
import { Caregiver } from '../caregivers/Caregiver';
import { Relation } from './Relation';

@Injectable({
  providedIn: 'root'
})
export class RelationService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public getRelationDetail(relationId: number) {
    const url = environment.apiUrl + '/api/v1/relation/' + relationId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Relation>(url,
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
