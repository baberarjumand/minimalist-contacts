import { Injectable } from '@angular/core';
import { Contact } from '../model/contact.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private currentUserId: string;

  constructor(
    private db: AngularFirestore,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {
    this.authService
      .getCurrentUserId()
      .subscribe((uid) => (this.currentUserId = uid));
  }

  convertSnaps<T>(snaps) {
    return snaps.map((snap) => {
      return {
        id: snap.payload.doc.id,
        ...(snap.payload.doc.data() as T),
      };
    }) as T[];
  }

  getAllContacts(isUserAnon): Observable<Contact[]> {
    if (!isUserAnon && isUserAnon != null) {
      return this.db
        .collection('contacts', (ref) =>
          ref.where('uid', '==', this.currentUserId).orderBy('firstName')
        )
        .snapshotChanges()
        .pipe(map((snaps) => this.convertSnaps<Contact>(snaps)));
    }
  }

  async addContact(addFormData) {
    const tempContact: any = {
      firstName: this.capitalizeFirstLetter(addFormData.firstName),
    };
    if (addFormData.lastName !== '' && addFormData.lastName !== undefined) {
      tempContact.lastName = this.capitalizeFirstLetter(addFormData.lastName);
    }
    if (
      addFormData.contactNumber !== '' &&
      addFormData.contactNumber !== undefined
    ) {
      tempContact.contactNumber = addFormData.contactNumber;
    }
    if (addFormData.email !== '' && addFormData.email !== undefined) {
      tempContact.email = addFormData.email;
    }
    // console.log(tempContact);

    // this.authService.getCurrentUserId().subscribe((currentUserId) => {
    //   if (currentUserId) {
    //     tempContact.uid = currentUserId;
    //   }
    // });

    tempContact.uid = this.currentUserId;

    const loading = await this.loadingCtrl.create({
      message: 'Adding contact, please wait...',
    });
    await loading.present();
    this.db
      .collection('contacts')
      .add(tempContact)
      .then((ref) => {
        // console.log("Added record with ID: " + ref.id);
        loading.dismiss();
      });
  }

  private capitalizeFirstLetter(s: string): string {
    if (typeof s !== 'string') return '';
    return (s.charAt(0).toUpperCase() + s.slice(1)).toString();
  }

  getContactById(contactId, isUserAnon): Observable<Contact> {
    if (!isUserAnon) {
      if (typeof contactId === 'number') {
        contactId = contactId.toString();
      }
      return this.db
        .collection('contacts')
        .doc(contactId)
        .get()
        .pipe(
          map((snap) => {
            return {
              id: snap.id,
              ...snap.data(),
            } as Contact;
          })
        );
    }
  }

  updateContact(contactId, editFormData): Observable<any> {
    const tempContact: any = {
      firstName: this.capitalizeFirstLetter(editFormData.firstName),
    };
    if (editFormData.lastName !== '' && editFormData.lastName !== undefined) {
      tempContact.lastName = this.capitalizeFirstLetter(editFormData.lastName);
    }
    if (editFormData.contactNumber) {
      tempContact.contactNumber = editFormData.contactNumber;
    }
    if (editFormData.email !== '' && editFormData.email !== undefined) {
      tempContact.email = editFormData.email;
    }
    tempContact.uid = this.currentUserId;
    // console.log(tempContact);

    return from(this.db.collection('contacts').doc(contactId).set(tempContact));
  }

  deleteContact(contactId) {
    this.db.collection('contacts').doc(contactId).delete();
  }
}
