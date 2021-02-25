import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoCallAppointmentPage } from './video-call-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: VideoCallAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoCallAppointmentPageRoutingModule {}
