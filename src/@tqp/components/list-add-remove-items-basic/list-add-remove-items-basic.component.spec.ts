import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddRemoveItemsBasicComponent } from './list-add-remove-items-basic.component';

describe('ListAddRemoveItemsBasicComponent', () => {
  let component: ListAddRemoveItemsBasicComponent;
  let fixture: ComponentFixture<ListAddRemoveItemsBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAddRemoveItemsBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAddRemoveItemsBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
