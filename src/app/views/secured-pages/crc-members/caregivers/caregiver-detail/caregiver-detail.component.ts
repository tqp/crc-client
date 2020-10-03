import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '../../../../../../@tqp/services/event.service';
import { Caregiver } from '../Caregiver';
import { CaregiverService } from '../caregiver.service';

@Component({
  selector: 'app-caregiver-detail',
  templateUrl: './caregiver-detail.component.html',
  styleUrls: ['./caregiver-detail.component.css']
})
export class CaregiverDetailComponent implements OnInit {
  public pageSource: string;
  public caregiver: Caregiver;
  public genderNames = {'M': 'Male', 'F': 'Female', 'O': 'Other'};

  constructor(private route: ActivatedRoute,
              private caregiverService: CaregiverService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const caregiverId = params['id'];
        // console.log('caregiverId', caregiverId);
        this.getCaregiverDetail(caregiverId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getCaregiverDetail(caregiverId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.caregiverService.getCaregiverDetail(caregiverId).subscribe(
      response => {
        this.caregiver = response;
        // console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // Buttons

  public returnToList(): void {
    this.router.navigate(['caregivers/caregiver-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['caregivers/caregiver-detail-edit', this.caregiver.caregiverId]).then();
  }

  public openTwitter(twitterHandle: string): void {
    console.log('openTwitter', twitterHandle);
    window.open('https://twitter.com/' + twitterHandle, '_blank');
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'e') {
      event.preventDefault();
      this.openEditPage();
    }
    if (event.ctrlKey && event.key === 'l') {
      event.preventDefault();
      this.returnToList();
    }
  }

}
