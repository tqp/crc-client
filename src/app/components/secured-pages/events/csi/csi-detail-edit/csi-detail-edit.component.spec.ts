import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiDetailEditComponent } from './csi-detail-edit.component';

describe('CsiDetailEditComponent', () => {
  let component: CsiDetailEditComponent;
  let fixture: ComponentFixture<CsiDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
