import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiRecordListComponent } from './csi-record-list.component';

describe('CsiRecordListComponent', () => {
  let component: CsiRecordListComponent;
  let fixture: ComponentFixture<CsiRecordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiRecordListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiRecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
