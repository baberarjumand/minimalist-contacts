import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EditContactPageRoutingModule } from "./edit-contact-routing.module";

import { EditContactPage } from "./edit-contact.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditContactPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditContactPage]
})
export class EditContactPageModule {}
