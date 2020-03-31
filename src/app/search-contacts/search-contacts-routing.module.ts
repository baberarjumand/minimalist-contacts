import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchContactsPage } from './search-contacts.page';

const routes: Routes = [
  {
    path: '',
    component: SearchContactsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchContactsPageRoutingModule {}
