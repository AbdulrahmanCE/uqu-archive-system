import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { IForm } from "src/app/models/form.interface";
import { Observable } from "rxjs";
import { ProjectService } from "src/app/services/project.service";
import { IFormLabel } from "src/app/models/form-label.interface";
import { SharedAnimations } from "src/app/shared/animation/shared-animations";
import { MatDialog } from "@angular/material/dialog";
import { FormLabelingDialogComponent } from "../form-labeling-dialog/form-labeling-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-form-labeling",
  templateUrl: "./form-labeling.component.html",
  styleUrls: ["./form-labeling.component.scss"],
  animations: [SharedAnimations],
})
export class FormLabelingComponent implements OnInit {
  form$: Observable<IForm>;
  imgSrc: string | ArrayBuffer;
  currentFormLabel: IFormLabel;

  constructor(
    private formService: ProjectService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.getForm();
    this.loadImage();
  }

  getForm() {
    this.form$ = this.formService.getForm();
  }

  loadImage() {
    let imageFile: File = this.formService.getFormImages()[0];
    const fr = new FileReader();
    fr.onload = () => (this.imgSrc = fr.result);
    fr.readAsDataURL(imageFile);
  }

  updateLabeledFile(labeledImage: File) {
    this.formService.updateForm({ labeledImage });
  }

  addLabel() {
    this.formService.addLabel(this.currentFormLabel);
  }

  imageCropped(event: ImageCroppedEvent) {
    console.log("img cropped", event);
    let form: IForm = this.formService.getFormValue();
    const croppedImage = event.base64;
    const { x1, x2, y1, y2 } = event.imagePosition;
    if (form.img_height === null) {
      this.formService.updateForm({
        img_height: y2,
        img_width: x2,
      });
    }
    this.currentFormLabel = {
      name: "",
      content_type: "json",
      croppedImgBase64: croppedImage,
      start_x: x1,
      end_x: x2,
      start_y: y1,
      end_y: y2,
    };
  }

  onAddBtnClick() {
    this.openDialog();
  }

  onSendBtnClick() {
    this.formService
      .createForm()
      .toPromise()
      .then((f) => {
        this.snack.open("تم رفع النموذج بنجاح", "نجاح", { duration: 5000 });
        this.router.navigateByUrl("/");
      })
      .catch((error) => {
        if (error.status === 409) {
          this.snack.open("فشل التحميل: المستند موجود مسبقًا", "فشل", {
            duration: 5000,
          });
        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormLabelingDialogComponent, {
      width: "250px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result || !result.label) {
        return;
      }
      const { label } = result;
      this.currentFormLabel = { ...this.currentFormLabel, name: label };
      this.addLabel();
    });
  }
}
