import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private currentUserSub: Subscription;
  // isLoggedIn$: Observable<boolean>;
  // isLoggedOut$: Observable<boolean>;
  // public selectedIndex = 0;
  // public appPages = [
  //   // {
  //   //   title: "Inbox",
  //   //   url: "/folder/Inbox",
  //   //   icon: "mail"
  //   // },
  //   // {
  //   //   title: "Outbox",
  //   //   url: "/folder/Outbox",
  //   //   icon: "paper-plane"
  //   // },
  //   // {
  //   //   title: "Favorites",
  //   //   url: "/folder/Favorites",
  //   //   icon: "heart"
  //   // },
  //   // {
  //   //   title: "Archived",
  //   //   url: "/folder/Archived",
  //   //   icon: "archive"
  //   // },
  //   // {
  //   //   title: "Trash",
  //   //   url: "/folder/Trash",
  //   //   icon: "trash"
  //   // },
  //   // {
  //   //   title: "Spam",
  //   //   url: "/folder/Spam",
  //   //   icon: "warning"
  //   // },
  //   {
  //     title: 'View Contacts',
  //     url: '/all-contacts',
  //     icon: 'people',
  //   },
  //   // {
  //   //   title: "Search Contacts",
  //   //   url: "/search-contacts",
  //   //   icon: "search"
  //   // },
  //   // {
  //   //   title: "Add Contact",
  //   //   url: "/add-contact",
  //   //   icon: "person-add"
  //   // },
  //   {
  //     title: 'My Account Settings',
  //     url: '/my-settings',
  //     icon: 'settings',
  //   },
  //   {
  //     title: 'About Developer',
  //     url: '/about-dev',
  //     // icon: "bug",
  //     icon: 'code-slash',
  //   },
  // ];
  // public labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    // const path = window.location.pathname.split('folder/')[1];
    // if (path !== undefined) {
    //   this.selectedIndex = this.appPages.findIndex(
    //     (page) => page.title.toLowerCase() === path.toLowerCase()
    //   );
    // }
    // this.isLoggedIn$ = this.authService.loggedIn;
    // this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
    this.currentUserSub = this.authService.ngFireAuth.authState
      .pipe(
        map((user) => {
          if (user) {
            const userInfo: any = {};
            userInfo.isAnon = user.isAnonymous;
            userInfo.name = user.displayName;
            userInfo.email = user.email;
            userInfo.uid = user.uid;
            return userInfo;
          }
        })
      )
      .subscribe((userInfo) => {
        if (userInfo) {
          console.log('current user: ', userInfo);
        }
      });
    // this.authService.ngFireAuth.authState.subscribe((user) =>
    //   user ? console.log('isAnon: ' + user.isAnonymous) : null
    // );
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }

  login() {
    // this.authService.logIn();
    // this.router.navigateByUrl('/test-page');
  }

  logOut() {
    // this.authService.logOut();
    // this.router.navigateByUrl('/all-contacts');
    this.authService.signOut();
    // console.log(this.authService.ngFireAuth.authState);
  }
}
