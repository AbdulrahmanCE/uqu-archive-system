import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProjectsRoutingModule } from "./projects-routing.module";
import { SharedModule } from "../shared/shared.module";
import { NewProjectComponent } from "./new-project/new-project.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFileUploadModule } from "angular-material-fileupload";
import { ImageCropperModule } from "ngx-image-cropper";
import { FormLabelingComponent } from "./form-labeling/form-labeling.component";
import { FormLabelingDialogComponent } from "./form-labeling-dialog/form-labeling-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { PredictComponent } from "./predict/predict.component";
import { PredictionResultsComponent } from "./prediction-results/prediction-results.component";

@NgModule({
  declarations: [
    NewProjectComponent,
    FormLabelingComponent,
    FormLabelingDialogComponent,
    PredictComponent,
    PredictionResultsComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFileUploadModule,
    ImageCropperModule,
    MatDialogModule,
  ],
  entryComponents: [FormLabelingDialogComponent],
})
export class ProjectsModule {}
