import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverDetailEditComponent } from './caregiver-detail-edit.component';

describe('CaregiverDetailEditComponent', () => {
  let component: CaregiverDetailEditComponent;
  let fixture: ComponentFixture<CaregiverDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaregiverDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
