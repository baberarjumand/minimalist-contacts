import { Injectable } from "@angular/core";
import { Contact } from "../model/contact.model";

@Injectable({
  providedIn: "root"
})
export class ContactsService {
  savedContacts: Contact[];

  constructor() {
    const contacts = [];
    contacts.push(
      new Contact(
        "2",
        "FName2",
        "LName2",
        "5678901234",
        "fname0.lname0@email.com"
      )
    );
    contacts.push(
      new Contact(
        "0",
        "FName0",
        "LName0",
        "0123456789",
        "fname0.lname0@email.com"
      )
    );
    contacts.push({
      id: "234",
      firstName: "OName234",
      email: "fname234@email.com"
    });
    contacts.push(
      new Contact(
        "1",
        "FName1",
        "LName1",
        "9876543210",
        "fname1.lname1@email.com"
      )
    );
    contacts.push({
      id: "973",
      firstName: "RName973",
      contactNumber: "9731234973"
    });
    this.savedContacts = contacts;
    this.savedContacts = this.sortContacts(this.savedContacts);
  }

  // getTestContacts() {
  //   return this.savedContacts;
  // }

  getAllContacts() {
    return this.savedContacts;
  }

  addContact(addFormData) {
    // console.log(addFormData);
    let tempContact: Contact = {
      id: this.generateUniqueId(),
      firstName: this.capitalizeFirstLetter(addFormData.firstName)
    };
    if (addFormData.lastName !== "") {
      tempContact.lastName = this.capitalizeFirstLetter(addFormData.lastName);
    }
    if (addFormData.contactNumber !== "") {
      tempContact.contactNumber = addFormData.contactNumber;
    }
    if (addFormData.email !== "") {
      tempContact.email = addFormData.email;
    }
    // console.log("Adding contact:");
    // console.log(tempContact);
    this.savedContacts.push(tempContact);
    this.savedContacts = this.sortContacts(this.savedContacts);
  }

  // this function starts a counter at the current length of getAllContacts()
  // it increments the counter, and then checks if that id exists in current list of contacts
  // if it does, it increments and repeats the last step
  // if it doesn't, it returns this counter value
  // this primitive method ensures uniqueIds for a small number of contacts
  // this method will not be used once firebase backend will be able to assign uuids automatically
  private generateUniqueId() {
    let uniqueId = this.getAllContacts().length;
    do {
      uniqueId++;
    } while (this.getContactById(uniqueId) !== undefined);
    return uniqueId.toString();
  }

  private capitalizeFirstLetter(s: string): string {
    if (typeof s !== "string") return "";
    return (s.charAt(0).toUpperCase() + s.slice(1)).toString();
  }

  getContactById(contactId: string | Number) {
    if (typeof contactId === "number") {
      contactId = contactId.toString();
    }
    const contacts = this.savedContacts;
    return contacts.filter(contact => contact.id === contactId)[0];
  }

  private sortContacts(contacts): Contact[] {
    return contacts.sort((contactA, contactB) =>
      contactA.firstName > contactB.firstName ? 1 : -1
    );
    // return this.savedContacts.sort((contactA, contactB) =>
    //   contactA.firstName > contactB.firstName ? 1 : -1
    // );
  }

  updateContact(contactId, editFormData) {
    const updateIndex = this.savedContacts.findIndex(
      c => c.id === contactId.toString()
    );
    if (updateIndex < 0) {
      return;
    }
    // console.log("Updating contact id: " + updateIndex);
    // console.log("Updating contact:");
    // console.log(this.savedContacts[updateIndex]);

    this.savedContacts[updateIndex].firstName = this.capitalizeFirstLetter(
      editFormData.firstName
    );
    this.savedContacts[updateIndex].lastName = this.capitalizeFirstLetter(
      editFormData.lastName
    );
    this.savedContacts[updateIndex].contactNumber = editFormData.contactNumber;
    this.savedContacts[updateIndex].email = editFormData.email;
    // console.log("Updated contact:");
    // console.log(this.savedContacts[updateIndex]);

    this.savedContacts = this.sortContacts(this.savedContacts);
  }

  deleteContact(contactId) {
    const deleteIndex = this.savedContacts.findIndex(
      c => c.id === contactId.toString()
    );
    if (deleteIndex < 0) {
      return;
    }

    this.savedContacts.splice(deleteIndex, 1);
  }
}
