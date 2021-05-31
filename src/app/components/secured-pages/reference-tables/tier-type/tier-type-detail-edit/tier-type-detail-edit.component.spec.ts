import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TierTypeDetailEditComponent } from './tier-type-detail-edit.component';

describe('TierTypeDetailEditComponent', () => {
  let component: TierTypeDetailEditComponent;
  let fixture: ComponentFixture<TierTypeDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TierTypeDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TierTypeDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
