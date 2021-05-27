import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverListSspComponent } from './caregiver-list-ssp.component';

describe('CaregiverListSspComponent', () => {
  let component: CaregiverListSspComponent;
  let fixture: ComponentFixture<CaregiverListSspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaregiverListSspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverListSspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
