import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipTypeDetailComponent } from './relationship-type-detail.component';

describe('RelationshipTypeDetailComponent', () => {
  let component: RelationshipTypeDetailComponent;
  let fixture: ComponentFixture<RelationshipTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipTypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
