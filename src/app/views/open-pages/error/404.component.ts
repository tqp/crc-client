import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: '404.component.html'
})
export class P404Component {

  constructor(private router: Router) { }

  public redirectToMainPage(): void {
    console.log('redirectToMainPage');
    this.router.navigate(['account/about']).then();
  }

}
