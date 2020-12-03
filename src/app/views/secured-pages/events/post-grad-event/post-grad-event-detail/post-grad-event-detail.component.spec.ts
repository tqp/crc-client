import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGradEventDetailComponent } from './post-grad-event-detail.component';

describe('PostGradEventDetailComponent', () => {
  let component: PostGradEventDetailComponent;
  let fixture: ComponentFixture<PostGradEventDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostGradEventDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGradEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
