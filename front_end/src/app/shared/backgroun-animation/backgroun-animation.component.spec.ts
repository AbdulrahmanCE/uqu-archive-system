import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgrounAnimationComponent } from './backgroun-animation.component';

describe('BackgrounAnimationComponent', () => {
  let component: BackgrounAnimationComponent;
  let fixture: ComponentFixture<BackgrounAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgrounAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgrounAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
