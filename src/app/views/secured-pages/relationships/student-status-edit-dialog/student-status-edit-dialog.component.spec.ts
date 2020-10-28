import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStatusEditDialogComponent } from './student-status-edit-dialog.component';

describe('StudentStatusEditDialogComponent', () => {
  let component: StudentStatusEditDialogComponent;
  let fixture: ComponentFixture<StudentStatusEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentStatusEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentStatusEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
