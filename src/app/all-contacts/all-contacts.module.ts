import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AllContactsPageRoutingModule } from "./all-contacts-routing.module";

import { AllContactsPage } from "./all-contacts.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllContactsPageRoutingModule
  ],
  declarations: [AllContactsPage]
})
export class AllContactsPageModule {}
