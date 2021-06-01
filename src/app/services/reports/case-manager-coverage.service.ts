import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { Student } from '../../models/people/student.model';

@Injectable({
  providedIn: 'root'
})
export class CaseManagerCoverageService {
  private studentNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public getCaseManagerCoverageList(): Observable<Student[]> {
    const url = environment.apiUrl + '/api/v1/reports/case-manager-coverage';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Student[]>(url, {
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

  public setStudentNameSearchValue(val) {
    this.studentNameSearchValue = val;
  }

  public getStudentNameSearchValue() {
    return this.studentNameSearchValue;
  }
}
