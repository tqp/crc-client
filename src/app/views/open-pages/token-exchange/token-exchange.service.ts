import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenExchangeService {

  constructor(protected http: HttpClient) {
  }

  public exchangeToken(shortLivedToken: string): Observable<any> {
    // console.log('TokenExchangeService -> exchangeToken: shortLivedToken=[' + this.shortId(shortLivedToken) + ']');
    const url: string = environment.apiUrl + '/api/v1/token-exchange/exchange';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('responseType', 'text');
    return this.http.post(url, JSON.stringify({key: shortLivedToken}), {
        headers: headers
      }
    );
  }

  public shortId(longId: string): string {
    return longId.substr(longId.length - 10, 10);
  }
}
