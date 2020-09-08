import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTypeDetailEditComponent } from './person-type-detail-edit.component';

describe('PersonTypeDetailEditComponent', () => {
  let component: PersonTypeDetailEditComponent;
  let fixture: ComponentFixture<PersonTypeDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonTypeDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTypeDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
