import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorDetailEditComponent } from './sponsor-detail-edit.component';

describe('SponsorDetailEditComponent', () => {
  let component: SponsorDetailEditComponent;
  let fixture: ComponentFixture<SponsorDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
