import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGradEventTypeListComponent } from './post-grad-event-type-list.component';

describe('PostGradEventTypeListComponent', () => {
  let component: PostGradEventTypeListComponent;
  let fixture: ComponentFixture<PostGradEventTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostGradEventTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGradEventTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
