import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramStatusEditDialogComponent } from './program-status-edit-dialog.component';

describe('ProgramStatusEditDialogComponent', () => {
  let component: ProgramStatusEditDialogComponent;
  let fixture: ComponentFixture<ProgramStatusEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramStatusEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramStatusEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
