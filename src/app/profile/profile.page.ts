import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  constructor(private router:Router,private utility:UtilityService) { }

  ngOnInit() {
  }
  
  goBack(){
    this.router.navigateByUrl("/my-appointments");
  }
}
