import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDetailEditDialogComponent } from './loan-detail-edit-dialog.component';

describe('LoanDetailEditDialogComponent', () => {
  let component: LoanDetailEditDialogComponent;
  let fixture: ComponentFixture<LoanDetailEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanDetailEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanDetailEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
