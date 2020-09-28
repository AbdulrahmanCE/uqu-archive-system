import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { IForm } from '../models/form.interface';
import { IFormLabel } from '../models/form-label.interface';
import { api } from './api';

const emptyForm: IForm = {
  name: null,
  img_height: null,
  img_width: null,
  labels: [],
  images: [],
  labeledImage: null
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private formSubject: BehaviorSubject<IForm>;

  constructor(
    private http: HttpClient
  ) {
    this.formSubject = new BehaviorSubject<IForm>(emptyForm);
  }

  getForm(): Observable<IForm> {
    return this.formSubject.asObservable();
  }

  getFormValue(): IForm {
    return this.formSubject.getValue();
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
    const oldForm: IForm = this.formSubject.getValue();
    const oldLabels: IFormLabel[] = oldForm.labels;
    const newLabels: IFormLabel[] = [...oldLabels, formLabel];
    this.updateForm({...oldForm, labels: newLabels});
  }

  removeLabel(formLabel: IFormLabel): void {
    const oldForm: IForm = this.formSubject.getValue();
    const oldLabels: IFormLabel[] = oldForm.labels;
    const newLabels: IFormLabel[] = oldLabels.filter(lbl => lbl.name !== formLabel.name);
    this.updateForm({...oldForm, labels: newLabels});
  }

  createForm(): Observable<IForm> {
    const form = this.formSubject.getValue();
    const createdForm: IForm = {
      ...form,
      labels: form.labels.map(lbl => ({...lbl, croppedImgBase64: null})),
      images: null
    }
    return this.http.post<any>(api.newForm, {template: createdForm})
  }
}
