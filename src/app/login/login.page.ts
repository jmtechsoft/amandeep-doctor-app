import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpService } from '../http.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public dial_code;
  public mobile_no=98888888888;
  public password;
  constructor(private statusBar: StatusBar, private afAuth: AngularFireAuth, private router: Router, private http: HttpService, private utility: UtilityService) {
    this.statusBar.backgroundColorByHexString('#ffffff');
  }

  ngOnInit() { }

  login() {
    if (this.mobile_no == undefined) {
      this.utility.showMessageAlert("Mobile number required!", "Please enter your mobile number.")
    }
    else if (this.mobile_no.length != 10) {
      this.utility.showMessageAlert("Invalid mobile number!", "The mobile number you have entered is not valid.")
    } else {


      this.utility.showLoading();
      let email = this.mobile_no + "@amandeephospitalpatient.com";
      let password = "Techies@321";
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then((res: any) => {
        if (res.code == 'auth/user-not-found') {
          this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user: any) => {
              localStorage.setItem('firebase_user_id', JSON.stringify(user['user']));

              let params = {
                mobile_no: this.mobile_no,
                password: this.password,
                doctor_firebaseid: user['user'].uid,
                device_token: this.utility.device_token == undefined ? 'devicetoken' : this.utility.device_token,
                device_type: this.utility.device_type == undefined ? 'devicetype' : this.utility.device_type
              }
              this.http.post("doctorLogin", params).subscribe(
                (res: any) => {
                  this.utility.hideLoading();
                  if (res.success) {
                    this.utility.showMessageAlert("Welcome" + " " + "Dr. " + res.data['doctor'].firstname + " " + res.data['doctor'].lastname, "We are hoping that you will serve your patients best.");
                    localStorage.setItem('user_details', JSON.stringify(res.data['doctor']));
                    localStorage.setItem('token', JSON.stringify(res.data['token']))
                    this.utility.user = JSON.parse(localStorage.getItem('user_details'));
                    if (this.utility.user.profile_picture != null) {
                      this.utility.image = this.utility.user.profile_picture;
                    } else {
                      this.utility.image = "assets/imgs/no-profile.png";
                    }
                    this.router.navigateByUrl('/my-appointments');
                  } else {
                    this.utility.showMessageAlert("Invalid Credentials!", "Your mobile numbner or password is not valid.");
                  }
                }, err => {
                  this.utility.hideLoading();
                  this.utility.showMessageAlert("Network error!", "Please check your network connection.");

                })
            }, (error) => {
            });
        } else {
          localStorage.setItem('firebase_user_id', JSON.stringify(res['user']));

          let params = {
            mobile_no: this.mobile_no,
            password: this.password,
            doctor_firebaseid: res['user'].uid,
            device_token: this.utility.device_token == undefined ? 'devicetoken' : this.utility.device_token,
            device_type: this.utility.device_type == undefined ? 'devicetype' : this.utility.device_type
          }
          
          this.http.post("doctorLogin", params).subscribe(
            (res: any) => {
              this.utility.hideLoading();
              if (res.success) {
                this.utility.showMessageAlert("Welcome" + " " + "Dr. " + res.data['doctor'].firstname + " " + res.data['doctor'].lastname, "We are hoping that you will serve your patients best.");
                localStorage.setItem('user_details', JSON.stringify(res.data['doctor']));
                localStorage.setItem('token', JSON.stringify(res.data['token']))
                this.utility.user = JSON.parse(localStorage.getItem('user_details'));
                if (this.utility.user.profile_picture != null) {
                  this.utility.image = this.utility.user.profile_picture;
                } else {
                  this.utility.image = "assets/imgs/no-profile.png";
                }

                this.router.navigateByUrl('/my-appointments');
              } else {
                this.utility.showMessageAlert("Invalid Credentials!", "Your mobile numbner or password is not valid.");
              }
            }, err => {
              this.utility.hideLoading();
              this.utility.showMessageAlert("Network error!", "Please check your network connection.");

            })
        }
      }, (error) => {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
          .then((user: any) => {
            let params = {
              mobile_no: this.mobile_no,
              password: this.password,
              doctor_firebaseid: user['user'].uid,
              device_token: this.utility.device_token == undefined ? 'devicetoken' : this.utility.device_token,
              device_type: this.utility.device_type == undefined ? 'devicetype' : this.utility.device_type
            }
            this.http.post("doctorLogin", params).subscribe(
              (res: any) => {
                this.utility.hideLoading();
                if (res.success) {
                  this.utility.showMessageAlert("Welcome" + " " + "Dr. " + res.data['doctor'].firstname + " " + res.data['doctor'].lastname, "We are hoping that you will serve your patients best.");
                  localStorage.setItem('user_details', JSON.stringify(res.data['doctor']));
                  localStorage.setItem('token', JSON.stringify(res.data['token']))
                  this.utility.user = JSON.parse(localStorage.getItem('user_details'));
                  if (this.utility.user.profile_picture != null) {
                    this.utility.image = this.utility.user.profile_picture;
                  } else {
                    this.utility.image = "assets/imgs/no-profile.png";
                  }

                  this.router.navigateByUrl('/my-appointments');
                } else {
                  this.utility.showMessageAlert("Invalid Credentials!", "Your mobile numbner or password is not valid.");
                }
              }, err => {
                this.utility.hideLoading();
                this.utility.showMessageAlert("Network error!", "Please check your network connection.");

              })
          }, (error) => {
          });
      });
    }

  }

  signup() {
    this.router.navigate(['/sign-up']);
  }
}