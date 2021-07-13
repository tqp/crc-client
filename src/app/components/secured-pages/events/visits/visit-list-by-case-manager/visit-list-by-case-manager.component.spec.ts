import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitListByCaseManagerComponent } from './visit-list-by-case-manager.component';

describe('VisitListByCaseManagerComponent', () => {
  let component: VisitListByCaseManagerComponent;
  let fixture: ComponentFixture<VisitListByCaseManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitListByCaseManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitListByCaseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
