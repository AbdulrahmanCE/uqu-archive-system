import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthorityGaurd implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate() {
    let isAuthority: boolean;
    this.auth.isAuthority$.subscribe(authorityState => isAuthority = authorityState);

    if (isAuthority) {
      return true;
    } else {
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}