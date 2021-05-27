import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '@tqp/services/http.service';
import {TokenService} from '@tqp/services/token.service';
import {PersonType} from '../models/types/type-person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonTypeService {
  private personTypeNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public getPersonTypeList(): Observable<PersonType[]> {
    const url = environment.apiUrl + '/api/v1/person-type';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<PersonType[]>(url, {
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

  public setPersonTypeNameSearchValue(val) {
    this.personTypeNameSearchValue = val;
  }

  public getPersonTypeNameSearchValue() {
    return this.personTypeNameSearchValue;
  }
}
