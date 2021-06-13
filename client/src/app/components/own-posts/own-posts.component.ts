import { Component, OnInit } from '@angular/core';
import { PublicProfileService } from "../../services/public-profile.service"
import { AuthService } from "../../services/auth.service";
import { PostService } from "../../services/post.service"
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-own-posts',
  templateUrl: './own-posts.component.html',
  styleUrls: ['./own-posts.component.css']
})
export class OwnPostsComponent implements OnInit {

  id: any;
  posts:any;
  user: any;

  // reaction 
  nothing_reaction: any = "<i class='fa fa-thumbs-o-up mr-2'></i>Like";
  like_reaction: any = "<img src='https://github.com/Sourav59580/facebook_reaction/blob/main/devfordevs%20rection/like.gif?raw=true' width='30px' class='mr-1'>Like";
  superb_reaction: any = "<img src='https://github.com/Sourav59580/facebook_reaction/blob/main/devfordevs%20rection/superb.gif?raw=true' width='30px' class='mr-1'>Superb";
  love_reaction: any = "<img src='https://github.com/Sourav59580/facebook_reaction/blob/main/devfordevs%20rection/love.gif?raw=true' width='30px' class='mr-1'>Love";
  curious_reaction: any = "<img src='https://github.com/Sourav59580/facebook_reaction/blob/main/devfordevs%20rection/curious.gif?raw=true' width='30px' class='mr-1'>Curious";
  cry_reaction: any = "<img src='https://github.com/Sourav59580/facebook_reaction/blob/main/devfordevs%20rection/cry.gif?raw=true' width='30px' class='mr-1'>Cry";
  sad_reaction: any = "<img src='https://github.com/Sourav59580/facebook_reaction/blob/main/devfordevs%20rection/sad.gif?raw=true' width='30px' class='mr-1'>Sad";
  angry_reaction: any = "<img src='https://github.com/Sourav59580/facebook_reaction/blob/main/devfordevs%20rection/angry.gif?raw=true' width='30px' class='mr-1'>Angry";

  constructor( 
    private _PublicProfileService:PublicProfileService,
    private _PostService: PostService,
    private http: HttpClient,
    private _AuthService: AuthService,
    private _flashMessagesService: FlashMessagesService,) {
    this.id = sessionStorage.getItem("developerId");

    this.user = this._AuthService.getUserData();
    this.user = JSON.parse(this.user);

    this._PublicProfileService.getPosts(this.id).subscribe(res=>{
     
      this.posts = res.data;
    },err=>{
      console.log(err);
      return false;
    })
   }

  ngOnInit(): void {
  }

  // claculate date diffrence
  calculateDiff(d) {
    let date = new Date(d);
    let currentDate = new Date();
    
    let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

   // check reaction
   checkReaction(reaction) {
    if (reaction == 'nothing' || reaction == '')
      return this.nothing_reaction;
    else if (reaction == 'like')
      return this.like_reaction;
    else if (reaction == 'superb')
      return this.superb_reaction;
    else if (reaction == "love")
      return this.love_reaction;
    else if (reaction == "curious")
      return this.curious_reaction;
    else if (reaction == "cry")
      return this.cry_reaction;
    else if (reaction == 'sad')
      return this.sad_reaction;
    else if (reaction == 'angry')
      return this.angry_reaction;
    else
      return this.nothing_reaction;
  }

  searchId(likes){
    for(var i=0;i<likes.length;i++){
      if(likes[i].liked_by==this.user.id)
      {
        return this.checkReaction(likes[i].reaction);
      }
    }
    return this.nothing_reaction
  }

   // Like a post
   like(reaction,postId) {
    const userReaction = {
      postId: postId,
      liked_by: this.user.id,
      name: this.user.name,
      reaction: reaction
    }
   
    this._PostService.addReaction(userReaction).subscribe(res=>{

      if (res.success) {
        //get all posts
        this._PostService.getPosts().subscribe(res => {
        
          this.posts = res.response;
        }, err => {
          console.log(err);
          return false;
        })
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-success' });
      } else {
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-danger' });
      }

    })
  }

  // write a comment
  writeComment(postId, comment) {
    const userComment = {
      postId: postId,
      commentator_id: this.user.id,
      commentator_name: this.user.name,
      commentator_dp: this.user.dp,
      commentator_designation: this.user.designation,
      comment: comment
    }

    this._PostService.addComment(userComment).subscribe(res => {

      if (res.success) {
        //get all posts
        this._PostService.getPosts().subscribe(res => {
        
          this.posts = res.response;
        }, err => {
          console.log(err);
          return false;
        })
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-success' });
      } else {
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-danger' });
      }


    })
  }
  

}
