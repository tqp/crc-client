import { ServerSidePaginationRequest } from './ServerSidePaginationRequest';

export class ServerSidePaginationResponse<T> {
  public data: T[];
  public loadedRecords: number;
  public totalRecords: number;
  public requestTime: number;
  public serverSidePaginationRequest: ServerSidePaginationRequest;
}
