import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { TokenService } from './token.service';
import { TokenHelperService } from './token-helper.service';

import * as moment from 'moment';
import { Token } from '@tqp/models/Token';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(protected http: HttpClient,
              protected tokenService: TokenService,
              protected tokenHelperService: TokenHelperService,
              protected router: Router) {
  }

  private tokenInfo: Token;

  public attemptAuth(username: string, password: string): Observable<any> {
    // console.log('AuthService -> attemptAuth: username=' + username + ', password=' + password);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset-utf-8');
    const body = {username, password};
    return this.http.post(environment.apiUrl + '/api/v1/auth/internal', body, {headers: headers});
  }

  public isAuthenticated(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const token = this.tokenService.getToken();
      if (token) {
        const decodedToken = this.tokenHelperService.decodeToken(token);
        if (decodedToken) {
          // console.log('decodedToken', decodedToken);
          const iat = moment(decodedToken.iat * 1000).format('MM/DD/YYYY HH:mm');
          const exp = moment(decodedToken.exp * 1000).format('MM/DD/YYYY HH:mm');
          const sub = decodedToken.sub;
          observer.next(moment(decodedToken.exp * 1000).isAfter(moment()));
        } else {
          console.error('Token could not be decoded.');
          observer.next(false);
        }
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }

  public getTokenInfo(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const token = this.tokenService.getToken();
      if (token) {
        const decodedToken = this.tokenHelperService.decodeToken(token);
        this.tokenInfo = new Token();
        if (decodedToken) {
          // console.log('decodedToken', decodedToken);
          this.tokenInfo.iat = decodedToken.iat;
          this.tokenInfo.exp = decodedToken.exp;
          this.tokenInfo.sub = decodedToken.sub;
          this.tokenInfo.authorities = decodedToken.authorities;
          this.tokenInfo.rawToken = token;
        } else {
          console.error('Token could not be decoded.');
        }
        observer.next(this.tokenInfo);
        observer.complete();
      } else {
        // console.error('No token was present.');
        observer.error(null);
        observer.complete();
      }
    });
  }

  public getAuthoritiesFromToken(): string {
    let authorities: string = null;
    this.getTokenInfo().subscribe(
      response => {
        const token: Token = response;
        authorities = token.authorities;
      },
      error => {
        // Do nothing
      }
    );
    return authorities;
  }

  public clearTokenInfo(): void {
    this.tokenInfo = null;
  }

  // GOOGLE AUTH

  public getGoogleAuthConfig(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset-utf-8');
    return this.http.get(environment.apiUrl + '/api/v1/google-auth/get-google-auth-config', {headers: headers});
  }

  // SUPPORT

  public errorHandler(error): void {
    let errorMessage = 'An unknown error occurred.';
    if (error.status) {
      switch (error.status) {
        case 401:
          errorMessage = 'Your session timed-out.';
          this.tokenService.clearToken();
          this.clearTokenInfo();
          this.router.navigate(['/login-page'], {queryParams: {error: errorMessage}}).then();
          break;
        case 403:
          errorMessage = 'A permissions issue was encountered when accessing that page.';
          this.router.navigate(['/login-page'], {queryParams: {error: errorMessage}}).then();
          break;
        case 404:
          errorMessage = 'That page could not be found.';
          this.router.navigate(['/login-page'], {queryParams: {error: errorMessage}}).then();
          break;
        default:
          errorMessage = 'An error was encountered.';
          this.router.navigate(['/login-page'], {queryParams: {error: errorMessage}}).then();
          break;
      }
    } else {
      this.router.navigateByUrl('/open-pages/login').then();
    }
  }

  // // ANGULAR COMPONENT RESTRICTIONS
  // public displayComponent(item: FuseNavigationItem, authorities: string): boolean {
  //   if (item.role && authorities) {
  //     // console.log('Menu Item: ' + item.title + ', Role Needed: ' + item.role + ', User Roles: ' + authorities);
  //     return authorities.indexOf(item.role) > -1;
  //   }
  //   return false; // If no role is listed, default option is to display
  // }

  public allowRoles(allowedRoles: string, tag: string): boolean {
    const allowedRolesArray = allowedRoles.replace(' ', '').split(',');
    const myRoles = this.getAuthoritiesFromToken();
    const intersection = allowedRolesArray.filter(element => myRoles.includes(element));
    // console.log('Tag:', tag);
    // console.log('allowedRoles', allowedRoles);
    // console.log('allowedRolesArray', allowedRolesArray);
    // console.log('myRoles', myRoles);
    // console.log('intersection', intersection);
    return intersection.length <= 0;
  }

}
