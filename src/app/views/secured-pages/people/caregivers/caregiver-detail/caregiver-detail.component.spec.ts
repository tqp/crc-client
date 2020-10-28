import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverDetailComponent } from './caregiver-detail.component';

describe('CaregiverDetailComponent', () => {
  let component: CaregiverDetailComponent;
  let fixture: ComponentFixture<CaregiverDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaregiverDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
