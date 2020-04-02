import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Contact } from "../model/contact.model";
import { Router } from "@angular/router";
import { ContactsService } from "../services/contacts.service";

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.page.html",
  styleUrls: ["./add-contact.page.scss"]
})
export class AddContactPage implements OnInit {
  private addedContact: Contact;
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contactsService: ContactsService
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      firstName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25)
        ])
      ],
      lastName: [
        "",
        Validators.compose([          
          Validators.minLength(2),
          Validators.maxLength(25)
        ])
      ],
      contactNumber: [
        "",
        Validators.compose([
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(7),
          Validators.maxLength(14)
        ])
      ],
      email: ["", Validators.email]
    });
  }

  onSubmit() {
    this.contactsService.addContact(this.addForm.value);
    this.addForm.reset();
    this.router.navigateByUrl("");
  }
}
