import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchContactsPageRoutingModule } from './search-contacts-routing.module';

import { SearchContactsPage } from './search-contacts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchContactsPageRoutingModule
  ],
  declarations: [SearchContactsPage]
})
export class SearchContactsPageModule {}
