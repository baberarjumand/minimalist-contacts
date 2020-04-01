import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AddContactPageRoutingModule } from "./add-contact-routing.module";

import { AddContactPage } from "./add-contact.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddContactPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddContactPage]
})
export class AddContactPageModule {}
