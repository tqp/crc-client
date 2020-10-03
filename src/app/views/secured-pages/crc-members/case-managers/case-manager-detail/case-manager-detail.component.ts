import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '../../../../../../@tqp/services/event.service';
import { CaseManager } from '../CaseManager';
import { CaseManagerService } from '../case-manager.service';

@Component({
  selector: 'app-case-manager-detail',
  templateUrl: './case-manager-detail.component.html',
  styleUrls: ['./case-manager-detail.component.css']
})
export class CaseManagerDetailComponent implements OnInit {
  public pageSource: string;
  public caseManager: CaseManager;
  public genderNames = {'M': 'Male', 'F': 'Female', 'O': 'Other'};

  constructor(private route: ActivatedRoute,
              private caseManagerService: CaseManagerService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const caseManagerId = params['id'];
        // console.log('caseManagerId', caseManagerId);
        this.getCaseManagerDetail(caseManagerId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getCaseManagerDetail(caseManagerId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.caseManagerService.getCaseManagerDetail(caseManagerId).subscribe(
      response => {
        this.caseManager = response;
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
    this.router.navigate(['case-managers/case-manager-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['case-managers/case-manager-detail-edit', this.caseManager.caseManagerId]).then();
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
