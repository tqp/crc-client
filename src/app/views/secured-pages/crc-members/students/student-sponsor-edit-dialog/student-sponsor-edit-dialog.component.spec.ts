import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSponsorEditDialogComponent } from './student-sponsor-edit-dialog.component';

describe('StudentSponsorEditDialogComponent', () => {
  let component: StudentSponsorEditDialogComponent;
  let fixture: ComponentFixture<StudentSponsorEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSponsorEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSponsorEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
