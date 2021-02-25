import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingController, AlertController, ToastController } from "@ionic/angular";
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  loading: any;
  locations : any = [];
  user : any;
  user_profile : any;
  image : any;
  device_token : string;
  device_type : string;

  private events = new Subject<any>();
  
  constructor(private route: ActivatedRoute,private router: Router,private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController) {
  }

  publishEvent(data: any) {
    this.events.next(data);
  }

  getevent(): Subject<any> {
    return this.events;
  }

  async showLoading(message?: string) {
    this.loading = await this.loadingController.create({
      cssClass: 'custom-class spinner-class',
    });
    await this.loading.present();
  }

  hideLoading() {
    this.loadingController.dismiss();
  }

 

  async showMessageAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: "alert-container",
      header: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
        //{
        //   text: 'Yes',
        //   handler: () => {
        //     console.log('Buy clicked');
        //     let navigationExtras: NavigationExtras = {
        //       state: {
        //         patient:state.patient,
        //         location_name: state.location_name,
        //         data: state.data,
        //         date: state.date,
        //         time: state.time,
        //         schedule_id: state.schedule_id
        //       },
        //     };
        //     this.router.navigateByUrl("/confirm-appointment",navigationExtras);
        //   }
        // }
      ]
    });

    await alert.present();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
}
