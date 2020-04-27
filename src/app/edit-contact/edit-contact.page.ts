import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../services/contacts.service';
import { Contact } from '../model/contact.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LocalContactService } from '../services/local-contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit, OnDestroy {
  private contactId: string;
  private currentContact: Contact;
  editFormGroup: FormGroup;
  private isAnonUser: boolean;
  private tempSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private localContactsService: LocalContactService
  ) {}

  ngOnInit() {
    // this.contactId = this.activatedRoute.snapshot.paramMap.get("id");
    // if (!this.contactId) {
    //     this.router.navigateByUrl("");
    // }

    // // this.currentContact = this.contactsService.getContactById(this.contactId);
    // this.contactsService.getContactById(this.contactId).subscribe((c) => {
    //     this.currentContact = c;
    // });
    this.currentContact = this.activatedRoute.snapshot.data.contact;
    // if (this.currentContact) {
    this.editFormGroup = this.formBuilder.group({
      firstName: [
        this.currentContact.firstName,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ]),
      ],
      lastName: [
        this.currentContact.lastName,
        Validators.compose([Validators.minLength(2), Validators.maxLength(25)]),
      ],
      contactNumber: [
        this.currentContact.contactNumber,
        Validators.compose([
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(7),
          Validators.maxLength(10),
        ]),
      ],
      email: [this.currentContact.email, Validators.email],
    });
    // console.log(this.currentContact);
    // } else {
    // this.router.navigateByUrl("");
    // }
    this.tempSub = this.authService
      .isUserAnon()
      .subscribe((userStatus) => (this.isAnonUser = userStatus));
  }

  ngOnDestroy() {
    this.tempSub.unsubscribe();
  }

  onSubmit() {
    if (this.isAnonUser) {
      this.localContactsService.updateContact(
        this.currentContact.id,
        this.editFormGroup.value
      );
      this.router.navigateByUrl('/contact-detail/' + this.currentContact.id);
    } else {
      this.contactsService
        .updateContact(this.currentContact.id, this.editFormGroup.value)
        .subscribe(() => {
          this.editFormGroup.reset();
          this.router.navigateByUrl(
            '/contact-detail/' + this.currentContact.id
          );
        });
    }
  }

  async deleteContact() {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this contact?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            // console.log("Confirm delete contact id: " + this.currentContact.id);
            if (this.isAnonUser) {
              this.localContactsService.deleteContact(this.currentContact.id);
            } else {
              this.contactsService.deleteContact(this.currentContact.id);
            }
            this.router.navigateByUrl('');
          },
        },
      ],
    });
    await alert.present();
  }
}
