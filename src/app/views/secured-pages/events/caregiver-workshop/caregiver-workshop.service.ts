import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { CaregiverWorkshop } from '../../../../models/caregiver-workshop.model';

@Injectable({
  providedIn: 'root'
})
export class CaregiverWorkshopService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public createCaregiverWorkshop(workshop: CaregiverWorkshop): Observable<CaregiverWorkshop> {
    const url = environment.apiUrl + '/api/v1/caregiver-workshop/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<CaregiverWorkshop>(url,
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

  public getCaregiverWorkshopDetail(caregiverWorkshopId: number): Observable<CaregiverWorkshop> {
    const url = environment.apiUrl + '/api/v1/caregiver-workshop/' + caregiverWorkshopId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<CaregiverWorkshop>(url,
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

  public updateCaregiverWorkshop(caregiverWorkshop: CaregiverWorkshop): Observable<CaregiverWorkshop> {
    const url = environment.apiUrl + '/api/v1/caregiver-workshop/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<CaregiverWorkshop>(url,
        caregiverWorkshop,
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

  public deleteCaregiverWorkshop(caregiverWorkshop: CaregiverWorkshop): Observable<string> {
    const url = environment.apiUrl + '/api/v1/caregiver-workshop/' + caregiverWorkshop.caregiverWorkshopId;
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

  public getWorkshopListByCaregiverId(caregiverId: number): Observable<CaregiverWorkshop[]> {
    const url = environment.apiUrl + '/api/v1/caregiver-workshop/caregiver/' + caregiverId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<CaregiverWorkshop[]>(url, {
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
