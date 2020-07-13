import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SharedAnimations } from 'src/app/shared/animation/shared-animations';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { IForm } from 'src/app/models/form.interface';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  animations: [SharedAnimations]
})
export class NewProjectComponent implements OnInit {

  newProjectForm: FormGroup;
  title = new FormControl('', [Validators.required]);
  images: File[] = [];

  // animation state
  btnLoading = false;

  constructor(
    private formService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildNewProjectForm();
  }

  buildNewProjectForm(): void {
    this.newProjectForm = new FormGroup({
      title: this.title
    });
  }

  toStringDate(date: Date) {
    let strDate2 = date.toISOString().split("T");
    let strDate = strDate2[0].split("-");
    return `${strDate[0]}-${strDate[1]}-${strDate[2]}`;
  }

  onImagesSelected(e) {
    const files = e.target.files;
    this.images = [...files];
  }

  onNextBtnClicked() {
    const form: IForm = {
      title: this.title.value,
      images: [...this.images]
    }
    this.formService.updateForm(form);
    this.router.navigateByUrl("/projects/labeling");
  }
}
