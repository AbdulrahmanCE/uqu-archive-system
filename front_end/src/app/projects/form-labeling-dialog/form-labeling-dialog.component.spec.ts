import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLabelingDialogComponent } from './form-labeling-dialog.component';

describe('FormLabelingDialogComponent', () => {
  let component: FormLabelingDialogComponent;
  let fixture: ComponentFixture<FormLabelingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLabelingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLabelingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
