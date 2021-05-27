import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorListSspComponent } from './sponsor-list-ssp.component';

describe('SponsorListSspComponent', () => {
  let component: SponsorListSspComponent;
  let fixture: ComponentFixture<SponsorListSspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorListSspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorListSspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
