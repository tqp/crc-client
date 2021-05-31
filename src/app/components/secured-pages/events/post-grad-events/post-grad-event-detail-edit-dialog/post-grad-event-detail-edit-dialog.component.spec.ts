import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGradEventDetailEditDialogComponent } from './post-grad-event-detail-edit-dialog.component';

describe('PostGradEventDetailEditDialogComponent', () => {
  let component: PostGradEventDetailEditDialogComponent;
  let fixture: ComponentFixture<PostGradEventDetailEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostGradEventDetailEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGradEventDetailEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
