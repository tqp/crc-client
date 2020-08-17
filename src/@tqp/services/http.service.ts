import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private tokenService: TokenService) {
  }

  public setHeaders(token: string): any {
    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset-utf-8')
      .set('Authorization', 'Bearer ' + token);
  }

  public setHeadersWithToken(): any {
    const token = this.tokenService.getToken();
    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset-utf-8')
      .set('Authorization', 'Bearer ' + token);
  }


}
