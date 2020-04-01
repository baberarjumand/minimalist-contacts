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
  private contactId: string;
  private currentContact: Contact;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService
  ) {}

  ngOnInit() {
    this.contactId = this.activatedRoute.snapshot.paramMap.get("id");
    this.currentContact = this.contactsService.getContactById(this.contactId);
  }

  callNumber() {
    // TODO
    console.log("call feature to be implemented");
  }

  messageNumber() {
    // TODO
    console.log("messaging feature to be implemented");
  }

  emailContact() {
    // TODO
    console.log("email feature to be implemented");
  }
}
