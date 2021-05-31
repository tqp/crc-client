import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTypeDetailComponent } from './person-type-detail.component';

describe('PersonTypeDetailComponent', () => {
  let component: PersonTypeDetailComponent;
  let fixture: ComponentFixture<PersonTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonTypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
