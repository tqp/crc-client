import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitDetailEditComponent } from './visit-detail-edit.component';

describe('VisitDetailEditComponent', () => {
  let component: VisitDetailEditComponent;
  let fixture: ComponentFixture<VisitDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
