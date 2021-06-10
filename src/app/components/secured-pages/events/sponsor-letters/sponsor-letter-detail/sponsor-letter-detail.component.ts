import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '@tqp/services/event.service';
import { AuthService } from '@tqp/services/auth.service';
import { SponsorLetter } from '../../../../../models/sponsor.letter';
import { SponsorLetterService } from '../../../../../services/events/sponsor-letter.service';
import { RelationshipService } from '../../../../../services/relationships/relationship.service';

@Component({
  selector: 'app-sponsor-letter-detail',
  templateUrl: './sponsor-letter-detail.component.html',
  styleUrls: ['./sponsor-letter-detail.component.css']
})
export class SponsorLetterDetailComponent implements OnInit {
  public pageSource: string;
  public sponsorLetter: SponsorLetter;
  public genderNames = {'M': 'Male', 'F': 'Female', 'O': 'Other'};
  public sponsorLetterLoading: boolean = false;

  constructor(private route: ActivatedRoute,
              private sponsorLetterService: SponsorLetterService,
              private relationshipService: RelationshipService,
              private eventService: EventService,
              private router: Router,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const sponsorLetterId = params['id'];
        // console.log('sponsorLetterId', sponsorLetterId);
        this.getSponsorLetterDetail(sponsorLetterId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getSponsorLetterDetail(sponsorLetterId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.sponsorLetterService.getSponsorLetterDetail(sponsorLetterId).subscribe(
      response => {
        this.sponsorLetter = response;
        // console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public returnToList(): void {
    this.router.navigate(['sponsor-letters/sponsor-letter-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['sponsor-letters/sponsor-letter-detail-edit', this.sponsorLetter.sponsorLetterId]).then();
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
