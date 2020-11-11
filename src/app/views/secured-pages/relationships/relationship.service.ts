import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../@tqp/services/http.service';
import { TokenService } from '../../../../@tqp/services/token.service';
import { Relationship } from './Relationship';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Caregiver } from '../people/caregivers/Caregiver';
import { CaseManager } from '../people/case-managers/CaseManager';
import { Sponsor } from '../people/sponsors/Sponsor';
import { Student } from '../people/students/Student';
import { ProgramStatus } from './ProgramStatus';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  // CAREGIVER

  public createCaregiverRelationship(relationship: Relationship): Observable<Relationship> {
    const url = environment.apiUrl + '/api/v1/relationship/caregiver';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Relationship>(url,
        relationship,
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

  public getStudentListByCaregiverId(caregiverId: number): Observable<Student[]> {
    const url = environment.apiUrl + '/api/v1/relationship/caregiver/' + caregiverId;
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

  public updateCaregiverRelationship(relationship: Relationship): Observable<Relationship> {
    const url = environment.apiUrl + '/api/v1/relationship/caregiver';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Relationship>(url,
        relationship,
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

  public deleteCaregiverRelationship(relationshipId: number): Observable<string> {
    const url = environment.apiUrl + '/api/v1/relationship/caregiver/' + relationshipId;
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

  // CASE MANAGER

  public createCaseManagerRelationship(relationship: Relationship): Observable<Relationship> {
    const url = environment.apiUrl + '/api/v1/relationship/case-manager';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Relationship>(url,
        relationship,
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

  public getStudentListByCaseManagerId(caseManagerId: number): Observable<Student[]> {
    const url = environment.apiUrl + '/api/v1/relationship/case-manager/' + caseManagerId;
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

  // SPONSOR

  public createSponsorRelationship(relationship: Relationship): Observable<Relationship> {
    const url = environment.apiUrl + '/api/v1/relationship/sponsor';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Relationship>(url,
        relationship,
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

  public getStudentListBySponsorId(sponsorId: number): Observable<Student[]> {
    const url = environment.apiUrl + '/api/v1/relationship/sponsor/' + sponsorId;
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

  // PROGRAM STATUS

  public createProgramStatusRelationship(programStatus: ProgramStatus): Observable<ProgramStatus> {
    const url = environment.apiUrl + '/api/v1/relationship/program-status';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<ProgramStatus>(url,
        programStatus,
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
