import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHomeMapComponent } from './student-home-map.component';

describe('StudentHomeMapComponent', () => {
  let component: StudentHomeMapComponent;
  let fixture: ComponentFixture<StudentHomeMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentHomeMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentHomeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
