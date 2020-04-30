import { Component, OnInit, NgZone } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { Contact } from '../model/contact.model';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { map, mergeMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalContactService } from '../services/local-contact.service';
import { iif, of } from 'rxjs';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.page.html',
  styleUrls: ['./all-contacts.page.scss'],
})
export class AllContactsPage implements OnInit {
  contacts: Contact[] = [];
  isUserAnon: boolean;

  constructor(
    private contactsService: ContactsService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private localContactsService: LocalContactService
  ) {}

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Fetching contacts...',
    });
    await loading.present();

    this.authService
      .isUserAnon()
      .pipe(
        mergeMap((userStatus) =>
          iif(
            () => {
              this.isUserAnon = userStatus;
              return userStatus;
            },
            of(this.localContactsService.getAllContacts()),
            this.contactsService.getAllContacts(userStatus)
          )
        )
      )
      .subscribe((contacts) => {
        this.contacts = contacts;
        loading.dismiss();
      });
  }

  instaAddRandomContacts() {
    if (!this.isUserAnon) {
      this.contactsService.addContact({
        firstName: 'Anakin',
        lastName: 'Skywalker',
        email: 'ani@sand.com',
      });
      this.contactsService.addContact({
        firstName: 'Obi-Wan',
        lastName: 'Kenobi',
        email: 'hello@there.com',
      });
      this.contactsService.addContact({
        firstName: 'Palpatine',
        contactNumber: 6666666,
        email: 'loves@democracy.com',
      });
    }
  }

  goToAddContactPage() {
    this.ngZone.run(() => this.router.navigate(['add-contact']));
  }
}
