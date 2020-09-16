import { Component, OnInit, Input } from '@angular/core';
import { IProject } from 'src/app/models/project.interface';
import { SharedAnimations } from 'src/app/shared/animation/shared-animations';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [SharedAnimations]
})
export class ProjectItemComponent implements OnInit {

  @Input() project: IProject;
  @Input() animationOrder = 0;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {
  }

}
