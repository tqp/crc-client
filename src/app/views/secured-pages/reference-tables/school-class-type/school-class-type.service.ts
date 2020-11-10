import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelationshipType } from '../relationship-type/RelationshipType';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../../@tqp/services/http.service';
import { TokenService } from '../../../../../@tqp/services/token.service';
import { SchoolClassType } from './SchoolClassType';

@Injectable({
  providedIn: 'root'
})
export class SchoolClassTypeService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public getSchoolClassChildListByParentId(parentId: number): Observable<SchoolClassType[]> {
    const url = environment.apiUrl + '/api/v1/school-class-type/child-list/' + parentId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<SchoolClassType[]>(url, {
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
