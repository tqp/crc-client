import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RelationshipService } from '../../../relationships/relationship.service';
import { EventService } from '@tqp/services/event.service';
import { AuthService } from '@tqp/services/auth.service';
import { PostGradEventService } from '../../../../../services/post-grad-event.service';
import { PostGradEvent } from '../../../../../models/post-grad-event.model';

@Component({
  selector: 'app-post-grad-event-detail',
  templateUrl: './post-grad-event-detail.component.html',
  styleUrls: ['./post-grad-event-detail.component.css']
})
export class PostGradEventDetailComponent implements OnInit {
  public pageSource: string;
  public postGradEvent: PostGradEvent;
  public postGradEventLoading: boolean = false;

  constructor(private route: ActivatedRoute,
              private postGradEventService: PostGradEventService,
              private relationshipService: RelationshipService,
              private eventService: EventService,
              private router: Router,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const postGradEventId = params['id'];
        // console.log('postGradEventId', postGradEventId);
        this.getPostGradEventDetail(postGradEventId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getPostGradEventDetail(postGradEventId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.postGradEventService.getPostGradEventDetail(postGradEventId).subscribe(
      response => {
        this.postGradEvent = response;
        console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public returnToList(): void {
    this.router.navigate(['post-grad-events/post-grad-event-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['post-grad-events/post-grad-event-detail-edit', this.postGradEvent.postGradEventId]).then();
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
