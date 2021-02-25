import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Badge } from '@ionic-native/badge/ngx';
import { MenuController, AlertController } from '@ionic/angular';
import { HttpService } from '../http.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.page.html',
  styleUrls: ['./my-appointments.page.scss'],
})
export class MyAppointmentsPage implements OnInit {
  public appointment = 'opd'
  public opd_appointments: any = [];
  public video_consultation: any = [];

  constructor(private router: Router, private alertController: AlertController, private menu: MenuController, private badge: Badge, private http: HttpService, private utility: UtilityService) {
  }

  ngOnInit() {
    this.badge.clear();
    this.getMyAppointments();
  }

  openMenu() {
    this.menu.enable(true, 'first');
  }

  goToChatLists() {
    this.router.navigateByUrl('/chat-lists');
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }

  getMyAppointments() {
    this.utility.showLoading();
    let user = JSON.parse(localStorage.getItem('user_details'))
    this.http.getMyAppointments('allAppointments/doctor/' + user.id).subscribe(
      (res: any) => {
        this.utility.hideLoading();
        if (res.success) {
          // this.appointments = res.data;
          res.data['OPD'].map(x => {
            x.type = 'OPD'
            this.opd_appointments.push(x);
          });
          res.data['Video'].map(x => {
            x.type = 'Video'
            this.video_consultation.push(x);
          });
          if (res['data'].length == 0) {
            this.utility.showMessageAlert("No  Appointments!", "You have no  appointments booked yet.")
          }
        } else {
          this.utility.showMessageAlert("No Appointments!", "You have no appointments booked yet.")
        }
      }, err => {
        this.utility.hideLoading();
        this.utility.showMessageAlert("Network error!", "Please check your network connection.")
      })
  }

  videoCallPatient(data) {
    debugger
    let user = JSON.parse(localStorage.getItem('user_details'));
    let navigationExtras: NavigationExtras = {
      state: {
        user_id: data.created_by,
        doctor_id: parseInt(data.doctor_id),
        appointment_id: data.id

      },
    };
    this.router.navigateByUrl('/video-call-appointment', navigationExtras);
  }

  notifyPatient(data) {
    let params = {
      "doctor_id": data.doctor_id,
      "user_id": data.created_by,
      "patient_id": data['patient_details'].id,
      "book_for": data.book_for
    }
debugger
    this.http.notifyPatient('callReminder', params).subscribe(
      (res: any) => {
        if (res.success) {
          this.utility.showMessageAlert("Notified!", "Patient has been notified that you are going to call shortly.")
        }
      }, err => {
        this.utility.hideLoading();
        this.utility.showMessageAlert("Network error!", "Please check your network connection.")
      })
  }

  changeAppointmentStatus(data, status, type) {
    let params = {
      "appointment_id": data.id,
      "status": status,
      "type": type
    }
    this.http.notifyPatient('changeAppointmentStatus', params).subscribe(
      (res: any) => {
        if (res.success) {
          if (type == 'opd') {
            this.opd_appointments.filter(x => {
              if (x.id == data.id) {
                x.appointment_status = status;
              }
            })

          } else {
            this.video_consultation.filter(x => {
              if (x.id == data.id) {
                x.appointment_status = status;
              }
            })
          }
          //  this.utility.showMessageAlert("Notified!","Patient has been notified that you are going to call shortly.")
        }
      }, err => {
        this.utility.hideLoading();
        this.utility.showMessageAlert("Network error!", "Please check your network connection.")
      });
    //  this.showMessageAlert();
  }

  async showMessageAlert(data, type) {
    const alert = await this.alertController.create({
      cssClass: "alert-container",
      header: "What do you want?",
      message: "",
      buttons: [
        {
          text: 'COMPLETE APPOINTMENT',
          handler: () => {
            this.changeAppointmentStatus(data, '2', type)
          }
        },
        {
          text: 'POSTPONE APPOINTMENT',
          handler: () => {
            this.utility.showMessageAlert("Work in progress", "Needs to be discuss");
          }
        },
        {
          text: 'CANCEL APPOINTMENT',
          role: '',
          handler: () => {
            console.log('Cancel clicked');
            this.changeAppointmentStatus(data, '0', type)
          }
        },
      ]
    });

    await alert.present();
  }
}
