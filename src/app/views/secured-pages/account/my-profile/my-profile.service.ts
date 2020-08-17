import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '@tqp/models/User';
import { environment } from '../../../../../environments/environment';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TokenService } from '@tqp/services/token.service';
import { Role } from '@tqp/models/Role';
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

  public getMyUserInfo(): Observable<User> {
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<User>(environment.apiUrl + '/api/v1/my-profile/', {headers: this.httpService.setHeaders(token)}).pipe(
        switchMap(user => {
          return this.http.get<Role[]>(environment.apiUrl + '/api/v1/my-profile/roles', {headers: this.httpService.setHeaders(token)})
            .pipe(
              map(roles => {
                user.roles = roles;
                return user;
              }),
              catchError(e => {
                console.error('Error getting your User and Role information: ' + e);
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
}
