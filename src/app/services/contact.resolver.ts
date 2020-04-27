import { Injectable } from '@angular/core';
import { Contact } from '../model/contact.model';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, iif, Subscription } from 'rxjs';
import { ContactsService } from './contacts.service';
import { AuthService } from './auth.service';
import { LocalContactService } from './local-contact.service';
import { mergeMap, take } from 'rxjs/operators';

@Injectable()
export class ContactResolver implements Resolve<Contact> {
  constructor(
    private contactsService: ContactsService,
    private authService: AuthService,
    private localContactsService: LocalContactService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Contact> {
    const contactId = route.paramMap.get('id');

    const localContact$ = of(
      this.localContactsService.getContactById(contactId)
    );
    // const dbContact$ = this.contactsService.getContactById(contactId);

    return this.authService.isUserAnon().pipe(
      mergeMap((isUserAnon) =>
        iif(
          () => isUserAnon,
          localContact$,
          this.contactsService.getContactById(contactId, isUserAnon)
        )
      ),
      take(1)
    );

    // return this.contactsService.getContactById(contactId);
  }
}
