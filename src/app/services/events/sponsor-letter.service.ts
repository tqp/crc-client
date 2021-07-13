import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { SponsorLetter } from '../../models/sponsor.letter';

@Injectable({
  providedIn: 'root'
})
export class SponsorLetterService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public createSponsorLetter(sponsorLetter: SponsorLetter): Observable<SponsorLetter> {
    const url = environment.apiUrl + '/api/v1/sponsor-letter/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<SponsorLetter>(url,
        sponsorLetter,
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

  public getSponsorLetterList() {
    const url = environment.apiUrl + '/api/v1/sponsor-letter/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<SponsorLetter>(url,
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

  public getSponsorLetterDetail(sponsorLetterId: number) {
    const url = environment.apiUrl + '/api/v1/sponsor-letter/' + sponsorLetterId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<SponsorLetter>(url,
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

  public updateSponsorLetter(sponsorLetter: SponsorLetter): Observable<SponsorLetter> {
    const url = environment.apiUrl + '/api/v1/sponsor-letter/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<SponsorLetter>(url,
        sponsorLetter,
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

  public deleteSponsorLetter(sponsorLetterId: number): Observable<string> {
    const url = environment.apiUrl + '/api/v1/sponsor-letter/' + sponsorLetterId;
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

  public getSponsorLetterListByStudentId(studentId: number): Observable<SponsorLetter[]> {
    const url = environment.apiUrl + '/api/v1/sponsor-letter/student/' + studentId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<SponsorLetter[]>(url, {
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

  public getSponsorLetterListBySponsorId(sponsorId: number): Observable<SponsorLetter[]> {
    const url = environment.apiUrl + '/api/v1/sponsor-letter/sponsor/' + sponsorId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<SponsorLetter[]>(url, {
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
