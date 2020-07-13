import { Injectable } from '@angular/core';

//Object to mask the key-value pair of (isAuthority, 1)
//to store it in localstorage and to be unknown to the user
const cryptoRandom = {
  isAuthority: 'wsulmfnd',
  one: 'iqxhbpjb',
  zero: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)
}

@Injectable({
  providedIn: 'root'
})
export class AuthAuthorityService {

  constructor() { }

  handle(user) {
    this.setRole(user);
    localStorage.setItem('id', user.user_id);
    localStorage.setItem('authority_id', user.authority_id);
  }

  setRole(user) {
    let value = user.role == 1 ? cryptoRandom.one : cryptoRandom.zero;
    localStorage.setItem(cryptoRandom.isAuthority, value);
  }

  get() {
    return localStorage.getItem(cryptoRandom.isAuthority);
  }

  remove() {
    localStorage.removeItem(cryptoRandom.isAuthority);
  }

  isAuthority() {
    const role = this.get();
    if (role && role == cryptoRandom.one) {
      return true;
    }
    return false;
  }

}
