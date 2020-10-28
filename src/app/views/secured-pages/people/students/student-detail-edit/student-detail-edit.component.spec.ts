import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailEditComponent } from './student-detail-edit.component';

describe('StudentDetailEditComponent', () => {
  let component: StudentDetailEditComponent;
  let fixture: ComponentFixture<StudentDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
