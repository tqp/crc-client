import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { PostGradEventType } from './PostGradEventType';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../../@tqp/services/http.service';
import { TokenService } from '../../../../../@tqp/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class PostGradEventTypeService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public getPostGradEventTypeList() {
    const url = environment.apiUrl + '/api/v1/post-grad-event-type/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<PostGradEventType[]>(url,
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
