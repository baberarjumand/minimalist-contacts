import { Injectable } from "@angular/core";
import { Contact } from "../model/contact.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, from } from "rxjs";
import { map, first } from "rxjs/operators";
import { LoadingController } from "@ionic/angular";

@Injectable({
    providedIn: "root",
})
export class ContactsService {
    // this implementation is for local storage
    // savedContacts: Contact[];

    constructor(
        private db: AngularFirestore,
        private loadingCtrl: LoadingController
    ) {
        // this implementation is for local storage
        // const contacts = [];
        // // contacts.push(
        // //   new Contact(
        // //     "2",
        // //     "FName2",
        // //     "LName2",
        // //     "5678901234",
        // //     "fname0.lname0@email.com"
        // //   )
        // // );
        // contacts.push(
        //   new Contact(
        //     "0",
        //     "FName0",
        //     "LName0",
        //     "0123456789",
        //     "fname0.lname0@email.com"
        //   )
        // );
        // contacts.push({
        //   id: "234",
        //   firstName: "OName234",
        //   email: "fname234@email.com"
        // });
        // // contacts.push(
        // //   new Contact(
        // //     "1",
        // //     "FName1",
        // //     "LName1",
        // //     "9876543210",
        // //     "fname1.lname1@email.com"
        // //   )
        // // );
        // contacts.push({
        //   id: "973",
        //   firstName: "RName973",
        //   contactNumber: "9731234973"
        // });
        // this.savedContacts = contacts;
        // this.savedContacts = this.sortContacts(this.savedContacts);
    }

    // getTestContacts() {
    //   return this.savedContacts;
    // }

    convertSnaps<T>(snaps) {
        return <T[]>snaps.map((snap) => {
            return {
                id: snap.payload.doc.id,
                ...(snap.payload.doc.data() as T),
            };
        });
    }

    getAllContacts(): Observable<Contact[]> {
        // this implementation is for local storage
        // return this.savedContacts;

        // this implementation is for firestore
        return this.db
            .collection("contacts", (ref) => ref.orderBy("firstName"))
            .snapshotChanges()
            .pipe(map((snaps) => this.convertSnaps<Contact>(snaps)));
    }

    async addContact(addFormData) {
        // this implementation is for local storage
        // console.log(addFormData);
        // let tempContact: Contact = {
        //     id: this.generateUniqueId(),
        //     firstName: this.capitalizeFirstLetter(addFormData.firstName),
        // };
        // if (addFormData.lastName !== "") {
        //     tempContact.lastName = this.capitalizeFirstLetter(
        //         addFormData.lastName
        //     );
        // }
        // if (addFormData.contactNumber !== "") {
        //     tempContact.contactNumber = addFormData.contactNumber;
        // }
        // if (addFormData.email !== "") {
        //     tempContact.email = addFormData.email;
        // }
        // // console.log("Adding contact:");
        // // console.log(tempContact);
        // this.savedContacts.push(tempContact);
        // this.savedContacts = this.sortContacts(this.savedContacts);

        // this implementation is for firestore
        let tempContact = {
            firstName: this.capitalizeFirstLetter(addFormData.firstName),
        };
        if (addFormData.lastName !== "" && addFormData.lastName !== undefined) {
            tempContact["lastName"] = this.capitalizeFirstLetter(
                addFormData.lastName
            );
        }
        if (
            addFormData.contactNumber !== "" &&
            addFormData.contactNumber !== undefined
        ) {
            tempContact["contactNumber"] = addFormData.contactNumber;
        }
        if (addFormData.email !== "" && addFormData.email !== undefined) {
            tempContact["email"] = addFormData.email;
        }
        // console.log(tempContact);

        const loading = await this.loadingCtrl.create({
            message: "Adding contact, please wait...",
        });
        await loading.present();
        this.db
            .collection("contacts")
            .add(tempContact)
            .then((ref) => {
                // console.log("Added record with ID: " + ref.id);
                loading.dismiss();
            });
    }

