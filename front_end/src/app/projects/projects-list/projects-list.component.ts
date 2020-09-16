import { Component, OnInit } from "@angular/core";
import { IProject } from "src/app/models/project.interface";
import { SharedAnimations } from "src/app/shared/animation/shared-animations";
import { ProjectService } from "src/app/services/project.service";
import { Observable } from "rxjs";
import { tap, filter, map } from "rxjs/operators";

@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"],
  animations: [SharedAnimations]
})
export class ProjectsListComponent implements OnInit {
  projects$: Observable<IProject[]>;
  filteredProjects$: Observable<IProject[]>;
  categories$: Observable<string[]>;

  private _filterByCategory: string = "";
  private _filterByTitle: string = "";

  constructor(private projectService: ProjectService) {}

  set filterByCategory(value: string) {
    this._filterByCategory = value;
    this.updateFilter();
  }

  set filterByTitle(value: string) {
    this._filterByTitle = value;
    this.updateFilter();
  }

  get filterByCategory(): string {
    return this._filterByCategory;
  }

  get filterByTitle(): string {
    return this._filterByTitle;
  }

  getProjects() {
    // const projectsList$ = this.projectService.getProjects();
    // this.projects$ = projectsList$;
    // this.initFilters();
    // return projectsList$;
  }

  getCategories() {
    // const categoriesList$ = this.projectService.getCategories();
    // this.categories$ = categoriesList$;
    // return categoriesList$;
  }

  initFilters(): void {
    this.filteredProjects$ = this.projects$;
  }

  updateFilter(): void {
    this.filteredProjects$ = this.projects$.pipe(
      map(projects =>
        projects.filter(
          project =>
            (project.category == this.filterByCategory ||
            this.filterByCategory == "") &&
            (project.title.indexOf(this.filterByTitle) !== -1)
        )
      )
    );
  }

  ngOnInit() {
    this.getProjects();
    this.getCategories();
  }
}
