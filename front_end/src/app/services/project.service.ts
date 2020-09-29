import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { IForm } from '../models/form.interface';
import { IFormLabel } from '../models/form-label.interface';
import { api } from './api';
import { IModel } from '../models/model.interface';

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
  private predictionResults: BehaviorSubject<any>;

  constructor(
    private http: HttpClient
  ) {
    this.formSubject = new BehaviorSubject<IForm>(emptyForm);
    this.predictionResults = new BehaviorSubject<any>([]);
  }

  getPredictionResults(): Observable<any> {
    return this.predictionResults.asObservable();
  }

  getPredictionResultsValue(): IForm {
    return this.predictionResults.getValue();
  }

  updatePredictionResults(res) {
    const oldResults = this.predictionResults.getValue();
    const newResults =[...res];
    console.log(newResults)
    this.predictionResults.next(newResults);
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

  getModels(): Observable<IModel[]> {
    return this.http.get<IModel[]>(api.models);
  }

  uploadFile(file: File, model_id: number): Observable<{task_id: string}> {
    const formData = new FormData();
    formData.append('model_id', `${model_id}`);
    formData.append('file', file);
    return this.http.post<{task_id: string}>(api.upload, formData);
  }

  checkTask(task_id: string): Observable<any> {
    return this.http.get<any>(`${api.checkTask}?task_id=${task_id}`);
  }
}
