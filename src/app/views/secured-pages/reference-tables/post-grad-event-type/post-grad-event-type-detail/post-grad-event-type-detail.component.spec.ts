import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGradEventTypeDetailComponent } from './post-grad-event-type-detail.component';

describe('PostGradEventTypeDetailComponent', () => {
  let component: PostGradEventTypeDetailComponent;
  let fixture: ComponentFixture<PostGradEventTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostGradEventTypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGradEventTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
