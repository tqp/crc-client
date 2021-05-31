import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrcMetricsComponent } from './crc-metrics.component';

describe('CrcMetricsComponent', () => {
  let component: CrcMetricsComponent;
  let fixture: ComponentFixture<CrcMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrcMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrcMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
