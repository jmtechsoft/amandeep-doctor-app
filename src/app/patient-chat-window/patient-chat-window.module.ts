import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientChatWindowPageRoutingModule } from './patient-chat-window-routing.module';

import { PatientChatWindowPage } from './patient-chat-window.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientChatWindowPageRoutingModule
  ],
  declarations: [PatientChatWindowPage]
})
export class PatientChatWindowPageModule {}
