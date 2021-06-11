import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiRecordDetailComponent } from './csi-record-detail.component';

describe('CsiRecordDetailComponent', () => {
  let component: CsiRecordDetailComponent;
  let fixture: ComponentFixture<CsiRecordDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiRecordDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiRecordDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
