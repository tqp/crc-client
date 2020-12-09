import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailEditDialogComponent } from './user-detail-edit-dialog.component';

describe('UserDetailEditDialogComponent', () => {
  let component: UserDetailEditDialogComponent;
  let fixture: ComponentFixture<UserDetailEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
