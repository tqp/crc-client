import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '@tqp/services/event.service';
import { AuthService } from '@tqp/services/auth.service';
import { forkJoin } from 'rxjs';
import { CsiRecord } from '../../../../../models/csi-record.model';
import { ServicesProvidedType } from '../../../../../models/types/type-services-provided.model';
import { CsiRecordService } from '../../../../../services/events/csi-record.service';
import { RelationshipService } from '../../../../../services/relationships/relationship.service';
import { ServicesProvidedTypeService } from '../../../../../services/reference-tables/services-provided-type.service';
import { tqpCustomAnimations } from '../../../../../../@tqp/animations/tqpCustomAnimations';

@Component({
  selector: 'app-csi-record-detail',
  templateUrl: './csi-record-detail.component.html',
  styleUrls: ['./csi-record-detail.component.css'],
  animations: [tqpCustomAnimations]
})
export class CsiRecordDetailComponent implements OnInit {
  public pageSource: string;
  public csi: CsiRecord;
  public genderNames = {'M': 'Male', 'F': 'Female', 'O': 'Other'};
  public csiLoading: boolean = false;
  public servicesProvidedTypeList: ServicesProvidedType[];

  // Services Provided List
  public servicesProvidedListLoading: boolean = false;
  public servicesProvidedListIsCollapsed: boolean = false;
  public servicesProvidedListRecords: string[] = [];
  public servicesProvidedListDataSource: string[] = [];
  public servicesProvidedListDisplayedColumns: string[] = [
    'serviceName'
  ];

  constructor(private route: ActivatedRoute,
              private csiService: CsiRecordService,
              private relationshipService: RelationshipService,
              private servicesProvidedTypeService: ServicesProvidedTypeService,
              private eventService: EventService,
              private router: Router,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const csiRecordId = params['id'];
        // console.log('csiRecordId', csiRecordId);
        this.getCsiRecordDetail(csiRecordId);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getCsiRecordDetail(csiRecordId: number): void {
    this.eventService.loadingEvent.emit(true);

    const servicesProvidedTypeList = this.servicesProvidedTypeService.getServicesProvidedTypeList();
    const csiRecordDetail = this.csiService.getCsiRecordDetail(csiRecordId);

    // We need to ensure that both the servicedProvided list and the csiRecordDetail come back before
    // trying to populate the checkboxes... so, we use forkJoin.
    forkJoin([servicesProvidedTypeList, csiRecordDetail]).subscribe(response => {
        console.log('response', response);

        // Use the servicesProvidedTypeList response
        this.servicesProvidedTypeList = response[0];
        const temp: any = this.servicesProvidedTypeList.map(item => {
          return item.servicesProvidedTypeId = ('000' + item.servicesProvidedTypeId).slice(-3);
        });

        // User the csiRecordDetail response
        this.csi = response[1];

        // Populate the Services Provided List
        this.servicesProvidedListRecords = [];
        this.csi.csiRecordServicesProvided.split('|').forEach(item => {
          this.servicesProvidedListRecords.push(this.getServiceProvidedNameFromID(item).servicesProvidedTypeName);
        })

      console.log('df', this.servicesProvidedListRecords);
        this.servicesProvidedListDataSource = this.servicesProvidedListRecords;

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

  // BUTTONS

  public returnToList(): void {
    this.router.navigate(['csi-records/csi-record-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['csi-records/csi-record-detail-edit', this.csi.csiRecordId]).then();
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
