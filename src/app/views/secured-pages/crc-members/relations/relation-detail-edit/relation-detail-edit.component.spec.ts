import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationDetailEditComponent } from './relation-detail-edit.component';

describe('RelationDetailEditComponent', () => {
  let component: RelationDetailEditComponent;
  let fixture: ComponentFixture<RelationDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
