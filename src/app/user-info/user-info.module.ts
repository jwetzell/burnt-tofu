import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserInfoComponent } from './user-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  declarations: [UserInfoComponent],
  entryComponents: [UserInfoComponent]
})
export class UserInfoModule {}
