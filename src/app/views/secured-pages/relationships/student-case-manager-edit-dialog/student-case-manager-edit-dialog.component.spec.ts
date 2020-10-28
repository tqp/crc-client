import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCaseManagerEditDialogComponent } from './student-case-manager-edit-dialog.component';

describe('StudentCaseManagerEditDialogComponent', () => {
  let component: StudentCaseManagerEditDialogComponent;
  let fixture: ComponentFixture<StudentCaseManagerEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCaseManagerEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCaseManagerEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
