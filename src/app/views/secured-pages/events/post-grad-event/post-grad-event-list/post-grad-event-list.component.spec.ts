import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGradEventListComponent } from './post-grad-event-list.component';

describe('PostGradEventListComponent', () => {
  let component: PostGradEventListComponent;
  let fixture: ComponentFixture<PostGradEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostGradEventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGradEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
