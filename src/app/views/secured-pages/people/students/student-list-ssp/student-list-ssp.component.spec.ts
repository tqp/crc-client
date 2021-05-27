import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListSspComponent } from './student-list-ssp.component';

describe('StudentListSspComponent', () => {
  let component: StudentListSspComponent;
  let fixture: ComponentFixture<StudentListSspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentListSspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListSspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
