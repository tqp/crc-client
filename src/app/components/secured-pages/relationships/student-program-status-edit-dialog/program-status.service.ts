import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { ProgramStatusPackage } from './ProgramStatusPackage';
import { ProgramStatus } from './ProgramStatus';

@Injectable({
  providedIn: 'root'
})
export class ProgramStatusService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public getProgramStatusPackage(parentId): Observable<ProgramStatusPackage> {
    const url = environment.apiUrl + '/api/v1/program-status/' + parentId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<ProgramStatusPackage>(url, {
        headers: this.httpService.setHeadersWithToken()
      })
        .pipe(
          switchMap((programStatusPackage: ProgramStatusPackage) => {
            const url2 = environment.apiUrl + '/api/v1/program-status/child-list/' + parentId;
            return this.http.get<ProgramStatusPackage[]>(url2, {
              headers: this.httpService.setHeaders(token),
            })
              .pipe(
                map(childProgramStatusPackage => {
                  programStatusPackage.childProgramStatusList = childProgramStatusPackage;
                  return programStatusPackage;
                }),
                catchError(e => {
                  console.error('Error getting your User and Role information: ' + e);
                  return throwError(e);
                })
              );
          })
        );
    } else {
      console.error('No token was present.');
      return null;
    }
  }

  // Relationship

  public getProgramStatusDetailByStudentId(studentId: number): Observable<ProgramStatus> {
    const url = environment.apiUrl + '/api/v1/program-status/student/' + studentId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<ProgramStatus>(url,
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
}
