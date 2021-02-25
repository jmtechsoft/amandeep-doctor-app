import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AudioManagement } from '@ionic-native/audio-management/ngx';
import { Network } from '@ionic-native/network/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Badge } from '@ionic-native/badge/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularAgoraRtcModule, AgoraConfig } from 'angular-agora-rtc';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

const config = {
  apiKey: "AIzaSyAXMdfk33fyZ02OCvbFhm_JOiySaXvCShY",
  authDomain: "amandeephospitalchat.firebaseapp.com",
  databaseURL: "https://amandeephospitalchat.firebaseio.com",
  projectId: "amandeephospitalchat",
  storageBucket: "amandeephospitalchat.appspot.com",
  messagingSenderId: "798563162428",
  appId: "1:798563162428:web:143d5fec7923a927e66639",
  measurementId: "G-WCRFXQN9X3"

}

const agoraConfig: AgoraConfig = {
  AppID: '3a858c37dd19440a9bb6e7ecd50b6ca9',
};
//AppID: '3a858c37dd19440a9bb6e7ecd50b6ca9',
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularAgoraRtcModule.forRoot(agoraConfig),
    IonicModule.forRoot({ mode: 'ios' }),
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundMode,
    Push,
    AudioManagement,
    AndroidPermissions,
    Badge,
    PhotoViewer,
    AngularFireAuth,
    Camera,
    LocalNotifications,
    Media,
    Network,
    NativeAudio,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
