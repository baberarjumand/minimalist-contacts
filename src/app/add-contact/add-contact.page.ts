import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../model/contact.model';
import { Router } from '@angular/router';
import { ContactsService } from '../services/contacts.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { LocalContactService } from '../services/local-contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit, OnDestroy {
  private addedContact: Contact;
  addForm: FormGroup;
  private isAnonUser: boolean;
  private tempSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contactsService: ContactsService,
    private authService: AuthService,
    private localContactsService: LocalContactService
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      firstName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ]),
      ],
      lastName: [
        '',
        Validators.compose([Validators.minLength(2), Validators.maxLength(25)]),
      ],
      contactNumber: [
        '',
        Validators.compose([
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(7),
          Validators.maxLength(14),
        ]),
      ],
      email: ['', Validators.email],
    });
    this.tempSub = this.authService
      .isUserAnon()
      .subscribe((userStatus) => (this.isAnonUser = userStatus));
  }

  ngOnDestroy() {
    this.tempSub.unsubscribe();
  }

  onSubmit() {
    if (this.isAnonUser) {
      this.localContactsService.addContact(this.addForm.value);
    } else {
      this.contactsService.addContact(this.addForm.value);
    }
    this.addForm.reset();
    this.router.navigateByUrl('');
  }
}
