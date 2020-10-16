import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofinanceByParticipantComponent } from './microfinance-by-participant.component';

describe('MicrofinanceByParticipantComponent', () => {
  let component: MicrofinanceByParticipantComponent;
  let fixture: ComponentFixture<MicrofinanceByParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicrofinanceByParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrofinanceByParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
