import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiDetailComponent } from './csi-detail.component';

describe('CsiDetailComponent', () => {
  let component: CsiDetailComponent;
  let fixture: ComponentFixture<CsiDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
