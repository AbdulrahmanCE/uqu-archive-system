import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { IModel } from "src/app/models/model.interface";
import { ProjectService } from "src/app/services/project.service";
import { SharedAnimations } from "src/app/shared/animation/shared-animations";

@Component({
  selector: "app-predict",
  templateUrl: "./predict.component.html",
  styleUrls: ["./predict.component.scss"],
  animations: [SharedAnimations],
})
export class PredictComponent implements OnInit, OnDestroy {
  document: File;
  model: number;
  predicting = false;
  task_id: string = null;

  models$: Observable<IModel[]> = of([]);

  status: "not uploaded" | "uploading" | "uploaded" | "finished" =
    "not uploaded";

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

    timer;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private projectService: ProjectService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.models$ = this.projectService.getModels();
  }

  ngOnDestroy() {
    if(this.timer) {
      clearTimeout(this.timer);
    }
  }

  onDocumentSelected(e) {
    const files = e.target.files;
    this.document = files[0];
  }

  onPredictBtnClicked(e) {
    this.status = "uploading";
    this.projectService
      .uploadFile(this.document, this.model)
      .toPromise()
      .then((res) => {
        this.task_id = res.task_id;
        this.status = "uploaded";
        this.startResultPolling();
      });
  }

  startResultPolling() {
    this.timer = setTimeout(() => {
      this.projectService
        .checkTask(this.task_id)
        .toPromise()
        .then((res) => {
          if (res.state) {
            this.startResultPolling();
          } else {
            this.showResults(res);
            this.status = "finished";
            this.snack.open("تم الانتهاء من المسح", "نجاح", { duration: 5000 });
          }
        });
    }, 3000);
  }

  showResults(res: any) {
    this.projectService.updatePredictionResults(res);
    this.router.navigateByUrl("/projects/prediction-results");
  }
}
