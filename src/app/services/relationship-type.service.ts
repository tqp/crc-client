import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '@tqp/services/http.service';
import {TokenService} from '@tqp/services/token.service';
import {Observable} from 'rxjs';
import {RelationshipType} from '../models/types/type-relationship.model';

@Injectable({
  providedIn: 'root'
})
export class RelationshipTypeService {
  private relationshipTypeNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public getRelationshipTypeList(): Observable<RelationshipType[]> {
    const url = environment.apiUrl + '/api/v1/relationship-type';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<RelationshipType[]>(url, {
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

  public setRelationshipTypeNameSearchValue(val) {
    this.relationshipTypeNameSearchValue = val;
  }

  public getRelationshipTypeNameSearchValue() {
    return this.relationshipTypeNameSearchValue;
  }
}
