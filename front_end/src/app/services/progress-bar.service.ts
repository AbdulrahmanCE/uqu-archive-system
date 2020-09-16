import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ProgressBarService {

  private loadingSub = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSub.asObservable();

  changeAuthStatus(value: boolean) {
    this.loadingSub.next(value);
  }

  constructor() {}
}
