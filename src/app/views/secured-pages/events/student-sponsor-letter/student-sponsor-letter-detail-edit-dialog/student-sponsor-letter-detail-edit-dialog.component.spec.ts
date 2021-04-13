import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSponsorLetterDetailEditDialogComponent } from './student-sponsor-letter-detail-edit-dialog.component';

describe('StudentSponsorLetterDetailEditDialogComponent', () => {
  let component: StudentSponsorLetterDetailEditDialogComponent;
  let fixture: ComponentFixture<StudentSponsorLetterDetailEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSponsorLetterDetailEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSponsorLetterDetailEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
