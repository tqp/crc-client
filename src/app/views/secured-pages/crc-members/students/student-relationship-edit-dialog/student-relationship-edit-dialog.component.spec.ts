import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRelationshipEditDialogComponent } from './student-relationship-edit-dialog.component';

describe('StudentRelationshipEditDialogComponent', () => {
  let component: StudentRelationshipEditDialogComponent;
  let fixture: ComponentFixture<StudentRelationshipEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentRelationshipEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRelationshipEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
