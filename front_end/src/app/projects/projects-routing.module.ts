import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewProjectComponent } from './new-project/new-project.component';
import { FormLabelingComponent } from './form-labeling/form-labeling.component';
import { PredictComponent } from './predict/predict.component';
import { PredictionResultsComponent } from './prediction-results/prediction-results.component';


const routes: Routes = [
  {
    path: 'new',
    component: NewProjectComponent
  },
  {
    path: 'labeling',
    component: FormLabelingComponent
  },
  {
    path: 'predict',
    component: PredictComponent
  },
  {
    path: 'prediction-results',
    component: PredictionResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
