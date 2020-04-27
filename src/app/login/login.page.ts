import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl('/all-contacts');
    }
  }

  loginWithGoogle() {
    this.authService.googleAuth();
  }

  async loginAnonymously() {
    const alert = await this.alertController.create({
      header: 'Anonymous Login',
      message:
        'Anonymous login has been enabled for demo purposes only.<br><br>If you choose to continue anonymously, no changes will be synced or saved to the database.<br><br>Do you wish to continue?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.authService.signInAnonymously();
          },
        },
      ],
    });
    await alert.present();
  }
}
