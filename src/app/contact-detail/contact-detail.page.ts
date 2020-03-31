import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Contact } from "../model/contact.model";
import { ContactsService } from "../services/contacts.service";

@Component({
  selector: "app-contact-detail",
  templateUrl: "./contact-detail.page.html",
  styleUrls: ["./contact-detail.page.scss"]
})
export class ContactDetailPage implements OnInit {
  contactId: string;
  currentContact: Contact;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService
  ) {}

  ngOnInit() {
    this.contactId = this.activatedRoute.snapshot.paramMap.get("id");
    this.currentContact = this.contactsService.getContactById(this.contactId)[0];
  }
}
