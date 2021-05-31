import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiDetailEditDialogComponent } from './csi-detail-edit-dialog.component';

describe('CsiDetailEditDialogComponent', () => {
  let component: CsiDetailEditDialogComponent;
  let fixture: ComponentFixture<CsiDetailEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiDetailEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiDetailEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
