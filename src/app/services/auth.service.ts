// reference for firebase auth
// https://www.positronx.io/ionic-firebase-authentication-tutorial-with-examples/

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { User } from '../model/user.model';
import * as firebase from 'firebase/app';
import { map, takeLast, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  userData: any;

  canActivate() {
    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    // return user !== null && user.emailVerified !== false ? true : false;
    return user !== null;
  }

  getCurrentUserId(): Observable<string> {
    return this.ngFireAuth.authState.pipe(
      map((user) => {
        if (user) {
          return user.uid;
        }
      })
    );
  }

  getCurrentUserDetails(): Observable<User> {
    return this.ngFireAuth.authState.pipe(
      map((user) => {
        if (user) {
          const currentUserDetails: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            isAnon: user.isAnonymous,
          };
          return currentUserDetails;
        }
      })
    );
  }

  isUserAnon(): Observable<boolean> {
    return this.ngFireAuth.authState.pipe(
      map((user) => {
        if (user) {
          return user.isAnonymous;
        }
      })
    );
  }

  // Sign in with Gmail
  googleAuth() {
    this.ngFireAuth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return this.authLogin(new auth.GoogleAuthProvider());
      });
  }

  signInAnonymously() {
    this.ngFireAuth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return this.ngFireAuth
          .signInAnonymously()
          .then((result) => {
            this.ngZone.run(() => {
              this.router.navigate(['all-contacts']);
            });
            // this.setUserData(result.user);
          })
          .catch((error) => {
            window.alert(error);
          });
      });
  }

  // Auth providers
  authLogin(provider) {
    return this.ngFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['all-contacts']);
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Store user in localStorage
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      isAnon: user.isAnonymous,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign-out
  signOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
