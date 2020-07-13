import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLabelingComponent } from './form-labeling.component';

describe('FormLabelingComponent', () => {
  let component: FormLabelingComponent;
  let fixture: ComponentFixture<FormLabelingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLabelingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLabelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
