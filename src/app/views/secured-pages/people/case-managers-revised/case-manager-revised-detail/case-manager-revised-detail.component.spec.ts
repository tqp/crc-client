import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseManagerRevisedDetailComponent } from './case-manager-revised-detail.component';

describe('CaseManagerRevisedDetailComponent', () => {
  let component: CaseManagerRevisedDetailComponent;
  let fixture: ComponentFixture<CaseManagerRevisedDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseManagerRevisedDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseManagerRevisedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
