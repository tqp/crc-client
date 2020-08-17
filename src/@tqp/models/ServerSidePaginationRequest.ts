import { Person } from './Person';

export class ServerSidePaginationRequest {
  public nameFilter?: string;
  public stateFilter?: string;
  public sortColumn?: string;
  public sortDirection?: string;
  public pageIndex?: number;
  public pageSize?: number;
  public advancedFilters?: Person;
}
