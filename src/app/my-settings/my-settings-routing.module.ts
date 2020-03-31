import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MySettingsPage } from './my-settings.page';

const routes: Routes = [
  {
    path: '',
    component: MySettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MySettingsPageRoutingModule {}