    // this implementation is for local storage
    // // this function starts a counter at the current length of getAllContacts()
    // // it increments the counter, and then checks if that id exists in current list of contacts
    // // if it does, it increments and repeats the last step
    // // if it doesn't, it returns this counter value
    // // this primitive method ensures uniqueIds for a small number of contacts
    // // this method will not be used once firebase backend will be able to assign uuids automatically
    // private generateUniqueId() {
    //     let uniqueId = this.getAllContacts().length;
    //     do {
    //         uniqueId++;
    //     } while (this.getContactById(uniqueId) !== undefined);
    //     return uniqueId.toString();
    // }

    private capitalizeFirstLetter(s: string): string {
        if (typeof s !== "string") return "";
        return (s.charAt(0).toUpperCase() + s.slice(1)).toString();
    }

    getContactById(contactId): Observable<Contact> {
        // this implementation is for local storage
        // if (typeof contactId === "number") {
        //     contactId = contactId.toString();
        // }
        // const contacts = this.savedContacts;
        // return contacts.filter((contact) => contact.id === contactId)[0];

        // this implementation is for firestore
        if (typeof contactId === "number") {
            contactId = contactId.toString();
        }
        return this.db
            .collection("contacts")
            .doc(contactId)
            .get()
            .pipe(
                map((snap) => {
                    return <Contact>{
                        id: snap.id,
                        ...snap.data(),
                    };
                })
            );
    }

    // this implementation is for local storage
    // private sortContacts(contacts): Contact[] {
    //     return contacts.sort((contactA, contactB) =>
    //         contactA.firstName > contactB.firstName ? 1 : -1
    //     );
    //     // return this.savedContacts.sort((contactA, contactB) =>
    //     //   contactA.firstName > contactB.firstName ? 1 : -1
    //     // );
    // }

    updateContact(contactId, editFormData): Observable<any> {
        // // this implementation is for local storage
        // const updateIndex = this.savedContacts.findIndex(
        //     (c) => c.id === contactId.toString()
        // );
        // if (updateIndex < 0) {
        //     return;
        // }
        // // console.log("Updating contact id: " + updateIndex);
        // // console.log("Updating contact:");
        // // console.log(this.savedContacts[updateIndex]);

        // this.savedContacts[updateIndex].firstName = this.capitalizeFirstLetter(
        //     editFormData.firstName
        // );
        // this.savedContacts[updateIndex].lastName = this.capitalizeFirstLetter(
        //     editFormData.lastName
        // );
        // this.savedContacts[updateIndex].contactNumber =
        //     editFormData.contactNumber;
        // this.savedContacts[updateIndex].email = editFormData.email;
        // // console.log("Updated contact:");
        // // console.log(this.savedContacts[updateIndex]);

        // this.savedContacts = this.sortContacts(this.savedContacts);

        // this implementation is for firestore
        // return from(
        //     this.db
        //         .collection("contacts")
        //         .doc(contactId)
        //         .update({
        //             firstName: this.capitalizeFirstLetter(
        //                 editFormData.firstName
        //             ),
        //             lastName: this.capitalizeFirstLetter(editFormData.lastName),
        //             contactNumber: editFormData.contactNumber,
        //             email: editFormData.email,
        //         })
        // );

        let tempContact = {
            firstName: this.capitalizeFirstLetter(editFormData.firstName),
        };
        if (
            editFormData.lastName !== "" &&
            editFormData.lastName !== undefined
        ) {
            tempContact["lastName"] = this.capitalizeFirstLetter(
                editFormData.lastName
            );
        }
        if (editFormData.contactNumber) {
            tempContact["contactNumber"] = editFormData.contactNumber;
        }
        if (editFormData.email !== "" && editFormData.email !== undefined) {
            tempContact["email"] = editFormData.email;
        }
        // console.log(tempContact);

        return from(
            this.db.collection("contacts").doc(contactId).set(tempContact)
        );
    }

    deleteContact(contactId) {
        // // this implementation is for local storage
        // const deleteIndex = this.savedContacts.findIndex(
        //     (c) => c.id === contactId.toString()
        // );
        // if (deleteIndex < 0) {
        //     return;
        // }
        // this.savedContacts.splice(deleteIndex, 1);

        // this implementation is for firestore
        this.db.collection("contacts").doc(contactId).delete();
    }
}
