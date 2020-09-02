import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TierTypeListComponent } from './tier-type-list.component';

describe('TierTypeListComponent', () => {
  let component: TierTypeListComponent;
  let fixture: ComponentFixture<TierTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TierTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TierTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
