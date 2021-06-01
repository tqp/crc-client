import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ListItem } from '../../models/ListItem';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToasterService } from 'angular2-toaster';
import { ListAddRemoveOutputObject } from '../../models/ListAddRemoveOutputObject';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-add-remove-items-basic',
  templateUrl: './list-add-remove-items-basic.component.html',
  styleUrls: ['./list-add-remove-items-basic.component.css'],
  providers: [ToasterService]
})
export class ListAddRemoveItemsBasicComponent implements OnInit, OnDestroy, OnChanges {
  @Input() private currentItemsList: ListItem[];
  @Input() private availableItemsList: ListItem[];
  @Output() private listAddRemoveOutput: EventEmitter<ListAddRemoveOutputObject> = new EventEmitter<ListAddRemoveOutputObject>();

  @ViewChild('currentItemListFilter', {static: false}) public currentItemListFilter: ElementRef;
  public currentItemListFilterFormControl = new FormControl();

  @ViewChild('availableItemListFilter', {static: false}) public availableItemListFilter: ElementRef;
  public availableItemListFilterFormControl = new FormControl();

  // Current Items List
  // public currentItemsList: ListItem[];
  public currentItemsListOriginal: ListItem[];
  public currentItemsListLoading = true;
  public currentItemsListDisplayedColumns = ['displayText'];
  public currentItemsListDataSource: MatTableDataSource<any>;
  @ViewChild('currentItemsListSort', {static: true}) public currentItemsListSort: MatSort;

  // Available Items List
  // public availableItemsList: ListItem[];
  public availableItemsListOriginal: ListItem[];
  public availableItemsListLoading = true;
  public availableItemsListDisplayedColumns = ['displayText'];
  public availableItemsListDataSource: MatTableDataSource<any>;
  @ViewChild('availableItemsListSort', {static: true}) public availableItemsListSort: MatSort;

  private static tagItems(items: ListItem[], tag: string): ListItem[] {
    items.map((obj) => {
      obj.tag = tag;
      return obj;
    });
    return items;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  public ngOnChanges(changes: SimpleChanges) {
    // Current Items List Load
    if (changes['currentItemsList'] && changes['currentItemsList'].currentValue) {
      const i = JSON.parse(JSON.stringify(changes['currentItemsList']));
      if (i.previousValue == null || JSON.stringify(i.previousValue) !== JSON.stringify(i.currentValue)) {
        // console.log('currentValue', i.currentValue);
        this.loadCurrentItemsList(i.currentValue);
      }
    }
    // Available Items List Load
    if (changes['availableItemsList'] && changes['availableItemsList'].currentValue) {
      const i = JSON.parse(JSON.stringify(changes['availableItemsList']));
      if (i.previousValue == null || JSON.stringify(i.previousValue) !== JSON.stringify(i.currentValue)) {
        // console.log('availableValue', i.currentValue);
        this.loadAvailableItemsList(i.currentValue);
      }
    }
  }

  private loadCurrentItemsList(currentItemsList: ListItem[]) {
    this.currentItemsListOriginal = JSON.parse(JSON.stringify(currentItemsList)); // pseudo deep-copy
    this.currentItemsList = currentItemsList;
    this.currentItemsList = ListAddRemoveItemsBasicComponent.tagItems(this.currentItemsList, 'current');
    this.currentItemsListDataSource = new MatTableDataSource<any>(this.currentItemsList);
    this.currentItemsListDataSource.filterPredicate = function(data: ListItem, filter: string): boolean {
      return data.displayText.toLowerCase().includes(filter);
    };
    this.currentItemsListLoading = false;
  }

  private loadAvailableItemsList(availableItemsList: ListItem[]) {
    this.availableItemsListOriginal = JSON.parse(JSON.stringify(availableItemsList)); // pseudo deep-copy
    this.availableItemsList = availableItemsList;
    this.availableItemsList = ListAddRemoveItemsBasicComponent.tagItems(this.availableItemsList, 'available');
    this.availableItemsListDataSource = new MatTableDataSource<any>(this.availableItemsList);
    this.availableItemsListDataSource.filterPredicate = function(data: ListItem, filter: string): boolean {
      return data.displayText.toLowerCase().includes(filter);
    };
    this.availableItemsListLoading = false;
  }

  public applyCurrentItemListFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentItemsListDataSource.filter = filterValue.trim().toLowerCase();
  }

