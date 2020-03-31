import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AllContactsPage } from "./all-contacts.page";

const routes: Routes = [
  {
    path: "",
    component: AllContactsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllContactsPageRoutingModule {}
