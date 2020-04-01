import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ContactsService } from "../services/contacts.service";
import { Contact } from "../model/contact.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-contact",
  templateUrl: "./edit-contact.page.html",
  styleUrls: ["./edit-contact.page.scss"]
})
export class EditContactPage implements OnInit {
  private contactId: string;
  private currentContact: Contact;
  private editFormGroup: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.contactId = this.activatedRoute.snapshot.paramMap.get("id");
    if (!this.contactId) {
      this.router.navigateByUrl("");
    }
    this.currentContact = this.contactsService.getContactById(this.contactId);
    if (this.currentContact) {
      this.editFormGroup = this.formBuilder.group({
        firstName: [this.currentContact.firstName, Validators.required],
        lastName: [this.currentContact.lastName],
        contactNumber: [
          this.currentContact.contactNumber,
          Validators.compose([
            Validators.pattern("^[0-9]*$"),
            Validators.minLength(7),
            Validators.maxLength(10)
          ])
        ],
        email: [this.currentContact.email, Validators.email]
      });
    } else {
      this.router.navigateByUrl("");
    }
  }

  onSubmit() {
    this.contactsService.updateContact(this.editFormGroup.value);
    this.editFormGroup.reset();
    this.router.navigateByUrl("/contact-detail/" + this.currentContact.id);
  }
}
