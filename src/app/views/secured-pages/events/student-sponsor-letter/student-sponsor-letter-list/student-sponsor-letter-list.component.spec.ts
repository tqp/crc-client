import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSponsorLetterListComponent } from './student-sponsor-letter-list.component';

describe('StudentSponsorLetterListComponent', () => {
  let component: StudentSponsorLetterListComponent;
  let fixture: ComponentFixture<StudentSponsorLetterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSponsorLetterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSponsorLetterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
