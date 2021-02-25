import { Component, OnInit, Input, ViewChild, NgZone } from '@angular/core';
import { IonContent, ActionSheetController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import * as AWS from 'aws-sdk';

import { ChatsService } from '../chats.service';
import { HttpService } from '../http.service';
import { UtilityService } from '../utility.service';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-patient-chat-window',
  templateUrl: './patient-chat-window.page.html',
  styleUrls: ['./patient-chat-window.page.scss'],
})
export class PatientChatWindowPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('input') messageInput;
  public chat: any;
  public messages: any = [];
  public sender_id: any;
  public reciever_id: any;
  public patient_details: any;
  public message: string = '';

  constructor(private router: Router,private photoViewer: PhotoViewer, private zone: NgZone, private platform: Platform,public actionSheetController: ActionSheetController, private camera: Camera, private utility: UtilityService, private route: ActivatedRoute, private chats: ChatsService, private http: HttpService) { 
    this.route.queryParams.subscribe((params) => {
      this.sender_id = this.router.getCurrentNavigation().extras.state.sender;
      this.reciever_id = this.router.getCurrentNavigation().extras.state.reciever;
      this.patient_details = this.router.getCurrentNavigation().extras.state.patient_details;
    });
    this.platform.resume.subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
  }
  
  

  async getPicture() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image Source",
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "Load from Library",
          icon: "images-outline",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: "Use Camera",
          icon: "camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          },
        }
      ],
    });
    await actionSheet.present();
  }

  public takePicture(sourceType) {
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL
    };

    this.camera.getPicture(options).then((imagePath) => {
      let image = 'data:image/jpeg;base64,' + imagePath;
      let user = JSON.parse(localStorage.getItem('user_details'));
      let message = {
        // "id": 2,
        "message_type": 2,
        "message": null,
        "image_url": image,
        "sender_id": 'D-' + user.id,
        "reciever_id": 'P-' + this.patient_details.id,
        "send_by": "doctor",
        "status": 1,
        "del_by": null,
        "created_at": "2020-11-18 09:54:07",
        "updated_at": "2020-11-18 09:54:07"
      }
      this.messages.push(message);
      // this.sendImage(image);
      let imageName = "user-profile";
      this.uploadImage(imagePath, imageName).then((res: any) => {
        if (res.Location) {
          this.sendImage(res.Location);
        }
      });
    }, (err) => {
    });
  }

  uploadImage(image, imageName) {
    //this.utility.showLoading();
    return new Promise((resolve, reject) => {
      const body = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');;
      const ext = image.split(';')[0].split('/')[1] || 'jpg';
      let date = Date.now();
      const key = imageName + date + "." + 'jpeg';
      this.s3Putimage({ body, mime: `image/${ext}` }, key, 'base64').then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  s3Putimage(file, key, encoding) {

    return new Promise((resolve, reject) => {
      let s3 = new AWS.S3({
        accessKeyId: environment.AWS_accesskey,
        secretAccessKey: environment.AWS_secret_key,
        region: 'ap-south-1'
      });

      const params = {
        Body: file.body,
        Bucket: 'amadeephospital-user-images',
        Key: key,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: "image/jpeg"
      };

      s3.upload(params, (err, data) => {

        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    })
  }


  sendImage(img) {

    let user = JSON.parse(localStorage.getItem('user_details'));
    // let message = {
    //   // "id": 2,
    //   "message_type": 2,
    //   "message": null,
    //   "image_url": img,
    //   "sender_id": 'D-' + user.id,
    //   "reciever_id": 'P-' + this.patient_details.id,
    //   "send_by": "doctor",
    //   "status": 1,
    //   "del_by": null,
    //   "created_at": "2020-11-18 09:54:07",
    //   "updated_at": "2020-11-18 09:54:07"
    // }
    // this.messages.push(message);
    let params = {
      "message_type": 2,
      "message": null,
      "image_url": img,
      "sender_id": 'D-' + user.id,
      "reciever_id": 'P-' + this.patient_details.id,
      "send_by": "doctor"
    }
    this.chats.getChatMessages('storeChatMessage', params).subscribe((res: any) => {
    }, err => {

    })
    this.message = '';
    // setTimeout(() => {
    //   this.messageInput.setFocus();
    //   // this.keyboard.show();
    // }, 100)
    this.content.scrollToBottom(1500);
  }
  

  
}
