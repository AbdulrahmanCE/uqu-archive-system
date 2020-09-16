import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { FormLabelingComponent } from './form-labeling/form-labeling.component';


const routes: Routes = [
  {
    path: 'list',
    component: ProjectsListComponent
  },
  {
    path: 'new',
    component: NewProjectComponent
  },
  {
    path: 'labeling',
    component: FormLabelingComponent
  },
  {
    path: ':id',
    component: ProjectDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
