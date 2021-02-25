import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoCallAppointmentPageRoutingModule } from './video-call-appointment-routing.module';

import { VideoCallAppointmentPage } from './video-call-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoCallAppointmentPageRoutingModule
  ],
  declarations: [VideoCallAppointmentPage]
})
export class VideoCallAppointmentPageModule {}
