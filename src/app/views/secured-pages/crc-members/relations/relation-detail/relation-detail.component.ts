import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '../../../../../../@tqp/services/event.service';
import { Relation } from '../Relation';
import { Student } from '../../students/Student';
import { RelationshipService } from '../relationship.service';
import { Person } from '../../../../../../@tqp/models/Person';
import { StudentService } from '../../students/student.service';
import { RelationService } from '../relation.service';
import { Relationship } from '../../students/Relationship';

@Component({
  selector: 'app-relation-detail',
  templateUrl: './relation-detail.component.html',
  styleUrls: ['./relation-detail.component.css']
})
export class RelationDetailComponent implements OnInit {
  public pageSource: string;
  public relation: Relation;

  // Relationships List
  public records: Student[] = [];
  public dataSource: Student[] = [];
  public displayedColumns: string[] = [
    'name',
    'relationship',
    'bloodRelative'
  ];

  constructor(private route: ActivatedRoute,
              private relationService: RelationService,
              private relationshipService: RelationshipService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const relationId = params['id'];
        // console.log('relationId', relationId);
        this.getRelationDetail(relationId);
        this.getRelationshipListByRelationId(relationId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getRelationDetail(relationId: number): void {
    this.eventService.loadingEvent.emit(true);
    this.relationService.getRelationDetail(relationId).subscribe(
      response => {
        this.relation = response;
        console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getRelationshipListByRelationId(relationId: number): void {
    this.relationshipService.getRelationshipListByRelationId(relationId).subscribe(
      (relationshipList: Relationship[]) => {
        console.log('relationshipList', relationshipList);
        relationshipList.forEach(item => {
          this.records.push(item);
        });
        this.dataSource = this.records;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // Buttons

  public returnToList(): void {
    this.router.navigate(['relations/relation-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['relations/relation-detail-edit', this.relation.relationId]).then();
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
