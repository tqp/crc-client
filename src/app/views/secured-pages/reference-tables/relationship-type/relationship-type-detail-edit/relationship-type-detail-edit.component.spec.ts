import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipTypeDetailEditComponent } from './relationship-type-detail-edit.component';

describe('RelationshipTypeDetailEditComponent', () => {
  let component: RelationshipTypeDetailEditComponent;
  let fixture: ComponentFixture<RelationshipTypeDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipTypeDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipTypeDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
