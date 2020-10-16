import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetingComponent } from './faceting.component';

describe('FacetingComponent', () => {
  let component: FacetingComponent;
  let fixture: ComponentFixture<FacetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
