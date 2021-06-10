import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorLetterDetailComponent } from './sponsor-letter-detail.component';

describe('SponsorLetterDetailComponent', () => {
  let component: SponsorLetterDetailComponent;
  let fixture: ComponentFixture<SponsorLetterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorLetterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorLetterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
