import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '@tqp/services/http.service';
import {TokenService} from '@tqp/services/token.service';
import {TierTypeModel} from '../../models/types/type-tier.model';

@Injectable({
  providedIn: 'root'
})
export class TierTypeService {
  private tierTypeNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public getTierTypeList() {
    const url = environment.apiUrl + '/api/v1/tier-type/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<TierTypeModel[]>(url,
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

  public setTierTypeNameSearchValue(val) {
    this.tierTypeNameSearchValue = val;
  }

  public getTierTypeNameSearchValue() {
    return this.tierTypeNameSearchValue;
  }
}
