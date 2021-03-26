import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSponsorLetterComponent } from './student-sponsor-letter.component';

describe('StudentSponsorLetterComponent', () => {
  let component: StudentSponsorLetterComponent;
  let fixture: ComponentFixture<StudentSponsorLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSponsorLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSponsorLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
