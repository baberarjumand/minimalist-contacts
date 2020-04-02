import { Component, OnInit } from "@angular/core";
import { ContactsService } from "../services/contacts.service";
import { Contact } from "../model/contact.model";

@Component({
  selector: "app-all-contacts",
  templateUrl: "./all-contacts.page.html",
  styleUrls: ["./all-contacts.page.scss"]
})
export class AllContactsPage implements OnInit {
  contacts: Contact[];
  randomBool = true;

  constructor(private contactsService: ContactsService) {}

  ngOnInit() {
    this.contacts = this.contactsService.getAllContacts();
  }
}
