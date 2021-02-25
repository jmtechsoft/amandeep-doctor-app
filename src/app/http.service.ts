import { Injectable } from "@angular/core";
// import { Http, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { UtilityService } from './utility.service';

@Injectable({
  providedIn: "root",
})
export class HttpService {

  private testingUrl: string = "http://testing.isocare.in/public/api/";

  private url: string = this.testingUrl;


  constructor(private http: HttpClient, private utility: UtilityService,private router : Router) {
    // this.getLocations('allLocations');
   }

  getWithoutBaseUrl(endpoint: string) {
    return this.http.get(endpoint);
  }

  get(endpoint: string, params?: any) {
    return this.http.get(this.url + endpoint);
  }

  post(endpoint: string, body: any) {
    console.log(endpoint);
    console.log(body)
    return this.http.post(this.url + endpoint, body);
  }

  put(endpoint: string, body: any) {
    return this.http.put(this.url + endpoint, body);
  }

  delete(endpoint: string, body: any) {
    return this.http.post(this.url + endpoint, body);
  }

  patch(endpoint: string, body: any) {
    return this.http.put(this.url + endpoint, body);
  }
 
  getMyAppointments(endpoint: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      })
    };
    return this.http.get(this.url + endpoint, httpOptions);
  }
  
  videoCallPatient(endpoint: string, body: any) {
    console.log(body)
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      })
    };
    console.log(JSON.parse(localStorage.getItem('token')));
    return this.http.post(this.url + endpoint, body, httpOptions);
  }
  
  sendPushNotification(endpoint: string, body: any) {
    console.log(body)
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      })
    };
    return this.http.post(this.url + endpoint, body, httpOptions);
  }

  notifyPatient(endpoint: string, body: any) {
    console.log(body)
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      })
    };
    return this.http.post(this.url + endpoint, body, httpOptions);
  }
  
  
}