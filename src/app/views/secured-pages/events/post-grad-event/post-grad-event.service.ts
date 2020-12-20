import { Injectable } from '@angular/core';
import { ServerSidePaginationRequest } from '../../../../../@tqp/models/ServerSidePaginationRequest';
import { Observable } from 'rxjs';
import { ServerSidePaginationResponse } from '../../../../../@tqp/models/ServerSidePaginationResponse';
import { Csi } from '../csi/Csi';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../../@tqp/services/http.service';
import { TokenService } from '../../../../../@tqp/services/token.service';
import { PostGradEvent } from '../../relationships/student-post-grad-event-edit-dialog/PostGradEvent';

@Injectable({
  providedIn: 'root'
})
export class PostGradEventService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }


  // BASIC CRUD

  public createPostGradEvent(postGradEvent: PostGradEvent): Observable<Csi> {
    const url = environment.apiUrl + '/api/v1/post-grad-event/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Csi>(url,
        postGradEvent,
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

  public getPostGradEventList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse<Csi>> {
    const url = environment.apiUrl + '/api/v1/post-grad-event/post-grad-event-list/ssp';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<ServerSidePaginationResponse<Csi>>(url,
        serverSideSearchParams,
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
