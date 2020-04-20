import { Injectable } from "@angular/core";
import { Contact } from '../model/contact.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ContactsService } from './contacts.service';

@Injectable()
export class ContactResolver implements Resolve<Contact> {
    constructor(private contactsService: ContactsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact> {
        const contactId = route.paramMap.get("id");
        return this.contactsService.getContactById(contactId);
    }
}