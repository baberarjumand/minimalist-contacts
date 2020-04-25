import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl('/all-contacts');
    }
  }

  loginWithGoogle() {
    this.authService.googleAuth();
  }

  loginAnonymously() {
    this.authService.signInAnonymously();
  }
}
