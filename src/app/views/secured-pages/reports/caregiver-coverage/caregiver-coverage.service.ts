import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../../@tqp/services/http.service';
import { TokenService } from '../../../../../@tqp/services/token.service';
import { Observable } from 'rxjs';
import { Student } from '../../people/students/Student';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CaregiverCoverageService {
  private studentNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public getCaregiverCoverageList(): Observable<Student[]> {
    const url = environment.apiUrl + '/api/v1/reports/caregiver-coverage';
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
