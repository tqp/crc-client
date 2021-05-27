import { Component, HostListener, OnInit } from '@angular/core';
import { Student } from '../../../../../models/people/student.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RelationshipService } from '../../../relationships/relationship.service';
import { EventService } from '@tqp/services/event.service';
import { AuthService } from '@tqp/services/auth.service';
import { Csi } from '../../../../../models/csi.model';
import { CsiService } from '../../../../../services/csi.service';
import { ServicesProvidedType } from '../../../../../models/types/type-services-provided.model';
import { ServicesProvidedTypeService } from '../../../../../services/services-provided-type.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-csi-detail',
  templateUrl: './csi-detail.component.html',
  styleUrls: ['./csi-detail.component.css']
})
export class CsiDetailComponent implements OnInit {
  public pageSource: string;
  public csi: Csi;
  public genderNames = {'M': 'Male', 'F': 'Female', 'O': 'Other'};
  public csiLoading: boolean = false;
  public servicesProvidedTypeList: ServicesProvidedType[];

  // Associated Students List
  public records: Student[] = [];
  public dataSource: Student[] = [];
  public displayedColumns: string[] = [
    'name',
    'relationshipStartDate'
  ];

  constructor(private route: ActivatedRoute,
              private csiService: CsiService,
              private relationshipService: RelationshipService,
              private servicesProvidedTypeService: ServicesProvidedTypeService,
              private eventService: EventService,
              private router: Router,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const csiId = params['id'];
        // console.log('csiId', csiId);
        this.getCsiDetail(csiId);
        // this.getStudentListByCsiId(csiId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getCsiDetail(csiId: number): void {
    this.eventService.loadingEvent.emit(true);

    const servicesProvided = this.servicesProvidedTypeService.getServicesProvidedTypeList();
    const csiDetail = this.csiService.getCsiDetail(csiId);

    // We need to ensure that both the servicedProvided list and the csiDetail come back before
    // trying to populate the checkboxes... so, we use forkJoin.
    forkJoin([servicesProvided, csiDetail]).subscribe(response => {
        // console.log('response', response);

        // Use the servicesProvidedTypeList response
        this.servicesProvidedTypeList = response[0];
        this.servicesProvidedTypeList.map(item => {
          return item.servicesProvidedTypeId = ('000' + item.servicesProvidedTypeId).slice(-3);
        });

        // User the csiDetail response
        this.csi = response[1];

        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public getServiceProvidedNameFromID(item: string) {
    return this.servicesProvidedTypeList.find(x => x.servicesProvidedTypeId === item);
  }

  // private getStudentListByCsiId(caseManagerId: number): void {
  //   this.relationshipService.getStudentListByCsiId(caseManagerId).subscribe(
  //     (studentList: Student[]) => {
  //       console.log('studentList', studentList);
  //       studentList.forEach(item => {
  //         this.records.push(item);
  //       });
  //       this.dataSource = this.records;
  //     },
  //     error => {
  //       console.error('Error: ', error);
  //     }
  //   );
  // }

  // Buttons

  public returnToList(): void {
    this.router.navigate(['csi/csi-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['csi/csi-detail-edit', this.csi.csiId]).then();
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
