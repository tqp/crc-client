import { ServerSidePaginationRequest } from './ServerSidePaginationRequest';
import { Student } from '../../app/models/people/student.model';

export class ServerSidePaginationResponse<T> {
  public data: T[];
  public loadedRecords: number;
  public totalRecords: number;
  public requestTime: number;
  public serverSidePaginationRequest: ServerSidePaginationRequest;
}
