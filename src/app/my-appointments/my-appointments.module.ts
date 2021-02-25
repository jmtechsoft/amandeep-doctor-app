import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAppointmentsPageRoutingModule } from './my-appointments-routing.module';

import { MyAppointmentsPage } from './my-appointments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAppointmentsPageRoutingModule
  ],
  declarations: [MyAppointmentsPage]
})
export class MyAppointmentsPageModule {}
