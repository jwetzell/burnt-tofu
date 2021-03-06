import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { UserInfoModule } from '../user-info/user-info.module';
import { SettingsPageModule } from '../settings/settings.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    UserInfoModule,
    SettingsPageModule
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuModule {}
