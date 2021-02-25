import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  private testingUrl: string = "http://testing.isocare.in/public/api/";

  private url: string = this.testingUrl;


  constructor(private http: HttpClient) {}
  
  
  getChatLists(endpoint: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      })
    };
    return this.http.get(this.url + endpoint, httpOptions);
  }
  
  getChatMessages(endpoint: string, body: any) {
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
