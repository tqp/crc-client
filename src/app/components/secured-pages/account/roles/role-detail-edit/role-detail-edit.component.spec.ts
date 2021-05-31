import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDetailEditComponent } from './role-detail-edit.component';

describe('RoleDetailEditComponent', () => {
  let component: RoleDetailEditComponent;
  let fixture: ComponentFixture<RoleDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