  public applyAvailableItemListFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.availableItemsListDataSource.filter = filterValue.trim().toLowerCase();
  }

  // CLICKABLE ACTIONS

  public addToCurrentItemsList(row: any): void {
    const index = this.availableItemsList.findIndex((d) => {
      return d.guid === row.guid;
    });
    if (index > -1) {
      this.availableItemsList.splice(index, 1);
      this.currentItemsList.push(row);
    }
    this.currentItemsList = this.sortCurrentItemsList(this.currentItemsList);
    this.currentItemsListDataSource = new MatTableDataSource<any>(this.currentItemsList);
    this.availableItemsListDataSource = new MatTableDataSource<any>(this.availableItemsList);

    const listAddRemoveResponseObject: ListAddRemoveOutputObject = {};
    listAddRemoveResponseObject.itemsToAdd = this.currentItemsList.filter(item => item.tag === 'available');
    listAddRemoveResponseObject.itemsToRemove = this.availableItemsList.filter(item => item.tag === 'current');
    this.listAddRemoveOutput.emit(listAddRemoveResponseObject);

    this.availableItemListFilterFormControl.setValue('');
    setTimeout(() => {
      this.availableItemListFilter.nativeElement.focus();
    }, 0);
  }

  public removeFromCurrentItemsList(row: any): void {
    console.log('removeFromCurrentItemsList');
    const index = this.currentItemsList.findIndex((d) => {
      return d.guid === row.guid;
    });
    if (index > -1) {
      this.currentItemsList.splice(index, 1);
      this.availableItemsList.push(row);
    }
    this.availableItemsList = this.sortAvailableItemsList(this.availableItemsList);
    this.currentItemsListDataSource = new MatTableDataSource<any>(this.currentItemsList);
    this.availableItemsListDataSource = new MatTableDataSource<any>(this.availableItemsList);

    const listAddRemoveOutputObject: ListAddRemoveOutputObject = {};
    listAddRemoveOutputObject.itemsToAdd = this.currentItemsList.filter(item => item.tag === 'available');
    listAddRemoveOutputObject.itemsToRemove = this.availableItemsList.filter(item => item.tag === 'current');
    this.listAddRemoveOutput.emit(listAddRemoveOutputObject);

    this.currentItemListFilterFormControl.setValue('');
    setTimeout(() => {
      this.currentItemListFilter.nativeElement.focus();
    }, 0);
  }

  private sortCurrentItemsList(list: ListItem[]): ListItem[] {
    const sortOrder = {'available': 0, 'current': 1};
    list.sort((a, b) => {
      return sortOrder[a.tag].toString().localeCompare(sortOrder[b.tag].toString()) ||
        a.displayText.localeCompare(b.displayText);
    });
    return list;
  }

  private sortAvailableItemsList(list: ListItem[]): ListItem[] {
    const sortOrder = {'current': 0, 'available': 1};
    list.sort((a, b) => {
      return sortOrder[a.tag].toString().localeCompare(sortOrder[b.tag].toString()) ||
        a.displayText.localeCompare(b.displayText);
    });
    return list;
  }

  public reset(): void {
    this.loadCurrentItemsList(this.currentItemsListOriginal);
    this.loadAvailableItemsList(this.availableItemsListOriginal);
  }
}

// private currentItemsListSorter(): void {
//   console.log('currentItemsListSorter');
//   console.log('currentItemsListDataSource', this.currentItemsListDataSource.sortingDataAccessor);
//   this.currentItemsListDataSource.sortingDataAccessor = (item, property) => {
//     console.log('item', item, 'property', property);
//     switch (property) {
//       case 'displayText':
//         console.log('here');
//         return item.displayText;
//       default:
//         return item[property];
//     }
//   };
//   this.currentItemsListDataSource.sort = this.currentItemsListSort;
// }
