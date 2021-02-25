import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'my-appointments',
    loadChildren: () => import('./my-appointments/my-appointments.module').then( m => m.MyAppointmentsPageModule)
  },
  {
    path: 'video-call-appointment',
    loadChildren: () => import('./video-call-appointment/video-call-appointment.module').then( m => m.VideoCallAppointmentPageModule)
  },
  {
    path: 'patient-chat-window',
    loadChildren: () => import('./patient-chat-window/patient-chat-window.module').then( m => m.PatientChatWindowPageModule)
  },
  {
    path: 'chat-lists',
    loadChildren: () => import('./chat-lists/chat-lists.module').then( m => m.ChatListsPageModule)
  },
 
  {
    path: 'chat-window',
    loadChildren: () => import('./chat-window/chat-window.module').then( m => m.ChatWindowPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
