import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CaregiverWorkshop } from '../../models/caregiver-workshop.model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { CaseManagerQualification } from '../../models/case-manager-qualification.model';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { Relationship } from '../../models/relationship.model';

@Injectable({
  providedIn: 'root'
})
export class CaseManagerQualificationService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public createCaseManagerQualification(qualification: CaseManagerQualification): Observable<CaseManagerQualification> {
    const url = environment.apiUrl + '/api/v1/case-manager-qualification/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<CaseManagerQualification>(url,
        qualification,
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

  public getCaseManagerQualificationDetail(caseManagerQualificationId: number): Observable<CaseManagerQualification> {
    const url = environment.apiUrl + '/api/v1/case-manager-qualification/' + caseManagerQualificationId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<CaseManagerQualification>(url,
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

  public updateCaseManagerQualification(qualification: CaseManagerQualification): Observable<CaseManagerQualification> {
    const url = environment.apiUrl + '/api/v1/case-manager-qualification/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<CaseManagerQualification>(url,
        qualification,
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

  public deleteCaseManagerQualification(qualification: CaseManagerQualification): Observable<string> {
    const url = environment.apiUrl + '/api/v1/case-manager-qualification/' + qualification.caseManagerQualificationId;
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

  public getQualificationListByCaseManagerId(caseManagerId: number): Observable<CaseManagerQualification[]> {
    const url = environment.apiUrl + '/api/v1/case-manager-qualification/case-manager/' + caseManagerId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<CaseManagerQualification[]>(url, {
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
