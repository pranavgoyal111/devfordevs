import { Component, OnInit } from '@angular/core';
import { PublicProfileService } from "../../services/public-profile.service"
import { Router, RouterLinkActive, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { DeveloperService } from "../../services/developer.service";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  id: any
  user: any;

  ownprofile: any;


  constructor(
    private _PublicProfileService: PublicProfileService,
    private route: ActivatedRoute,
    private _AuthService: AuthService,
    private _DeveloperService: DeveloperService,
    private _flashMessagesService: FlashMessagesService, ) {

    this.ownprofile = this._AuthService.getUserData();
    this.ownprofile = JSON.parse(this.ownprofile);

    this.route.params.subscribe(params => {
      this.id = params['id'];
      sessionStorage.setItem("developerId", this.id)
    });

    this._PublicProfileService.getProfile(this.id).subscribe(res => {
      this.user = res.data
    }, err => {
      console.log(err);
      return false;
    })

  }

  ngOnInit() {
    // this.route.params.subscribe(params => this.id = params['id']);
    
  }

  follow(e, followingId) {
    const id = e.target.id;
    const html = document.getElementById(id).innerHTML
  
    const data = {
      ownId: this.ownprofile.id,
      followingId: followingId
    }
    
    if (html.trim() == "Unfollow") {
      document.getElementById(id).innerHTML = "<span class='spinner-grow spinner-grow-sm' role='status' aria-hidden='true'></span>Loading...";
     
      this._DeveloperService.unfollowing(data).subscribe(res => {
        if (res.success)
          document.getElementById(id).innerHTML = "<i class='mdi mdi-account-plus mr-2'></i>Follow";
        else {
          document.getElementById(id).innerHTML = "Unfollow";
          this._flashMessagesService.show(res.msg, { cssClass: 'alert-danger' });
        }
      })

    } else {
      document.getElementById(id).innerHTML = "<span class='spinner-grow spinner-grow-sm' role='status' aria-hidden='true'></span>Loading...";
      this._DeveloperService.following(data).subscribe(res => {
        if (res.success)
          document.getElementById(id).innerHTML = "Unfollow";
        else {
          document.getElementById(id).innerHTML = "Follow";
          this._flashMessagesService.show(res.msg, { cssClass: 'alert-danger' });
        }
      })
    }
  }

}
