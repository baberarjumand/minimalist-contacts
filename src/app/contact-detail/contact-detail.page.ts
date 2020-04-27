import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../model/contact.model';
import { ContactsService } from '../services/contacts.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
})
export class ContactDetailPage implements OnInit {
  private contactId: string;
  currentContact: Contact;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // this.contactId = this.activatedRoute.snapshot.paramMap.get("id");
    // if (!this.contactId) {
    //     this.router.navigateByUrl("");
    // }
    // // this.currentContact = this.contactsService.getContactById(this.contactId);
    // this.contactsService
    //     .getContactById(this.contactId)
    //     .subscribe((c) => (this.currentContact = c));
    // if (!this.currentContact) {
    //     this.router.navigateByUrl("");
    // }
    this.currentContact = this.activatedRoute.snapshot.data.contact;
  }

  ionViewWillEnter() {
    this.currentContact = this.activatedRoute.snapshot.data.contact;
  }

  callNumber() {
    // TODO
    console.log('call feature to be implemented');
  }

  messageNumber() {
    // TODO
    console.log('messaging feature to be implemented');
  }

  emailContact() {
    // TODO
    console.log('email feature to be implemented');
  }
}
