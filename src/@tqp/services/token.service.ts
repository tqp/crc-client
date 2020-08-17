import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private TOKEN_ID = 'AuthToken';

  constructor() {
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN_ID);
    window.sessionStorage.setItem(this.TOKEN_ID, token);
    localStorage.removeItem(this.TOKEN_ID);
    localStorage.setItem(this.TOKEN_ID, token);
  }

  public getToken(): string {
    // return localStorage.getItem(this.TOKEN_ID);
    return window.sessionStorage.getItem(this.TOKEN_ID);
  }

  public clearToken(): void {
    window.sessionStorage.removeItem(this.TOKEN_ID);
    window.sessionStorage.clear();
    localStorage.removeItem(this.TOKEN_ID);
    localStorage.clear();
  }

  public setAuthorizationHeader(token: string): any {
    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + token);
  }
}
