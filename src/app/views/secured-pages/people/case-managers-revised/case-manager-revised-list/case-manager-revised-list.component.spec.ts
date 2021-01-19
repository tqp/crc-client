import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseManagerRevisedListComponent } from './case-manager-revised-list.component';

describe('CaseManagerRevisedListComponent', () => {
  let component: CaseManagerRevisedListComponent;
  let fixture: ComponentFixture<CaseManagerRevisedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseManagerRevisedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseManagerRevisedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
