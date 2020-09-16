import { Injectable } from '@angular/core';

import { api } from '../api';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { AuthAuthorityService } from './auth-authority.service';
import { AuthStudentService } from './auth-student.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenTimer;

  constructor(
    private http: HttpClient,
    private token: TokenService,
    private authorityAuth: AuthAuthorityService,
    private studentAuth: AuthStudentService,
    private router: Router
  ) { }

  register(data) {
    let sub = this.http.post<any>(api.registerUrl, data);
    return sub;
  }

  login(data) {
    let sub = this.http.post<any>(api.loginUrl, data);
    return sub;
  }

  logout() {
    return this.http.get<any>(api.logoutUrl).subscribe(
      res => {
        if (res) {
          localStorage.clear();
          this.changeAuthStatus(false);
          this.refreshAuthorityStatus();
          this.refreshStudentStatus();
          clearTimeout(this.tokenTimer);
          this.router.navigateByUrl('/home');
        }
      });
  }

  doLoginStuff(data) {
    this.token.handle(data.token);
    this.changeAuthStatus(true);
    this.authorityAuth.handle(data);
    this.refreshAuthorityStatus();
    this.studentAuth.handle(data);
    this.refreshStudentStatus();
    this.setAuthTimer();
    if(data.student_id) {
      this.router.navigateByUrl('/students/'+data.student_id);
    } else if(data.authority_id) {
      this.router.navigateByUrl('/home');
    }
  }

  setAuthTimer() {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, 3600 * 1000);
  }

  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  loggedIn$ = this.loggedIn.asObservable();

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  private isAuthority = new BehaviorSubject<boolean>(this.authorityAuth.isAuthority());
  isAuthority$ = this.isAuthority.asObservable();

  refreshAuthorityStatus() {
    this.isAuthority.next(this.authorityAuth.isAuthority());
  }

  private isStudent = new BehaviorSubject<boolean>(this.studentAuth.isStudent());
  isStudent$ = this.isStudent.asObservable();

  refreshStudentStatus() {
    this.isStudent.next(this.studentAuth.isStudent());
  }

}
