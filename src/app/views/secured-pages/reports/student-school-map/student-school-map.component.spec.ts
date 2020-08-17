import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSchoolMapComponent } from './student-school-map.component';

describe('StudentSchoolMapComponent', () => {
  let component: StudentSchoolMapComponent;
  let fixture: ComponentFixture<StudentSchoolMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSchoolMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSchoolMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
