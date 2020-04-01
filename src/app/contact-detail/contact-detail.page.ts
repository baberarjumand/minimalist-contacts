import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    private contactsService: ContactsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.contactId = this.activatedRoute.snapshot.paramMap.get("id");
    if (!this.contactId) {
      this.router.navigateByUrl("");
    }
    this.currentContact = this.contactsService.getContactById(this.contactId);
    if (!this.currentContact) {
      this.router.navigateByUrl("");
    }
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
