import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let currentAuthState;
    this.loggedIn.subscribe((b) => (currentAuthState = b));
    if (!currentAuthState) {
      this.router.navigateByUrl('/all-contacts');
      return false;
    }
    return true;
  }

  logIn() {
    this.loggedIn.next(true);
  }

  logOut() {
    this.loggedIn.next(false);
  }
}
