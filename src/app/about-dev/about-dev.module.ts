import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutDevPageRoutingModule } from './about-dev-routing.module';

import { AboutDevPage } from './about-dev.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutDevPageRoutingModule
  ],
  declarations: [AboutDevPage]
})
export class AboutDevPageModule {}
