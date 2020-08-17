import { Injectable } from '@angular/core';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { Observable } from 'rxjs';
import { ServerSidePaginationResponse } from '@tqp/models/ServerSidePaginationResponse';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { map } from 'rxjs/operators';
import { Student } from './student-models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentListNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public createStudent(student: Student): Observable<Student> {
    const url = environment.apiUrl + '/api/v1/student/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Student>(url,
        student,
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

  public getStudentList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse> {
    const url = environment.apiUrl + '/api/v1/student/ssp';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<ServerSidePaginationResponse>(url,
        serverSideSearchParams,
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

  public getStudentDetail(guid: string) {
    const url = environment.apiUrl + '/api/v1/student/' + guid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Student>(url,
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

  public updateStudent(student: Student): Observable<Student> {
    const url = environment.apiUrl + '/api/v1/student/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Student>(url,
        student,
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

  public deleteStudent(studentGuid: string): Observable<string> {
    const url = environment.apiUrl + '/api/v1/student/' + studentGuid;
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

  public setStudentListNameSearchValue(val) {
    this.studentListNameSearchValue = val;
  }

  public getStudentListNameSearchValue() {
    return this.studentListNameSearchValue;
  }
}
