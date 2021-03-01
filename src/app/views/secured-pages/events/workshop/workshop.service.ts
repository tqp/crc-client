import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { Workshop } from './Workshop';
import { Relationship } from '../../relationships/Relationship';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public createCaregiverWorkshopEvent(workshop: Workshop): Observable<Relationship> {
    const url = environment.apiUrl + '/api/v1/workshop/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Relationship>(url,
        workshop,
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

  public getWorkshopListByCaregiverId(caregiverId: number): Observable<Workshop[]> {
    const url = environment.apiUrl + '/api/v1/workshop/caregiver/' + caregiverId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Workshop[]>(url, {
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
