import { Component, OnInit } from '@angular/core';
import { DeveloperService } from "../../services/developer.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit {
  user: any;
  developers: any;
  followings: any;

  constructor(
    private _DeveloperService: DeveloperService,
    private _flashMessagesService: FlashMessagesService,
    private _AuthService: AuthService,) { 
      this.user = this._AuthService.getUserData();
      this.user = JSON.parse(this.user);

      this._DeveloperService.getAllDevelopers().subscribe(res => {
        this.developers = res.response
      }, err => {
        console.log(err);
        return false;
      })

      this._DeveloperService.getAllFollowings(this.user.id).subscribe(res => {
        this.followings = res.response
      }, err => {
        console.log(err);
        return false;
      })

    }

  ngOnInit(): void {
  }

  checkDeveloper(id){
    if(id==this.user.id)
    return false;

    for(var i=0;i<this.followings.length;i++)
    {
      if(id==this.followings[i])
      return false;
    }

    return true;
  }

  follow(e,followingId){
    const id = e.target.id;
    const html = document.getElementById(id).innerHTML
   
    const data = {
      ownId : this.user.id,
      followingId: followingId
    }
    if(html=="Follow")
    {
      document.getElementById(id).innerHTML= "<span class='spinner-grow spinner-grow-sm' role='status' aria-hidden='true'></span>Loading...";
      this._DeveloperService.following(data).subscribe(res=>{
        if(res.success)
        document.getElementById(id).innerHTML = "Unfollow";
        else
        {
          document.getElementById(id).innerHTML = "Follow";
          this._flashMessagesService.show(res.msg, { cssClass: 'alert-danger' });
        }
      })
    }else{
      document.getElementById(id).innerHTML= "<span class='spinner-grow spinner-grow-sm' role='status' aria-hidden='true'></span>Loading...";
      this._DeveloperService.unfollowing(data).subscribe(res=>{
        if(res.success)
        document.getElementById(id).innerHTML = "Follow";
        else
        {
          document.getElementById(id).innerHTML = "Unfollow";
          this._flashMessagesService.show(res.msg, { cssClass: 'alert-danger' });
        }
      })
    }
   
  }

}
