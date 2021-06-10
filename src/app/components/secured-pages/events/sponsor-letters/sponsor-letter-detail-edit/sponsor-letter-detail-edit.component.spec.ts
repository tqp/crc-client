import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorLetterDetailEditComponent } from './sponsor-letter-detail-edit.component';

describe('SponsorLetterDetailEditComponent', () => {
  let component: SponsorLetterDetailEditComponent;
  let fixture: ComponentFixture<SponsorLetterDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorLetterDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorLetterDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
