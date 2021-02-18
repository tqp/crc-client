import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverWorkshopEditDialogComponent } from './caregiver-workshop-edit-dialog.component';

describe('CaregiverWorkshopEditDialogComponent', () => {
  let component: CaregiverWorkshopEditDialogComponent;
  let fixture: ComponentFixture<CaregiverWorkshopEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaregiverWorkshopEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverWorkshopEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
