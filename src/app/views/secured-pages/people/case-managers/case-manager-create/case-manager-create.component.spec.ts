import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseManagerCreateComponent } from './case-manager-create.component';

describe('CaseManagerCreateComponent', () => {
  let component: CaseManagerCreateComponent;
  let fixture: ComponentFixture<CaseManagerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseManagerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseManagerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
