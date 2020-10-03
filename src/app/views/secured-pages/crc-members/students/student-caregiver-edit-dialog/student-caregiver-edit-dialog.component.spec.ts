import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCaregiverEditDialogComponent } from './student-caregiver-edit-dialog.component';

describe('StudentCaregiverEditDialogComponent', () => {
  let component: StudentCaregiverEditDialogComponent;
  let fixture: ComponentFixture<StudentCaregiverEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCaregiverEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCaregiverEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
