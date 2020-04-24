import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { Contact } from '../model/contact.model';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.page.html',
  styleUrls: ['./all-contacts.page.scss'],
})
export class AllContactsPage implements OnInit {
  contacts: Contact[] = [];
  randomBool = true;

  constructor(
    private contactsService: ContactsService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    // this.contacts = this.contactsService.getAllContacts();
    const loading = await this.loadingCtrl.create({
      message: 'Fetching contacts...',
    });
    await loading.present();
    this.contactsService.getAllContacts().subscribe((contacts) => {
      this.contacts = contacts;
      loading.dismiss();
    });
    // this.contactsService
    //     .getContactById("aG5H3zvwJB2GQqJD1w7e")
    //     .subscribe((val) => console.log(val));
  }

  instaAddRandomContacts() {
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
