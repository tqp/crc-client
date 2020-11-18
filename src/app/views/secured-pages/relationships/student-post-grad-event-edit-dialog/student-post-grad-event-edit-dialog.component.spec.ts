import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPostGradEventEditDialogComponent } from './student-post-grad-event-edit-dialog.component';

describe('StudentPostGradEventEditDialogComponent', () => {
  let component: StudentPostGradEventEditDialogComponent;
  let fixture: ComponentFixture<StudentPostGradEventEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPostGradEventEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPostGradEventEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
