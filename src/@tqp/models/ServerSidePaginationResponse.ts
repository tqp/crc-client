import { ServerSidePaginationRequest } from './ServerSidePaginationRequest';
import { Student } from '../../app/views/secured-pages/crc-members/students/student-models/Student';

export class ServerSidePaginationResponse {
  public data: Student[];
  public loadedRecords: number;
  public totalRecords: number;
  public requestTime: number;
  public serverSidePaginationRequest: ServerSidePaginationRequest;
}
