import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseManagerRevisedDetailEditComponent } from './case-manager-revised-detail-edit.component';

describe('CaseManagerRevisedDetailEditComponent', () => {
  let component: CaseManagerRevisedDetailEditComponent;
  let fixture: ComponentFixture<CaseManagerRevisedDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseManagerRevisedDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseManagerRevisedDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
