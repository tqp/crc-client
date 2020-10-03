import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgramStatusEditDialogComponent } from './student-program-status-edit-dialog.component';

describe('StudentProgramStatusEditDialogComponent', () => {
  let component: StudentProgramStatusEditDialogComponent;
  let fixture: ComponentFixture<StudentProgramStatusEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProgramStatusEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgramStatusEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
