import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseManagerDetailEditComponent } from './case-manager-detail-edit.component';

describe('CaseManagerDetailEditComponent', () => {
  let component: CaseManagerDetailEditComponent;
  let fixture: ComponentFixture<CaseManagerDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseManagerDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseManagerDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
