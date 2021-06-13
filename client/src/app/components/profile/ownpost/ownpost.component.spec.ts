import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnpostComponent } from './ownpost.component';

describe('OwnpostComponent', () => {
  let component: OwnpostComponent;
  let fixture: ComponentFixture<OwnpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
