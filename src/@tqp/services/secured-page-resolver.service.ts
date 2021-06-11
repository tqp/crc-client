import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecuredPageResolverService implements Resolve<any> {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    // console.log('SecuredPageResolverService -> resolve');
    this.authService.isAuthenticated().subscribe(response => {
      if (response === false) {
        // console.log('UserModel has NOT been authenticated.');
        this.router.navigate(['/login-page']).then();
      } else {
        // console.log('UserModel has been authenticated.');
      }
    });
    return EMPTY;
  }
}

