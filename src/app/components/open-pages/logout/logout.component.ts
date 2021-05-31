import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@tqp/services/auth.service';
import { TokenService } from '@tqp/services/token.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private tokenService: TokenService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log('Logout');
    this.tokenService.clearToken();
    this.authService.clearTokenInfo();
    this.router.navigateByUrl('/login-page').then();
  }

}
