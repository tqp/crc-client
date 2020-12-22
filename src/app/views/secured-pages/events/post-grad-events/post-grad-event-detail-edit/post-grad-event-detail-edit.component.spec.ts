import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGradEventDetailEditComponent } from './post-grad-event-detail-edit.component';

describe('PostGradEventDetailEditComponent', () => {
  let component: PostGradEventDetailEditComponent;
  let fixture: ComponentFixture<PostGradEventDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostGradEventDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGradEventDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
