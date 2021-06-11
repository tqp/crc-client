import { Injectable } from '@angular/core';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { Observable, throwError } from 'rxjs';
import { ServerSidePaginationResponse } from '@tqp/models/ServerSidePaginationResponse';
import { environment } from '../../../environments/environment';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { UserModel } from '../../models/user.model';
import { Role } from '../../models/role.model';
import { Router } from '@angular/router';
import { Student } from '../../models/people/student.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userListNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService,
              private router: Router) {
  }

  public createUser(user: UserModel): Observable<UserModel> {
    const url = environment.apiUrl + '/api/v1/user/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<UserModel>(url,
        user,
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

  public getUserList(): Observable<UserModel[]> {
    const url = environment.apiUrl + '/api/v1/user';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<UserModel[]>(url, {
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

  public getUserList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse<UserModel>> {
    const url = environment.apiUrl + '/api/v1/user/ssp';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<ServerSidePaginationResponse<UserModel>>(url,
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

  public getUserDetail(userId: number): Observable<UserModel> {
    const user_url = environment.apiUrl + '/api/v1/user/' + userId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<UserModel>(user_url, {
        headers: this.httpService.setHeaders(token)
      }).pipe(
        switchMap(user => {
          // console.log('user', user);
          const user_role_url = environment.apiUrl + '/api/v1/role/user-id/' + userId;
          return this.http.get<Role[]>(user_role_url, {
            headers: this.httpService.setHeaders(token),
          })
            .pipe(
              map(roles => {
                user.roles = roles;
                return user;
              }),
              catchError(e => {
                console.error('Error getting your UserModel and Role information: ' + e);
                return throwError(e);
              })
            );
        })
      );
    } else {
      console.error('No Token was present.');
      this.router.navigate(['/login-page']).then();
    }
  }

  public getUserDetailByUsername(username: string) {
    const url = environment.apiUrl + '/api/v1/user/username/' + username;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<UserModel>(url,
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

  public updateUser(user: UserModel): Observable<UserModel> {
    const url = environment.apiUrl + '/api/v1/user/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<UserModel>(url,
        user,
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

  public deleteUser(user: UserModel): Observable<string> {
    const url = environment.apiUrl + '/api/v1/user/' + user.userId;
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

  // OTHER

  public updatePassword(user: UserModel): Observable<string> {
    const url = environment.apiUrl + '/api/v1/user/update-password';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<string>(url,
        user,
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

  public resetPassword(user: UserModel): Observable<string> {
    const url = environment.apiUrl + '/api/v1/user/reset-password';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<string>(url,
        user,
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

  // PERSISTENT VARIABLES

  public setUserListNameSearchValue(val) {
    this.userListNameSearchValue = val;
  }

  public getUserListNameSearchValue() {
    return this.userListNameSearchValue;
  }
}
