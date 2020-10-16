import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '@tqp/services/token-storage.service';
import { TokenService } from '@tqp/services/token.service';
import { TokenExchangeService } from './token-exchange.service';

@Component({
  selector: 'app-token-exchange',
  templateUrl: './token-exchange.component.html',
  styleUrls: ['./token-exchange.component.css']
})
export class TokenExchangeComponent implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected tokenExchangeService: TokenExchangeService,
              protected tokenStorageService: TokenStorageService,
              protected tokenService: TokenService,
              protected router: Router) {
  }

  ngOnInit(): void {
    // console.log('Token Exchange');
    this.route.queryParams.subscribe((params) => {
      const shortLivedToken = params['slt'];
      // console.log('TokenExchangeComponent -> ngOnInit: shortLivedToken=[' + this.tokenExchangeService.shortId(shortLivedToken) + ']');
      this.exchangeTokens(shortLivedToken);
    });
  }

  private exchangeTokens(shortLivedToken: string): void {
    // console.log('TokenExchangeComponent -> exchangeTokens: shortLivedToken=[' + this.tokenExchangeService.shortId(shortLivedToken) + ']');
    this.tokenExchangeService.exchangeToken(shortLivedToken).subscribe(
      data => {
        // console.log('TokenExchangeComponent -> exchangeTokens', data);
        this.tokenStorageService.saveJwtToken(data.value);
        this.tokenService.saveToken(data.value);
        this.router.navigate(['/account/about']).then(() => {
          // console.log('The token exchange process is re-routing you...');
        });
      },
      error => {
        console.dir(error);
        console.error('Error: ' + error.error.error);
        console.error('Error Description: ' + error.error.error_description);
      }
    );
  }

}
