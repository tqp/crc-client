import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitDetailEditDialogComponent } from './visit-detail-edit-dialog.component';

describe('VisitDetailEditDialogComponent', () => {
  let component: VisitDetailEditDialogComponent;
  let fixture: ComponentFixture<VisitDetailEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitDetailEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitDetailEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
