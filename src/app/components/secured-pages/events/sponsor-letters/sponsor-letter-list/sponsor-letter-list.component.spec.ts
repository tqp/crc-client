import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorLetterListComponent } from './sponsor-letter-list.component';

describe('SponsorLetterListComponent', () => {
  let component: SponsorLetterListComponent;
  let fixture: ComponentFixture<SponsorLetterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorLetterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorLetterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
