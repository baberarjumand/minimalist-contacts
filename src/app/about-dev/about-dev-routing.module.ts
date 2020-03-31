import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutDevPage } from './about-dev.page';

const routes: Routes = [
  {
    path: '',
    component: AboutDevPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutDevPageRoutingModule {}
