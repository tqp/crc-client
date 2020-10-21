import { FilterGroup } from './FilterGroup';
import { QueryResult } from './QueryResult';

export class FacetPackage {
  public filterGroupList?: FilterGroup[];
  public queryResultCount?: number;
  public queryResultList?: QueryResult[];
}
