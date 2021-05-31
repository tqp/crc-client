import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { VisitTypeModel } from '../../models/types/type-visit.model';

@Injectable({
  providedIn: 'root'
})
export class VisitTypeService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public getVisitTypeList(): Observable<VisitTypeModel[]> {
    const url = environment.apiUrl + '/api/v1/visit-type';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<VisitTypeModel[]>(url, {
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
