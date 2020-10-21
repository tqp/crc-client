import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { EventService } from '../../../../../@tqp/services/event.service';
import { FacetingService } from './faceting.service';
import { FacetPackage } from './models/FacetPackage';

@Component({
  selector: 'app-faceting',
  templateUrl: './faceting.component.html',
  styleUrls: ['./faceting.component.css']
})
export class FacetingComponent implements OnInit {
  public facetPackage: FacetPackage;
  public tag: KeyValue<string, string>;
  public tagList: KeyValue<string, string>[] = [];

  constructor(private eventService: EventService,
              private facetingService: FacetingService) {
  }

  ngOnInit(): void {
    this.runElasticQuery();
  }

  public runElasticQuery(): void {
    this.eventService.loadingEvent.emit(true);
    this.facetingService.runElasticQuery().subscribe(
      response => {
        this.facetPackage = response;
        console.log('facetPackage', this.facetPackage);
        this.eventService.loadingEvent.emit(false);
      }, error => {
        console.error('Error: ', error);
      }, () => {
      }
    );
  }

  public isChecked(id: string): boolean {
    const found = this.tagList.findIndex(x => x.key === id);
    return found >= 0;
  }

  public clickCheckbox(filterGroupName: string, event): void {
    this.tag = {key: filterGroupName + '|' + event.target.value, value: filterGroupName + ': ' + event.target.value};
    if (event.target.checkec) {
      this.addTag(this.tag);
    } else {
      this.removeTag(this.tag);
    }
  }

  public addTag(key): void {
    this.tagList.push(this.tag);
    this.runElasticQuery();
  }

  public removeTag(key): void {
    this.tagList.splice(this.tagList.findIndex(x => x.key === key), 1);
    this.runElasticQuery();
  }
}
