import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormLabelingComponent } from './form-labeling/form-labeling.component';
import { FormLabelingDialogComponent } from './form-labeling-dialog/form-labeling-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ProjectsListComponent, ProjectItemComponent, NewProjectComponent, ProjectDetailsComponent, FormLabelingComponent, FormLabelingDialogComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFileUploadModule,
    ImageCropperModule,
    MatDialogModule
  ],
  entryComponents: [ FormLabelingDialogComponent ]
})
export class ProjectsModule { }
