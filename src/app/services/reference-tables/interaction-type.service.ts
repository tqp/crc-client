import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { Observable } from 'rxjs';
import { VisitTypeModel } from '../../models/types/type-visit.model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { InteractionType } from '../../models/types/type-interaction.model';

@Injectable({
  providedIn: 'root'
})
export class InteractionTypeService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public getInteractionTypeList(): Observable<InteractionType[]> {
    const url = environment.apiUrl + '/api/v1/interaction-type';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<InteractionType[]>(url, {
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
