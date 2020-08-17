import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MillisecondsToDateStringComponent } from './milliseconds-to-date-string.component';

describe('MillisecondsToDateStringComponent', () => {
  let component: MillisecondsToDateStringComponent;
  let fixture: ComponentFixture<MillisecondsToDateStringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MillisecondsToDateStringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MillisecondsToDateStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
