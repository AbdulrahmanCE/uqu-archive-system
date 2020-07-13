import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { IForm } from '../models/form.interface';
import { IFormLabel } from '../models/form-label.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private formSubject: BehaviorSubject<IForm>;
  
  constructor() {
    this.formSubject = new BehaviorSubject<IForm>({labels: []});
  }

  getForm(): Observable<IForm> {
    return this.formSubject.asObservable();
  }

  getFormImages(): File[] {
    return [...this.formSubject.getValue().images]
  }

  updateForm(passedForm: IForm): void {
    const oldForm: IForm = this.formSubject.getValue();
    const newForm: IForm = {...oldForm, ...passedForm};
    console.log(newForm)
    this.formSubject.next(newForm);
  }

  addLabel(formLabel: IFormLabel): void {
    const oldLabels: IFormLabel[] = this.formSubject.getValue().labels;
    const newLabels: IFormLabel[] = [...oldLabels, formLabel];
    this.updateForm({labels: newLabels});
  }

  removeLabel(formLabel: IFormLabel): void {
    const oldLabels: IFormLabel[] = this.formSubject.getValue().labels;
    const newLabels: IFormLabel[] = oldLabels.filter(lbl => lbl.label !== formLabel.label);
    this.updateForm({labels: newLabels});
  }

  createForm(): Observable<IForm> {
    const form = this.formSubject.getValue()
    const createdForm = {
      ...form,
      labels: form.labels.map(lbl => ({...lbl, croppedImgBase64: null}))
    }
    console.log(createdForm);
    return this.formSubject.asObservable();
  }
}