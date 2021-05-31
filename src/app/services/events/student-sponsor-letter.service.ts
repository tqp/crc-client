import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { StudentSponsorLetterModel } from '../../models/student-sponsor-letter.model';

@Injectable({
  providedIn: 'root'
})
export class StudentSponsorLetterService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  // JOINED TABLES

  public getStudentSponsorLetterListByStudentId(studentId: number): Observable<StudentSponsorLetterModel[]> {
    const url = environment.apiUrl + '/api/v1/student-sponsor-letter/student/' + studentId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<StudentSponsorLetterModel[]>(url, {
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

  public getStudentSponsorLetterListBySponsorId(sponsorId: number): Observable<StudentSponsorLetterModel[]> {
    const url = environment.apiUrl + '/api/v1/student-sponsor-letter/sponsor/' + sponsorId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<StudentSponsorLetterModel[]>(url, {
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
