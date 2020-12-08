import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiScoresReportComponent } from './csi-scores-report.component';

describe('CsiScoresReportComponent', () => {
  let component: CsiScoresReportComponent;
  let fixture: ComponentFixture<CsiScoresReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiScoresReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiScoresReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
