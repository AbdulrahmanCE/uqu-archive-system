import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { SharedAnimations } from 'src/app/shared/animation/shared-animations';

@Component({
  selector: "app-predict",
  templateUrl: "./predict.component.html",
  styleUrls: ["./predict.component.scss"],
  animations: [SharedAnimations]
})
export class PredictComponent implements OnInit {

  document: File;
  predicting = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {}

  onDocumentSelected(e) {
    const files = e.target.files;
    this.document = files[0];
  }

  onPredictBtnClicked(e) {
    
  }
}
