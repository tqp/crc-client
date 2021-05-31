import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseManagerQualificationEditDialogComponent } from './case-manager-qualification-edit-dialog.component';

describe('CaseManagerQualificationEditDialogComponent', () => {
  let component: CaseManagerQualificationEditDialogComponent;
  let fixture: ComponentFixture<CaseManagerQualificationEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseManagerQualificationEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseManagerQualificationEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
