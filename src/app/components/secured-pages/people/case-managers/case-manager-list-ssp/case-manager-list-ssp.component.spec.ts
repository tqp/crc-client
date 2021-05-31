import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseManagerListSspComponent } from './case-manager-list-ssp.component';

describe('CaseManagerListSspComponent', () => {
  let component: CaseManagerListSspComponent;
  let fixture: ComponentFixture<CaseManagerListSspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseManagerListSspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseManagerListSspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
