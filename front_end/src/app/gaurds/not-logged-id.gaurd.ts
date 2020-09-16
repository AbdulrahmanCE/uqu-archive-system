import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class NotLoggedInGaurd implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate() {
    let loggedIn: boolean;
    this.auth.loggedIn$.subscribe(authState => loggedIn = authState);

    if (!loggedIn) {
      return true;
    } else {
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}