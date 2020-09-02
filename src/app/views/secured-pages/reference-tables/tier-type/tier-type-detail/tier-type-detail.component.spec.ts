import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TierTypeDetailComponent } from './tier-type-detail.component';

describe('TierTypeDetailComponent', () => {
  let component: TierTypeDetailComponent;
  let fixture: ComponentFixture<TierTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TierTypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TierTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
