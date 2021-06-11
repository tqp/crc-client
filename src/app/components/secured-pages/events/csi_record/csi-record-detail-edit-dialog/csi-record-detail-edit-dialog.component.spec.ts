import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiRecordDetailEditDialogComponent } from './csi-record-detail-edit-dialog.component';

describe('CsiRecordDetailEditDialogComponent', () => {
  let component: CsiRecordDetailEditDialogComponent;
  let fixture: ComponentFixture<CsiRecordDetailEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiRecordDetailEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiRecordDetailEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
