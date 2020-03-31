import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MySettingsPageRoutingModule } from './my-settings-routing.module';

import { MySettingsPage } from './my-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MySettingsPageRoutingModule
  ],
  declarations: [MySettingsPage]
})
export class MySettingsPageModule {}
