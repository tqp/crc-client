import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDetailEditComponent } from './loan-detail-edit.component';

describe('LoanDetailEditComponent', () => {
  let component: LoanDetailEditComponent;
  let fixture: ComponentFixture<LoanDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
