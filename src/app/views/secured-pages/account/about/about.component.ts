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

  public slideInterval: number | false = 10000;
  public noWrapSlides: boolean = false;
  slides: any[] = [];
  activeSlideIndex: number = 0;

  constructor(private aboutService: AboutService) {
  }

  ngOnInit(): void {
    this.environmentName = environment.name;
    this.clientBuildTimestamp = environment.buildTimestamp;
    this.getServerBuildTimestamp();
    this.saveScreenResolution();
    this.addSlides();
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

  private saveScreenResolution(): void {
    this.aboutService.saveScreenResolution().subscribe(
      (response: any) => {
        // console.log('response', response);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private addSlides(): void {
    this.addSlide('https://www.helpingchildrenworldwide.org/uploads/9/8/8/2/98826222/background-images/1796105365.jpg');
    this.addSlide('https://www.helpingchildrenworldwide.org/uploads/9/8/8/2/98826222/apsi0963_orig.jpg');
    this.addSlide('https://www.helpingchildrenworldwide.org/uploads/9/8/8/2/98826222/img-4964-copy-orig_orig.jpg');
    this.addSlide('https://www.helpingchildrenworldwide.org/uploads/9/8/8/2/98826222/img-4840-orig_orig.jpg');
    this.addSlide('https://www.helpingchildrenworldwide.org/uploads/9/8/8/2/98826222/dfhj8454-1_orig.jpg');
  }

  private addSlide(imageUrl: string): void {
    setTimeout(() => {
      this.slides.push({
        image: imageUrl
      });
    }, 500);
  }

}
