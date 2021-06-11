import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserModel } from 'app/models/user.model';
import { environment } from '../../../environments/environment';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TokenService } from '@tqp/services/token.service';
import { Role } from 'app/models/role.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpService } from '@tqp/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class MyProfileService {

  constructor(private http: HttpClient,
              private router: Router,
              private tokenService: TokenService,
              private httpService: HttpService) {
  }

  public getMyUserInfo(): Observable<UserModel> {
    const user_url = environment.apiUrl + '/api/v1/my-profile';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<UserModel>(user_url, {
        headers: this.httpService.setHeaders(token)
      }).pipe(
        switchMap(user => {
          const user_role_url = environment.apiUrl + '/api/v1/my-profile/roles';
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

  // OTHER

  public updatePassword(user: UserModel): Observable<string> {
    const url = environment.apiUrl + '/api/v1/my-profile/update-password';
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

  public confirmPassword(user: UserModel): Observable<string> {
    const url = environment.apiUrl + '/api/v1/my-profile/confirm-password';
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
}
