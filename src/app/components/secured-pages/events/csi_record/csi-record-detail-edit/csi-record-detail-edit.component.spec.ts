import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiRecordDetailEditComponent } from './csi-record-detail-edit.component';

describe('CsiRecordDetailEditComponent', () => {
  let component: CsiRecordDetailEditComponent;
  let fixture: ComponentFixture<CsiRecordDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiRecordDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiRecordDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
