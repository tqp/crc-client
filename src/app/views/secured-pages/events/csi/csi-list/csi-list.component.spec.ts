import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiListComponent } from './csi-list.component';

describe('CsiListComponent', () => {
  let component: CsiListComponent;
  let fixture: ComponentFixture<CsiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
