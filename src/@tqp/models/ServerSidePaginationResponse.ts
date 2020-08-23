import { ServerSidePaginationRequest } from './ServerSidePaginationRequest';
import { Student } from '../../app/views/secured-pages/crc-members/students/Student';

export class ServerSidePaginationResponse<T> {
  public data: T[];
  public loadedRecords: number;
  public totalRecords: number;
  public requestTime: number;
  public serverSidePaginationRequest: ServerSidePaginationRequest;
}
