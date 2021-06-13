import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PublicProfileService } from "../../services/public-profile.service"
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  ownprofile:any;

  constructor(
    private _AuthService:AuthService,
    private _PublicProfileService: PublicProfileService,
    ) { 
    this.user = this._AuthService.getUserData();
    this.user= JSON.parse(this.user);

    this._PublicProfileService.getProfile(this.user.id).subscribe(res => {
      this.ownprofile = res.data
    }, err => {
      console.log(err);
      return false;
    })
  }

  ngOnInit(): void {
  }

}
