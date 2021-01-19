import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListByCaseManagerComponent } from './student-list-by-case-manager.component';

describe('StudentListByCaseManagerComponent', () => {
  let component: StudentListByCaseManagerComponent;
  let fixture: ComponentFixture<StudentListByCaseManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentListByCaseManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListByCaseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
