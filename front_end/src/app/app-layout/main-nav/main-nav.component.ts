import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ProgressBarService } from 'src/app/services/progress-bar.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  isHomePage: boolean;

  barLoading$: Observable<boolean> = this.progressBar.loading$;

  studentLink = "/home";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public  location: Location,
    public progressBar: ProgressBarService
  ) {}

  ngOnInit() {
    this.checkHomePage();
    let student_id = localStorage.getItem('student_id');
    if(student_id) {
      this.studentLink = "/students/" + student_id;
    }
  }

  isHandSet() {
    let output: boolean;
    this.isHandset$.subscribe(
      result => output = result
    ).unsubscribe();
    return output;
  }

  checkHomePage() {
    this.isHomePage = this.location.path() === '/home';
    this.location.onUrlChange(
      x => this.isHomePage = x === '/home'
    );
  }

}
