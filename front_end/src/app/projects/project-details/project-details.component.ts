import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animation/shared-animations';
import { ProjectService } from 'src/app/services/project.service';
import { Observable, Subscription } from 'rxjs';
import { IProject } from 'src/app/models/project.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { shareReplay, map } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  animations: [SharedAnimations]
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  isLoggedIn$: Observable<boolean> = this.authService.loggedIn$;
  isStudent$: Observable<boolean> = this.authService.isStudent$;
  isAuthority$: Observable<boolean> = this.authService.isAuthority$;

  isAuthorityOwnProject: boolean;

  // project information
  project: IProject;

  // new offer form
  description = new FormControl('', [Validators.required, Validators.minLength(50)]);

  // new offer animation state
  btnLoading = false;

  // subscriptions
  private projectSubscription: Subscription;
  private newOfferSub: Subscription;
  private acceptOfferSub: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private projectsService: ProjectService,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.projectSubscription = this.getProject();
    
  }

  ngOnDestroy() {
    if(this.projectSubscription) {
      this.projectSubscription.unsubscribe();
    }
    if(this.newOfferSub) {
      this.newOfferSub.unsubscribe();
    }
    if(this.acceptOfferSub) {
      this.acceptOfferSub.unsubscribe();
    }
  }

  getProject(): Subscription {
    const projectId = this.route.snapshot.params.id;
    // return this.projectsService.getProject(projectId).subscribe(
    //   project => {
    //     this.project = project;
    //     this.doesAuthorityOwnProject();
    //   },
    //   err => {
    //     this.router.navigateByUrl("/projects/list")
    //   }
    // );
    return null;
  }

  doesAuthorityOwnProject() {
    const user_id = +localStorage.getItem('id');
    this.isAuthorityOwnProject = user_id == this.project.authority.user_id;
  }

  createOffer() {
    this.btnLoading = true;
    let offer = {
      description: this.description.value,
      project_id: this.project.id
    };
    // this.newOfferSub = this.projectsService.createOffer(offer).subscribe(
    //   data => {
    //     this.btnLoading = false;
    //     this.getProject();
    //   },
    //   err => {
    //     this.btnLoading = false;
    //   }
    // )
  }

  acceptOffer(offer_id: number) {
    // this.btnLoading = true;
    // let offer = {
    //   offer_id: offer_id
    // };
    // this.acceptOfferSub = this.projectsService.acceptOffer(offer).subscribe(
    //   data => {
    //     this.btnLoading = false;
    //     this.router.navigateByUrl("/projects/list");
    //   },
    //   err => this.btnLoading = false
    // )
  }

}
