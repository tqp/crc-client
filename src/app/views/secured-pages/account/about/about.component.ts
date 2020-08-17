import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public environmentName: string;
  public clientBuildTimestamp: string;
  public serverBuildTimestamp: string;

  constructor(private aboutService: AboutService) {
  }

  ngOnInit(): void {
    this.environmentName = environment.name;
    this.clientBuildTimestamp = environment.buildTimestamp;
    this.getServerBuildTimestamp();
  }

  private getServerBuildTimestamp(): void {
    this.aboutService.getServerBuildTimestamp().subscribe(
      (response: any) => {
        // console.log('response', response);
        this.serverBuildTimestamp = response.value;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

}
