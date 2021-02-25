import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ChatsService } from '../chats.service';
import { UtilityService } from '../utility.service';
import * as _ from 'lodash'


@Component({
  selector: 'app-chat-lists',
  templateUrl: './chat-lists.page.html',
  styleUrls: ['./chat-lists.page.scss'],
})
export class ChatListsPage implements OnInit {
  public showSearchbar: boolean = false;
  public chat_list: any = [];
  private searchArray: any = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private utility: UtilityService,
    public chats: ChatsService) {
    this.route.queryParams.subscribe((params) => {
      this.ngOnInit();
    })
  }

  ngOnInit() {

    let user = JSON.parse(localStorage.getItem('user_details'));
    console.log(user, "user");
    this.chats.getChatLists('getDoctorChats/' + 'D-' + user.id).subscribe((res: any) => {
      console.log(res);
      this.chat_list = res.data;
      localStorage.setItem('chat_lists', this.chat_list);
    }, err => {

    })
  }


  goBack() {
    this.router.navigateByUrl('/my-appointments');
  }

  searchPatient() {
    this.showSearchbar = true;
  }

  search(searchInput) {
    if (searchInput.target.value != null) {
      this.chat_list = this.searchArray.filter(function (ele, i, array) {
        let arrayelement = ele.doctor_name.toLowerCase();
        return arrayelement.includes(searchInput.target.value)
      })
    } else {
      this.chat_list = this.searchArray;
    }

  }

  stopSearch() {
    this.chat_list = this.searchArray;
    this.showSearchbar = false;
  }


  goToChatWindow(sender, reciever, patient_details) {
    let navigationExtras: NavigationExtras = {
      state: {
        sender: sender,
        reciever: reciever,
        patient_details: patient_details
      },
    };
    this.router.navigateByUrl('/chat-window', navigationExtras)
  }
}
