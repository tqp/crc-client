import { Injectable } from '@angular/core';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { Observable } from 'rxjs';
import { ServerSidePaginationResponse } from '@tqp/models/ServerSidePaginationResponse';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { PostGradEvent } from '../../models/post-grad-event.model';

@Injectable({
  providedIn: 'root'
})
export class PostGradEventService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }


  // BASIC CRUD

  public createPostGradEvent(postGradEvent: PostGradEvent): Observable<PostGradEvent> {
    const url = environment.apiUrl + '/api/v1/post-grad-event/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<PostGradEvent>(url,
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

  public getPostGradEventList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse<PostGradEvent>> {
    const url = environment.apiUrl + '/api/v1/post-grad-event/post-grad-event-list/ssp';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<ServerSidePaginationResponse<PostGradEvent>>(url,
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

  public getPostGradEventDetail(postGradEventId: number) {
    const url = environment.apiUrl + '/api/v1/post-grad-event/' + postGradEventId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<PostGradEvent>(url,
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

  public updatePostGradEvent(postGradEvent: PostGradEvent): Observable<PostGradEvent> {
    const url = environment.apiUrl + '/api/v1/post-grad-event/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<PostGradEvent>(url,
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

  public deletePostGradEvent(postGradEventId: number): Observable<string> {
    const url = environment.apiUrl + '/api/v1/post-grad-event/' + postGradEventId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.delete<string>(url,
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

  // JOINED TABLES

  public getPostGradEventListByStudentId(studentId: number): Observable<PostGradEvent[]> {
    const url = environment.apiUrl + '/api/v1/post-grad-event/student/' + studentId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<PostGradEvent[]>(url, {
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
