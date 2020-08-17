import { Person } from './Person';
import { ServerSidePaginationRequest } from './ServerSidePaginationRequest';

export class ServerSidePaginationResponse {
  public data: Person[];
  public loadedRecords: number;
  public totalRecords: number;
  public requestTime: number;
  public serverSidePaginationRequest: ServerSidePaginationRequest;
}
