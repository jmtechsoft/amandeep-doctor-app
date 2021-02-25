import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { Badge } from '@ionic-native/badge/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UtilityService } from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public menu = [
    {
      title: "Home",
      url: "/my-appointments",
      icon: "home-outline",
    },
    {
      title: "My Profile",
      url: "/profile",
      icon: "person-outline",
    },
    // {
    //   title: "Video Consulation",
    //   url: "",
    //   icon: "phone-portrait-outline",
    // },
    // {
    //   title: "Chat with patients",
    //   url: "chat-with-doctor",
    //   icon: "chatbox-ellipses-outline",
    // },
    {
      title: "Logout",
      url: "/login",
      icon: "log-in-outline",
    },
  ];

  public user: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private localNotifications: LocalNotifications,
    private statusBar: StatusBar,
    private push: Push,
    private badge: Badge,
    private utility: UtilityService,
    private router: Router,
    private androidPermissions: AndroidPermissions,
    private backgroundMode: BackgroundMode
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushNotification();
      if (this.platform.is('android')) {
        this.utility.device_type = 'android';
      }
      if (this.platform.is('ios')) {
        this.utility.device_type = 'ios';
      }
      // this.backgroundMode.enable();
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => {
          console.log('Has permission?', result.hasPermission)
          if (result.hasPermission == false) {
            console.log("ask permission")
            this.androidPermissions.requestPermissions([
              this.androidPermissions.PERMISSION.CAMERA,
              this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS,
              this.androidPermissions.PERMISSION.RECORD_AUDIO
            ])
          }
        },
        err => {
          console.log(err)
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
        }
      );

      if (JSON.parse(localStorage.getItem('token')) != undefined) {
        this.user = JSON.parse(localStorage.getItem('user_details'));
        console.log(this.user);
        this.utility.user = JSON.parse(localStorage.getItem('user_details'));
        if (this.utility.user.profile_picture != null) {
          this.utility.image = this.utility.user.profile_picture;
        } else {
          this.utility.image = "assets/imgs/no-profile.png";
        }
        this.router.navigate(["my-appointments"])
      } else {
        this.router.navigate(["login"])
      }
      // this.router.navigate(["video-call-appointment"])
    });
  }

  chooseOption(page) {
    if (page == 'Logout') {
      localStorage.removeItem('token');
      localStorage.removeItem('user_details');
      // this.utility.showMessageAlert("Logout","You have been logout");
      this.router.navigate(["login"])
    }
    if (page == 'Book OPD Consulation') {

      let navigationExtras: NavigationExtras = {
        state: {
          book_type: 'OPD'
        },
      };
      this.router.navigate(['/select-location'], navigationExtras);

    }
    if (page == 'Book Video Consulation') {

      let navigationExtras: NavigationExtras = {
        state: {
          book_type: 'OPD'
        },
      };
      this.router.navigate(['/select-location'], navigationExtras);

    }

  }

  pushNotification() {
    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'true'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    }

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification);
      this.badge.set(1);
      if (notification.additionalData['notification_type'] == 'end_call') {
        this.localNotifications.schedule({
          id: 1,
          title: notification.title,
          text: notification.message
        });
        this.utility.showMessageAlert(notification.title, notification.message)

        this.utility.publishEvent({
          'call:ended': notification.title
        });
      }
      if (notification.additionalData['notification_type'] == "message") {
        this.localNotifications.schedule({
          id: 1,
          title: notification.title,
          text: notification.message
        });
       // this.utility.showMessageAlert(notification.title, notification.message);
        this.utility.publishEvent({
          'message:recieved': notification
        });
      }
    });

    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', registration);
      debugger
      this.utility.device_token = registration.registrationId;

    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }
}
