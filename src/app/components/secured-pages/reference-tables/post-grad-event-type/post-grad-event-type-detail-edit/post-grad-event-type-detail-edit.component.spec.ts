import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGradEventTypeDetailEditComponent } from './post-grad-event-type-detail-edit.component';

describe('PostGradEventTypeDetailEditComponent', () => {
  let component: PostGradEventTypeDetailEditComponent;
  let fixture: ComponentFixture<PostGradEventTypeDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostGradEventTypeDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGradEventTypeDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
