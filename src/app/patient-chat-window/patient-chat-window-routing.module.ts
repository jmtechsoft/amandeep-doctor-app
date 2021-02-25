import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientChatWindowPage } from './patient-chat-window.page';

const routes: Routes = [
  {
    path: '',
    component: PatientChatWindowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientChatWindowPageRoutingModule {}
