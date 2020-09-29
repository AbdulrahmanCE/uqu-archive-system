import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ProjectService } from "src/app/services/project.service";
import { SharedAnimations } from "src/app/shared/animation/shared-animations";

@Component({
  selector: "app-prediction-results",
  templateUrl: "./prediction-results.component.html",
  styleUrls: ["./prediction-results.component.scss"],
  animations: [SharedAnimations],
})
export class PredictionResultsComponent implements OnInit {
  predictionResults$: Observable<any>;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.predictionResults$ = this.projectService
      .getPredictionResults()
      .pipe(map((data) => this.convertDataScheme(data)));
  }

  convertDataScheme(data) {
    console.log(data);
    return data.map((page) =>
      page.reduce((acc, curr) => ({ ...acc, [curr.label]: { ...curr } }), {})
    );
  }
}
