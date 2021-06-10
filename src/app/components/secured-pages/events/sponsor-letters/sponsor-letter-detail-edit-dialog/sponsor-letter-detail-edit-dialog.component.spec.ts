import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorLetterDetailEditDialogComponent } from './sponsor-letter-detail-edit-dialog.component';

describe('SponsorLetterDetailEditDialogComponent', () => {
  let component: SponsorLetterDetailEditDialogComponent;
  let fixture: ComponentFixture<SponsorLetterDetailEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorLetterDetailEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorLetterDetailEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
