import { Injectable } from '@angular/core';
import { Contact } from '../model/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor() { }

  getTestContacts() {
    const contacts = [];
    contacts.push(new Contact('2', 'FName2', 'LName2', '5678901234', 'fname0.lname0@email.com'));
    contacts.push(new Contact('0', 'FName0', 'LName0', '0123456789', 'fname0.lname0@email.com'));
    contacts.push(new Contact('1', 'FName1', 'LName1', '9876543210', 'fname1.lname1@email.com'));
    return contacts;
  }

  getContactById(contactId: string) {
    const contacts = this.getTestContacts();
    return contacts.filter((contact) => contact.id === contactId);
  }
}
