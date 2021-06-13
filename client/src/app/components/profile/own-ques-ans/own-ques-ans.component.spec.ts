import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnQuesAnsComponent } from './own-ques-ans.component';

describe('OwnQuesAnsComponent', () => {
  let component: OwnQuesAnsComponent;
  let fixture: ComponentFixture<OwnQuesAnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnQuesAnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnQuesAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
